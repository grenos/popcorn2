import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../helpers/testUtils'
import { UnconnectedSlideMenu } from '../components/SlideMenu/SlideMenu'
Enzyme.configure({ adapter: new EnzymeAdapter() })

import { MemoryRouter as Router } from 'react-router-dom'
import { createLocation } from 'history'
const location = createLocation({});
const mountWithRouter = (UnconnectedSlideMenu: any) =>
  mount(<Router>{UnconnectedSlideMenu}</Router>);


test('should render component', () => {
  const getMoviesByGenreRequestMock = jest.fn()
  const getSeriesByGenreRequestMock = jest.fn()
  const getMovieGenresRequestMock = jest.fn()
  const getSerieGenresRequestMock = jest.fn()

  const userProps = {
    isMenuOpenProp: false,
    movieGenres: [{ id: 28, name: 'Action' }],
    serieGenres: [{ id: 10759, name: '"Action & Adventure"' }],
    isMovieCatSelected: false,
    location: location
  }

  const Mocks = {
    getMoviesByGenreRequest: getMoviesByGenreRequestMock,
    getSeriesByGenreRequest: getSeriesByGenreRequestMock,
    getMovieGenresRequest: getMovieGenresRequestMock,
    getSerieGenresRequest: getSerieGenresRequestMock
  }
  const props = { ...Mocks, ...userProps }

  const wrapper = shallow(<UnconnectedSlideMenu {...props} />)
  const component = findByTestAttr(wrapper, 'slide-menu')
  expect(component.length).toBe(1)
})


describe('<UnconnectedSlideMenu />', () => {
  let wrapper: any
  let getMoviesByGenreRequestMock: any
  let getSeriesByGenreRequestMock: any
  let getMovieGenresRequestMock: any
  let getSerieGenresRequestMock: any
  let setup: any

  beforeEach(() => {
    getMoviesByGenreRequestMock = jest.fn()
    getSeriesByGenreRequestMock = jest.fn()
    getMovieGenresRequestMock = jest.fn()
    getSerieGenresRequestMock = jest.fn()

    setup = (testProps: any = {}) => {
      const userProps = {
        isMenuOpenProp: false,
        movieGenres: { id: 28, name: 'Action' },
        serieGenres: { id: 10759, name: '"Action & Adventure"' },
        isMovieCatSelected: false,
        location: location
      }

      const Mocks = {
        getMoviesByGenreRequest: getMoviesByGenreRequestMock,
        getSeriesByGenreRequest: getSeriesByGenreRequestMock,
        getMovieGenresRequest: getMovieGenresRequestMock,
        getSerieGenresRequest: getSerieGenresRequestMock
      }
      const props = { ...Mocks, ...userProps, ...testProps }

      wrapper = mountWithRouter(<UnconnectedSlideMenu {...props} />)
      return wrapper
    }
  })

  test('should test if isMenuOpen prop open menu', () => {
    const wrapper = setup({ isMenuOpenProp: true })
    expect(wrapper.find('.nav-wrapper').first().length).toBe(1)
  })

  test('should test if isMovieCatSelected prop renders MovieGenres', () => {
    const wrapper = setup({ isMovieCatSelected: true, isMenuOpenProp: true })
    expect(wrapper.find('#movie-genres').length).toBe(1)
  })

  test('should test if not isSerieCatSelected prop renders SerieGenres', () => {
    const wrapper = setup({ isMenuOpenProp: true })
    expect(wrapper.find('#serie-genres').length).toBe(1)
  })

  test('should test if getMoviesByGenreRequest gets called', () => {
    const wrapper = setup({ isMenuOpenProp: true, isMovieCatSelected: true })
    const list = findByTestAttr(wrapper, 'movie-genres-list-items').last()

    list.simulate('click')
    const getMoviesByGenreRequest = getMoviesByGenreRequestMock.mock.calls.length
    expect(getMoviesByGenreRequest).toBe(1)
    expect(getMoviesByGenreRequestMock).toHaveBeenCalledWith(28, 1)
  })

  test('should test if getSeriesByGenreRequest gets called', () => {
    const wrapper = setup({ isMenuOpenProp: true })
    const list = findByTestAttr(wrapper, 'serie-genres-list-items').last()

    list.simulate('click')
    const getSeriesByGenreRequest = getSeriesByGenreRequestMock.mock.calls.length
    expect(getSeriesByGenreRequest).toBe(1)
    expect(getSeriesByGenreRequestMock).toHaveBeenCalledWith(10759, 1)
  })

  test('should call getMovieGenresRequest', () => {
    setup({ isMovieCatSelected: true })
    const getMovieGenresRequest = getMovieGenresRequestMock.mock.calls.length
    expect(getMovieGenresRequest).toBe(1)
  })
})


