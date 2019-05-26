import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import SearchInput, { UnconnectedSearchInput } from '../components/SearchInput/SearchInput'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
Enzyme.configure({ adapter: new EnzymeAdapter() })


const defaultProps = { scrolled: 21 }
const setup = (initialState = {}, props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const store = storeFactory(initialState)
  const wrapper = shallow(<SearchInput store={store} {...setupProps} />).dive()
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


describe('guessWord action creator call', () => {
  let getUserInputRequestMock: any
  let wrapper: any
  const userInput = 'matrix'

  beforeEach(() => {
    getUserInputRequestMock = jest.fn()

    const props = {
      scrolled: 19,
      getUserInputRequest: getUserInputRequestMock
    }

    wrapper = shallow(<UnconnectedSearchInput {...props} />)
    findByTestAttr(wrapper, 'search-input')
      .dive().props().onChange({ target: { value: userInput } })
  })

  test('should call getUserInputRequest action onKeyUp with userInput value', () => {
    findByTestAttr(wrapper, 'search-input').dive().props().onKeyUp(userInput)
    expect(getUserInputRequestMock).toHaveBeenCalledTimes(1)
    expect(getUserInputRequestMock).toHaveBeenCalledWith(userInput)
  })
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
