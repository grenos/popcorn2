import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import { UnconnectedSlideMenu } from '../components/SlideMenu/SlideMenu'
Enzyme.configure({ adapter: new EnzymeAdapter() })

import { MemoryRouter as Router } from 'react-router-dom'
import { createLocation, createMemoryHistory } from 'history'
const location = createLocation({ state: { from: '' } })
const history = createMemoryHistory()
const mountWithRouter = (UnconnectedSlideMenu: any) =>
  mount(<Router>{UnconnectedSlideMenu}</Router>);




describe('<UnconnectedSlideMenu />', () => {
  let wrapper: any
  let getMoviesByGenreRequestMock: any
  let getSeriesByGenreRequestMock: any
  let getMovieGenresRequestMock: any
  let getSerieGenresRequestMock: any
  let setup: any
  let openAuthModalMock: any
  let userSignedInMock: any
  let clearUserInfoMock: any
  let getToggleMenuRequestMock: any
  let setAuthModalUIMock: any

  beforeEach(() => {
    getMoviesByGenreRequestMock = jest.fn()
    getSeriesByGenreRequestMock = jest.fn()
    getMovieGenresRequestMock = jest.fn()
    getSerieGenresRequestMock = jest.fn()
    openAuthModalMock = jest.fn()
    userSignedInMock = jest.fn()
    clearUserInfoMock = jest.fn()
    getToggleMenuRequestMock = jest.fn()
    setAuthModalUIMock = jest.fn()

    setup = (initialState: any = {}, testProps: any = {}) => {
      const userProps = {
        isMenuOpenProp: true,
        movieGenres: { id: 28, name: 'Action' },
        serieGenres: { id: 10759, name: '"Action & Adventure"' },
        isMovieCatSelected: true,
        location,
        history,
        userInfo: { attrubutes: { name: 'vas' } },
        isUserSignedIn: true,
        isAuthModalUI: 1
      }

      const Mocks = {
        getMoviesByGenreRequest: getMoviesByGenreRequestMock,
        getSeriesByGenreRequest: getSeriesByGenreRequestMock,
        getMovieGenresRequest: getMovieGenresRequestMock,
        getSerieGenresRequest: getSerieGenresRequestMock,
        userSignedIn: userSignedInMock,
        clearUserInfo: clearUserInfoMock,
        getToggleMenuRequest: getToggleMenuRequestMock,
        setAuthModalUI: setAuthModalUIMock,
        openAuthModal: openAuthModalMock
      }

      const store = storeFactory(initialState)
      const props = { ...Mocks, ...userProps, ...testProps }

      wrapper = shallow(<UnconnectedSlideMenu store={store} {...props} />)
      return wrapper
    }
  })


  test('should render component', () => {
    setup()
    const component = findByTestAttr(wrapper, 'slide-menu')
    expect(component.length).toBe(1)
  })

  test('should test if isMenuOpen prop open menu', () => {
    setup()
    expect(wrapper.find('.nav-wrapper').length).toBe(1)
  })

  test('should test if isMovieCatSelected prop renders MovieGenres', () => {
    setup()
    expect(wrapper.find('#movie-genres').length).toBe(1)
  })

  test('should test if not isSerieCatSelected prop renders SerieGenres', () => {
    setup({}, { isMovieCatSelected: false })

    expect(wrapper.find('#serie-genres').length).toBe(1)
  })
})


