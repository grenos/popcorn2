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

  beforeEach(() => {
    getToggleMovieCatRequestMock = jest.fn()
    getToggleSerieCatRequestMock = jest.fn()
    clearMoviesByGenreStateMock = jest.fn()
    clearSeriesByGenreStateMock = jest.fn()

    const props = {
      getToggleMovieCatRequest: getToggleMovieCatRequestMock,
      getToggleSerieCatRequest: getToggleSerieCatRequestMock,
      clearMoviesByGenreState: clearMoviesByGenreStateMock,
      clearSeriesByGenreState: clearSeriesByGenreStateMock,
      history: history
    }
    wrapper = mountWithRouter(<UnconnectedNavToggle {...props} />)

    const toggleFilms = findByTestAttr(wrapper, 'toggle-film')
    toggleFilms.simulate('click')
    const toggleSeries = findByTestAttr(wrapper, 'toggle-serie')
    toggleSeries.simulate('click')
  })

  test('should render toggle component', () => {
    const component = findByTestAttr(wrapper, 'nav-toggle').last()
    expect(component.length).toBe(1)
  })

  test('should call getToggleMoviesRequest action', () => {
    const movieToggleCallCount = getToggleMovieCatRequestMock.mock.calls.length
    expect(movieToggleCallCount).toBe(2)
    expect(getToggleMovieCatRequestMock).toHaveBeenCalledWith(true)
    expect(getToggleMovieCatRequestMock).toHaveBeenCalledWith(false)
  })

  test('should call getToggleSeriesRequest action', () => {
    const serieToggleCallCount = getToggleSerieCatRequestMock.mock.calls.length
    expect(serieToggleCallCount).toBe(2)
    expect(getToggleSerieCatRequestMock).toHaveBeenCalledWith(true)
    expect(getToggleSerieCatRequestMock).toHaveBeenCalledWith(false)
  })

  test('should call clearMoviesByGenreState action', () => {
    const clearMoviesByGenreStateCount = clearMoviesByGenreStateMock.mock.calls.length
    expect(clearMoviesByGenreStateCount).toBe(1)
    expect(clearMoviesByGenreStateMock).toHaveBeenCalledWith()
  })

  test('should call clearSeriesByGenreState action', () => {
    const clearSeriesByGenreStateCount = clearSeriesByGenreStateMock.mock.calls.length
    expect(clearSeriesByGenreStateCount).toBe(1)
    expect(clearSeriesByGenreStateMock).toHaveBeenCalledWith()
  })

  test('should call history.push', () => {

  })


});
