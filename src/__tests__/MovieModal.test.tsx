import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../helpers/testUtils'
import 'jest-dom/extend-expect'
import { UnconnectedMovieModal } from '../components/MovieModal/MovieModal'
Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('<UnconnectedMovieModal />', () => {
  let wrapper: any
  let setup: any
  let openMovieModalRequestMock: any
  let getMovieInfoRequestMock: any
  let getSerieInfoRequestMock: any
  let openVideoSectionRequestMock: any
  let openSimilarSectionRequestMock: any
  let openMoreInfoRequestMock: any
  let getCastRequestMock: any
  let getSerieFavoriteRequestMock: any
  let getMovieFavoriteRequestMock: any
  let removeFavMovieRequestMock: any
  let removeFavSerieRequestMock: any

  beforeEach(() => {
    openMovieModalRequestMock = jest.fn()
    getMovieInfoRequestMock = jest.fn()
    getSerieInfoRequestMock = jest.fn()
    openVideoSectionRequestMock = jest.fn()
    openSimilarSectionRequestMock = jest.fn()
    openMoreInfoRequestMock = jest.fn()
    getCastRequestMock = jest.fn()
    getSerieFavoriteRequestMock = jest.fn()
    getMovieFavoriteRequestMock = jest.fn()
    removeFavMovieRequestMock = jest.fn()
    removeFavSerieRequestMock = jest.fn()

    setup = (testProps: any = {}) => {
      const userProps = {
        id: 666,
        title: 'matrix',
        overview: 'Lorem, ipsum',
        backdrop_path: 'lorem.jpg',
        movieInfo: {
          genres: [{ id: 32, name: 'action' }],
          tagline: 'its a movie ok?',
          videos: {
            results: [
              { id: 345, key: 'fdfgdfg', name: 'just a title' },
              { id: 634, key: 'fasssss', name: 'just another title' },
              { id: 6555, key: 'yassss', name: 'just another title again' },
              { id: 666, key: 'hehehe', name: 'yes' },
            ]
          }
        },

        serieInfo: {
          genres: [{ id: 32, name: 'action' }],
          tagline: 'its a movie ok?',
          name: 'GOT',
          id: 666,
          backdrop_path: 'poster.jpg',
          videos: {
            results: [
              { id: 345, key: 'fdfgdfg', name: 'just a title' },
              { id: 634, key: 'fasssss', name: 'just another title' },
              { id: 6555, key: 'yassss', name: 'just another title again' },
              { id: 666, key: 'hehehe', name: 'yes' },
            ]
          }
        },

        favMovies: [{ id: 666 }],
        favSeries: [{ id: 666 }],

        isUserSignedIn: true,
        isMovieCatSelected: true,
        isMovieModalOpen: true,
        isVideoSectionOpen: false,
        isSimilarSectionOpen: false,
        isMoreInfoOpen: false,

        openMovieModalRequest: openMovieModalRequestMock,
        getMovieInfoRequest: getMovieInfoRequestMock,
        getSerieInfoRequest: getSerieInfoRequestMock,
        openVideoSectionRequest: openVideoSectionRequestMock,
        openSimilarSectionRequest: openSimilarSectionRequestMock,
        openMoreInfoRequest: openMoreInfoRequestMock,
        getCastRequest: getCastRequestMock,
        getSerieFavoriteRequest: getSerieFavoriteRequestMock,
        getMovieFavoriteRequest: getMovieFavoriteRequestMock,
        removeFavMovieRequest: removeFavMovieRequestMock,
        removeFavSerieRequest: removeFavSerieRequestMock
      }

      const props = { ...userProps, ...testProps }
      wrapper = mount(<UnconnectedMovieModal {...props} />)
      return wrapper
    }
  })

  test('should render component', () => {
    setup()
    const component = findByTestAttr(wrapper, 'component-modal')
    expect(component.length).toBe(1)
  })

  test('should test if all elements are rendered inside modal', () => {
    setup()
    const video = wrapper.find('YouTube')
    const title = findByTestAttr(wrapper, 'modal-title')
    const tagline = wrapper.find('.info-inner h5')
    const overview = findByTestAttr(wrapper, 'modal-overview')
    const genres = wrapper.find('.modal-genres')

    expect(video.length).toBe(1)
    expect(title.text()).toContain('matrix')
    expect(tagline.text()).toContain('its a movie ok?')
    expect(overview.text()).toContain('Lorem, ipsum')
    expect(genres.text()).toContain('action')
  })

  test('should print stuff if series category is active', () => {
    setup({ isMovieCatSelected: false })
    const tagline = wrapper.find('.info-inner h5')
    expect(tagline.text()).toEqual('')
  })

  test('should test if video button is NOT rendered if there are no data ', () => {
    setup({ movieInfo: { videos: { results: [] } } })
    const videosBtn = findByTestAttr(wrapper, 'videosBtn')
    expect(videosBtn.length).toBe(0)
  })

  test('should test if similars button is NOT rendered if there are no data ', () => {
    setup({ movieInfo: { similar: { results: [] } } })
    const relatedBtn = findByTestAttr(wrapper, 'relatedBtn')
    expect(relatedBtn.length).toBe(0)
  })


  test('should test action calls on mount', () => {
    setup()
    expect(openVideoSectionRequestMock).toHaveBeenCalledTimes(1)
    expect(openSimilarSectionRequestMock).toHaveBeenCalledTimes(1)
    expect(openMoreInfoRequestMock).toHaveBeenCalledTimes(1)
  })

  test('should test close btn', () => {
    setup()
    const close = wrapper.find('.close')
    close.simulate('click')
    expect(openMovieModalRequestMock).toHaveBeenCalledTimes(1)
    expect(openMovieModalRequestMock).toHaveBeenCalledWith(false)
    expect(getMovieInfoRequestMock).toHaveBeenCalledTimes(1)
  })

  test('should test related videos button', () => {
    setup()
    const videosBtn = findByTestAttr(wrapper, 'videosBtn')
    videosBtn.simulate('click')
    // why is it called twice?
    expect(openVideoSectionRequestMock).toHaveBeenCalledTimes(2)

  })

  test('should test related items button', () => {
    setup()
    const relatedBtn = findByTestAttr(wrapper, 'relatedBtn')
    relatedBtn.simulate('click')
    // why is it called twice?
    expect(openSimilarSectionRequestMock).toHaveBeenCalledTimes(2)
  })

  test('should test more info button', () => {
    setup()
    const infoBtn = findByTestAttr(wrapper, 'infoBtn')
    infoBtn.simulate('click')
    // why is it called twice?
    expect(openMoreInfoRequestMock).toHaveBeenCalledTimes(2)
    expect(openMoreInfoRequestMock).toHaveBeenCalledWith(true)
    expect(getCastRequestMock).toHaveBeenCalledTimes(1)
    expect(getCastRequestMock).toHaveBeenCalledWith(666)
  })

  test('should test button if series category selected', () => {
    setup({ isMovieCatSelected: false })
    expect(getSerieInfoRequestMock).toHaveBeenCalledTimes(1)
  })

  test('should test remove from favorites Action', () => {
    setup()
    // for remove button to appear the id passed (from component props)
    // has to be equal with an id found inside the favMovies array
    const removeFromFav = findByTestAttr(wrapper, 'remove-cta')
    removeFromFav.simulate('click')
    expect(removeFavMovieRequestMock).toHaveBeenCalledTimes(1)
    // on click calls the handleMovieFavs
    // which removes the favorite and passes id '666' and genreId '32'
    // genreId is passed from movieInfo via props to component
    expect(removeFavMovieRequestMock).toHaveBeenCalledWith(666, 32)
  })


  test('should test add to favorites Action', () => {
    setup({ favMovies: [{ id: 1 }] })
    // for add button to appear the id passed (from component props)
    // needs to be different from id found inside favMovies array
    const addToFav = findByTestAttr(wrapper, 'add-cta')
    addToFav.simulate('click')
    expect(getMovieFavoriteRequestMock).toHaveBeenCalledTimes(1)
    // on click calls the handleMovieFavs
    // which adds to favs passing these 4 arguments 
    // all taken from movieInfo and passed to the function
    expect(getMovieFavoriteRequestMock).toHaveBeenCalledWith(
      { "genreId": 32, "id": 666, "poster": "lorem.jpg", "title": "matrix" }
    )
  })

  // same as movie buttons above
  test('should remove favorite serie', () => {
    setup({ isMovieCatSelected: false })
    const removeFromFavSerie = findByTestAttr(wrapper, 'remove-cta-serie')
    removeFromFavSerie.simulate('click')
    expect(removeFavSerieRequestMock).toHaveBeenCalledTimes(1)
    expect(removeFavSerieRequestMock).toHaveBeenCalledWith(666, 32)
  })

  // same as movie buttons above
  test('should test add favorite serie', () => {
    setup({ isMovieCatSelected: false, favSeries: [{ id: 1 }] })
    const removeFromFavSerie = findByTestAttr(wrapper, 'add-cta-serie')
    removeFromFavSerie.simulate('click')
    expect(getSerieFavoriteRequestMock).toHaveBeenCalledTimes(1)
    expect(getSerieFavoriteRequestMock).toHaveBeenCalledWith({ "genreId": 32, "id": 666, "name": "GOT", "poster": "poster.jpg" })
  })

  test('should NOT render buttons if user is NOT signed in', () => {
    setup({ isUserSignedIn: false })
    const removeFromFav = findByTestAttr(wrapper, 'remove-cta')
    expect(removeFromFav.length).toBe(0)

    setup({ isUserSignedIn: false, isMovieCatSelected: false })
    const removeFromFavSerie = findByTestAttr(wrapper, 'remove-cta-serie')
    expect(removeFromFavSerie.length).toBe(0)
  })


})

