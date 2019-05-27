import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import SearchInput, { UnconnectedSearchInput } from '../components/SearchInput/SearchInput'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import * as INT from '../helpers/interfaces'
Enzyme.configure({ adapter: new EnzymeAdapter() })


const defaultMovieProp = [{
  vote_count: 2,
  id: 12,
  video: true,
  vote_average: 34,
  title: 'test',
  popularity: 654,
  poster_path: 'test',
  original_language: 'test',
  original_title: 'test',
  genre_ids: [12],
  backdrop_path: 'test',
  adult: false,
  overview: 'test',
  release_date: 'test'
}]
const defaultProps = { scrolled: 21 }


const setup = (initialState = {}, props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const store = storeFactory(initialState)
  const wrapper = shallow(<SearchInput store={store} {...setupProps} />).dive().dive()
  return wrapper
}


describe('should render components', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = setup()
  })

  test('shoud render input component', () => {
    const component = findByTestAttr(wrapper, 'component-search-input')
    expect(component.length).toBe(1)
  })

  test('shoud render input', () => {
    const input = findByTestAttr(wrapper, 'search-input')
    expect(input.length).toBe(1)
  })
})


test('should update input value', () => {
  const wrapper = setup()
  const input = findByTestAttr(wrapper, 'search-input').dive()
  expect(input.props().value).toEqual('')
  input.props().onChange({ target: { value: '_test_' } })
  expect(findByTestAttr(wrapper, 'search-input').dive().props().value).toEqual('_test_')
})



test('should call getUserInputMoviesRequest action onKeyUp with userInput value when topMovies has length bigger than 0', () => {
  const getUserInputMovieRequestMock = jest.fn()
  const props = {
    scrolled: 19,
    getUserInputMoviesRequest: getUserInputMovieRequestMock,
    topMovies: defaultMovieProp as INT.IMovie[]
  }
  const userInput = 'matrix'
  const wrapper = shallow(<UnconnectedSearchInput {...props} />)

  findByTestAttr(wrapper, 'search-input')
    .dive().props().onChange({ target: { value: userInput } })

  findByTestAttr(wrapper, 'search-input').dive().props().onKeyUp(userInput)
  expect(getUserInputMovieRequestMock).toHaveBeenCalledTimes(1)
  expect(getUserInputMovieRequestMock).toHaveBeenCalledWith(userInput)
})

test('should call getUserInputSeriesRequest action onKeyUp with userInput value when topMovies is empty', () => {
  const getUserInputSerieRequestMock = jest.fn()
  const props = {
    scrolled: 19,
    getUserInputSeriesRequest: getUserInputSerieRequestMock,
    topMovies: []
  }
  const userInput = 'matrix'
  const wrapper = shallow(<UnconnectedSearchInput {...props} />)

  findByTestAttr(wrapper, 'search-input')
    .dive().props().onChange({ target: { value: userInput } })

  findByTestAttr(wrapper, 'search-input').dive().props().onKeyUp(userInput)
  expect(getUserInputSerieRequestMock).toHaveBeenCalledTimes(1)
  expect(getUserInputSerieRequestMock).toHaveBeenCalledWith(userInput)
})





const inputContainerCSSprops = {
  opacity: 1
}
test('input container element to animate css if props > 20', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'component-search-input').dive()
  const animStyleInput = component.prop('style')
  expect(animStyleInput).toEqual(inputContainerCSSprops)
})

const inputCSSprops = {
  pointerEvents: 'all',
  width: '190px'
}
test('input element to animate css if props > 20', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'search-input').dive()
  const animStyleInput = component.prop('style')
  expect(animStyleInput).toEqual(inputCSSprops)
})
