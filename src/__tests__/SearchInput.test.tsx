import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import SearchInput, { UnconnectedSearchInput } from '../components/SearchInput/SearchInput'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
Enzyme.configure({ adapter: new EnzymeAdapter() })
import { createMemoryHistory } from 'history'
import { MemoryRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'


const history = createMemoryHistory()
const mountWithRouter = (UnconnectedNavToggle: any) =>
  mount(<Router>{UnconnectedNavToggle}</Router>);

const defaultProps = { scrolled: 21 }


const setup = (initialState = {}, props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const store = storeFactory(initialState)
  const wrapper = mountWithRouter(<SearchInput store={store} {...setupProps} />)
  return wrapper
}


describe('should render components', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = setup()
  })

  test('shoud render input component', () => {
    const component = findByTestAttr(wrapper, 'component-search-input').last()
    expect(component.length).toBe(1)
  })

  test('shoud render input', () => {
    const input = findByTestAttr(wrapper, 'search-input').last()
    expect(input.length).toBe(1)
  })
})





describe('<UnconnectedSearchInput>', () => {
  let getUserInputMovieRequestMock: Function
  let getUserInputSeriesRequestMock: Function
  let userHasTypedRequestMock: Function
  let wrapper: any
  let userInput: string
  let props: any

  beforeEach(() => {
    getUserInputMovieRequestMock = jest.fn()
    getUserInputSeriesRequestMock = jest.fn()
    userHasTypedRequestMock = jest.fn()

    props = {
      getUserInputMoviesRequest: getUserInputMovieRequestMock,
      getUserInputSeriesRequest: getUserInputSeriesRequestMock,
      userHasTypedRequest: userHasTypedRequestMock,
      isMovieCatSelected: true,
      isSerieCatSelected: false,
      scrolled: 31,
      history: history
    }
    userInput = 'matrix'
    wrapper = shallow(<UnconnectedSearchInput {...props} />)
  })

  test('should call getUserInputMoviesRequest action onKeyUp with userInput value', () => {
    act(() => {
      findByTestAttr(wrapper, 'search-input').last().props().onChange({ target: { value: userInput } })
      findByTestAttr(wrapper, 'search-input').last().props().onKeyUp(userInput)
    })
    expect(getUserInputMovieRequestMock).toHaveBeenCalledTimes(1)
    expect(getUserInputMovieRequestMock).toHaveBeenCalledWith(userInput)
  })


  test('should call getUserInputSeriesRequest action onKeyUp with userInput value', () => {
    const userProps = {
      isMovieCatSelected: false,
      isSerieCatSelected: true,
      scrolled: 31,
      getUserInputMoviesRequest: getUserInputMovieRequestMock,
      getUserInputSeriesRequest: getUserInputSeriesRequestMock,
      userHasTypedRequest: userHasTypedRequestMock,
      history: history
    }
    wrapper = shallow(<UnconnectedSearchInput {...userProps} />)

    act(() => {
      findByTestAttr(wrapper, 'search-input').last().props().onChange({ target: { value: userInput } })
      findByTestAttr(wrapper, 'search-input').last().props().onKeyUp(userInput)
    })
    expect(getUserInputSeriesRequestMock).toHaveBeenCalledTimes(1)
    expect(getUserInputSeriesRequestMock).toHaveBeenCalledWith(userInput)
  })


  test('should call userHasTypedRequest action onKeyUp with userInput value', () => {
    act(() => {
      findByTestAttr(wrapper, 'search-input').last().props().onChange({ target: { value: userInput } })
      findByTestAttr(wrapper, 'search-input').last().props().onKeyUp(userInput)
    })
    expect(userHasTypedRequestMock).toHaveBeenCalledTimes(1)
  })

  test('should update input value', () => {
    const input = findByTestAttr(wrapper, 'search-input').last()
    expect(input.props().value).toEqual('')
    input.props().onChange({ target: { value: '_test_' } })
    expect(findByTestAttr(wrapper, 'search-input').last().props().value).toEqual('_test_')
  })

  test('should animate border width', () => {
    const input = findByTestAttr(wrapper, 'search-input').dive()
    expect(input.prop('style')).toEqual({ 'borderWidth': 1 })
  })
})





