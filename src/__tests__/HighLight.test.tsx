import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../helpers/testUtils'
import 'jest-dom/extend-expect'
import { UnconnectedItemHighlight } from '../components/ItemHighLight/ItemHighlight'
// import { createLocation } from 'history';
Enzyme.configure({ adapter: new EnzymeAdapter() })

import { createLocation } from 'history';
import { MemoryRouter as Router } from 'react-router-dom';
const mountWithRouter = (UnconnectedItemHighlight: any) =>
  mount(<Router>{UnconnectedItemHighlight}</Router>);



describe('<UnconnectedItemHighlight />', () => {
  let wrapper: any
  let setup: any
  let location: any
  let getSerieInfoModalRequestMock: any
  let getMovieInfoModalRequestMock: any
  let relatedMovieSelectedMock: any
  let getMovieFavoriteRequestMock: any
  let removeFavMovieRequestMock: any
  let getSerieFavoriteRequestMock: any
  let removeFavSerieRequestMock: any
  let favMovies: any
  let favSeries: any
  let searchMovies: any
  let searchSeries: any

  beforeEach(() => {
    getSerieInfoModalRequestMock = jest.fn()
    getMovieInfoModalRequestMock = jest.fn()
    relatedMovieSelectedMock = jest.fn()
    getMovieFavoriteRequestMock = jest.fn()
    removeFavMovieRequestMock = jest.fn()
    getSerieFavoriteRequestMock = jest.fn()
    removeFavSerieRequestMock = jest.fn()
    favMovies = [{ id: 1, poster: 'fgdfgd.jpg', genreId: 25 }]
    favSeries = [{ id: 3, poster: 'kkkddd.jpg', genreId: 51 }]
    searchMovies = [
      {
        id: 1,
        backdrop_path: 'aaaaaa.jpg',
        title: 'matrix 1',
        overview: 'lorem ipsum',
        genre_ids: [12]
      }]
    searchSeries = [
      {
        id: 3,
        backdrop_path: 'ccccc.jpg',
        name: 'matrix 3',
        overview: 'lorem lorem',
        genre_ids: [232]
      }],

      location = createLocation({
        pathname: "/results",
      })

    setup = (testProps: any = {}) => {
      const userProps = {
        isMovieCatSelected: true,
        location: location,
        isUserSignedIn: true,
        favMovies,
        favSeries,
        searchMovies,
        searchSeries,
        getMovieInfoModalRequest: getMovieInfoModalRequestMock,
        getSerieInfoModalRequest: getSerieInfoModalRequestMock,
        relatedMovieSelected: relatedMovieSelectedMock,
        getMovieFavoriteRequest: getMovieFavoriteRequestMock,
        removeFavMovieRequest: removeFavMovieRequestMock,
        getSerieFavoriteRequest: getSerieFavoriteRequestMock,
        removeFavSerieRequest: removeFavSerieRequestMock,
      }
      const props = { ...userProps, ...testProps }
      wrapper = mountWithRouter(<UnconnectedItemHighlight {...props} />)
      return wrapper
    }
  })


  test('should render component', () => {
    setup()
    const component = findByTestAttr(wrapper, 'component-highlight').last()
    expect(component.length).toBe(1)
  })

  test('should render movie highlight', () => {
    setup()
    const highlight = findByTestAttr(wrapper, 'movie-highlight-outer')
    expect(highlight.length).toBe(1)
  })

  test('should render serie highlight', () => {
    setup({ isMovieCatSelected: false })
    const highlight = findByTestAttr(wrapper, 'serie-highlight-outer')
    expect(highlight.length).toBe(1)
  })

  test('should print highlight contents', () => {
    setup()
    const title = wrapper.find('.info-wrapper-highlight h3')
    const info = wrapper.find('.info-wrapper-highlight p')
    expect(title.length).toBe(1)
    expect(info.length).toBe(1)
    expect(title.text()).toEqual('matrix 1')
    expect(info.text()).toEqual('lorem ipsum')


    setup({ isMovieCatSelected: false, isUserSignedIn: false })
    const h3 = wrapper.find('.info-wrapper-highlight h3')
    const p = wrapper.find('.info-wrapper-highlight p')
    expect(h3.length).toBe(1)
    expect(p.length).toBe(1)
    expect(h3.text()).toEqual('matrix 3')
    expect(p.text()).toEqual('lorem lorem')

  })

  test('if buttons are rendered and are calling action', () => {
    setup()
    const cta = findByTestAttr(wrapper, 'cta-details')
    expect(cta.length).toBe(1)
    expect(getSerieInfoModalRequestMock.mock.calls.length).toBe(0)
    cta.simulate('click')
    expect(getMovieInfoModalRequestMock.mock.calls.length).toBe(1)
    expect(getMovieInfoModalRequestMock).toHaveBeenCalledWith(1, 'matrix 1')


    // remove from list button
    const removeFromList = wrapper.find('button span')
    expect(removeFromList.length).toBe(1)
    expect(removeFromList.text()).toEqual('Remove from list')
    expect(removeFavMovieRequestMock.mock.calls.length).toBe(0)
    removeFromList.simulate('click')
    expect(getMovieFavoriteRequestMock.mock.calls.length).toBe(0)
    expect(removeFavMovieRequestMock.mock.calls.length).toBe(1)



    // add to list button
    setup({
      favMovies: [{ id: 100 }, { id: 233 }],
      searchMovies: [{ id: 50, genre_ids: [122], }, { id: 343, genre_ids: [10101] }]
    })

    const addToList = wrapper.find('button span')
    expect(addToList.length).toBe(1)
    expect(addToList.text()).toEqual('Add to list')
    expect(getMovieFavoriteRequestMock.mock.calls.length).toBe(0)
    addToList.simulate('click')
    expect(removeFavMovieRequestMock.mock.calls.length).toBe(1)
    expect(getMovieFavoriteRequestMock.mock.calls.length).toBe(1)

    // in case user is not signed in
    setup({ isUserSignedIn: false })
    const buttonToAddRemove = wrapper.find('button span')
    expect(buttonToAddRemove.length).toBe(0)




    setup({ isMovieCatSelected: false })
    const cta2 = findByTestAttr(wrapper, 'cta-details')
    expect(cta2.length).toBe(1)
    expect(getSerieInfoModalRequestMock.mock.calls.length).toBe(0)
    cta2.simulate('click')
    expect(getSerieInfoModalRequestMock.mock.calls.length).toBe(1)
    expect(getSerieInfoModalRequestMock).toHaveBeenCalledWith(3, 'matrix 3')


    // remove from list button
    const removeFromListS = wrapper.find('button span')
    expect(removeFromListS.length).toBe(1)
    expect(removeFromListS.text()).toEqual('Remove from list')
    expect(removeFavSerieRequestMock.mock.calls.length).toBe(0)
    removeFromListS.simulate('click')
    expect(getSerieFavoriteRequestMock.mock.calls.length).toBe(0)
    expect(removeFavSerieRequestMock.mock.calls.length).toBe(1)



    // add to list button
    setup({
      isMovieCatSelected: false,
      favSeries: [{ id: 554 }, { id: 6566 }],
      searchSeries: [{ id: 12455, genre_ids: [23523], }, { id: 1109, genre_ids: [434] }]
    })

    const addToListS = wrapper.find('button span')
    expect(addToListS.length).toBe(1)
    expect(addToListS.text()).toEqual('Add to list')
    expect(getSerieFavoriteRequestMock.mock.calls.length).toBe(0)
    addToListS.simulate('click')
    expect(removeFavSerieRequestMock.mock.calls.length).toBe(1)
    expect(getSerieFavoriteRequestMock.mock.calls.length).toBe(1)

  })
})
