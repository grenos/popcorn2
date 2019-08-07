import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import 'jest-dom/extend-expect'
import { findByTestAttr } from '../helpers/testUtils'
import { UnconnectedNavToggle } from '../components/NavToggle/NavToggle'
import { createMemoryHistory } from 'history'
import { MemoryRouter as Router } from 'react-router-dom';
Enzyme.configure({ adapter: new EnzymeAdapter() })


const history = createMemoryHistory()
const mountWithRouter = (UnconnectedNavToggle: any) =>
  mount(<Router>{UnconnectedNavToggle}</Router>);



describe('should call action creators', () => {
  let getToggleMovieCatRequestMock: any
  let getToggleSerieCatRequestMock: any
  let clearMoviesByGenreStateMock: any
  let clearSeriesByGenreStateMock: any
  let wrapper: any
  let setup: any
  let setAuthModalUIMock: any
  let openAuthModalMock: any
  let getToggleMenuRequestMock: any

  beforeEach(() => {
    getToggleMovieCatRequestMock = jest.fn()
    getToggleSerieCatRequestMock = jest.fn()
    clearMoviesByGenreStateMock = jest.fn()
    clearSeriesByGenreStateMock = jest.fn()
    setAuthModalUIMock = jest.fn()
    openAuthModalMock = jest.fn()
    getToggleMenuRequestMock = jest.fn()

    setup = (testProps: any = {}) => {
      const userProps = {
        getToggleMovieCatRequest: getToggleMovieCatRequestMock,
        getToggleSerieCatRequest: getToggleSerieCatRequestMock,
        clearMoviesByGenreState: clearMoviesByGenreStateMock,
        clearSeriesByGenreState: clearSeriesByGenreStateMock,
        setAuthModalUI: setAuthModalUIMock,
        openAuthModal: openAuthModalMock,
        getToggleMenuRequest: getToggleMenuRequestMock,
        history: history,
        isUserSignedIn: false
      }

      const props = { ...userProps, ...testProps }
      wrapper = mountWithRouter(<UnconnectedNavToggle {...props} />)
      return wrapper
    }

  })

  test('should render toggle component', () => {
    setup()
    const component = findByTestAttr(wrapper, 'nav-toggle').last()
    console.log(component.debug());

    expect(component.length).toBe(1)
  })

  test('should render text links', () => {
    setup()
    const toggleFilms = findByTestAttr(wrapper, 'toggle-film')
    const toggleSeries = findByTestAttr(wrapper, 'toggle-serie')
    const favorites = findByTestAttr(wrapper, 'favorites-button')

    expect(toggleFilms.text()).toEqual('Movies')
    expect(toggleSeries.text()).toEqual('Series')
    expect(favorites.text()).toEqual('My Favorites')
  })


  test('should handle movies button click', () => {
    setup()
    const toggleFilms = findByTestAttr(wrapper, 'toggle-film')

    expect(getToggleMovieCatRequestMock.mock.calls.length).toBe(0)
    expect(getToggleSerieCatRequestMock.mock.calls.length).toBe(0)

    toggleFilms.simulate('click')

    expect(getToggleMovieCatRequestMock.mock.calls.length).toBe(1)
    expect(getToggleMovieCatRequestMock).toHaveBeenCalledWith(true)
    expect(getToggleSerieCatRequestMock.mock.calls.length).toBe(1)
    expect(getToggleSerieCatRequestMock).toHaveBeenCalledWith(false)
    expect(clearSeriesByGenreStateMock.mock.calls.length).toBe(1)
  })

  test('should handle series button click', () => {
    setup()
    const toggleSeries = findByTestAttr(wrapper, 'toggle-serie')

    expect(getToggleMovieCatRequestMock.mock.calls.length).toBe(0)
    expect(getToggleSerieCatRequestMock.mock.calls.length).toBe(0)

    toggleSeries.simulate('click')

    expect(getToggleMovieCatRequestMock.mock.calls.length).toBe(1)
    expect(getToggleMovieCatRequestMock).toHaveBeenCalledWith(false)
    expect(getToggleSerieCatRequestMock.mock.calls.length).toBe(1)
    expect(getToggleSerieCatRequestMock).toHaveBeenCalledWith(true)
    expect(clearMoviesByGenreStateMock.mock.calls.length).toBe(1)

  })

  test('should handle favorites button click', () => {
    setup()
    jest.useFakeTimers()

    const favorites = findByTestAttr(wrapper, 'favorites-button')
    favorites.simulate('click')

    expect(getToggleMenuRequestMock).toHaveBeenCalledTimes(1)
    expect(getToggleMenuRequestMock).toHaveBeenCalledWith(true)
    expect(setAuthModalUIMock).toHaveBeenCalledTimes(1)
    expect(setAuthModalUIMock).toHaveBeenCalledWith(1)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })
})
