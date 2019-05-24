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
  let wrapper
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




describe('guessWord action creator call', () => {
  let getUserInputRequestMock
  let wrapper
  const userInput = 'matrix'

  beforeEach(() => {
    getUserInputRequestMock = jest.fn()

    const props = {
      onChange: getUserInputRequestMock
    }


    wrapper = shallow(<UnconnectedSearchInput {...props} />).dive()

    const component = findByTestAttr(wrapper, 'search-input')
    const input = component.dive()
    expect(input.name()).toBe('input')

    console.log(input.debug());


    input.simulate('change', { currentTarget: { name: 'search', value: userInput } })
    // input.props().onChange({ currentTarget: { name: 'search', value: userInput } })

    // expect(getUserInputRequestMock).toHaveBeenCalled();

    // const MockFn = getUserInputRequestMock.mock.calls.length
    // expect(MockFn).toBe(1)

    // expect(getUserInputRequestMock.mock.calls[0][0]).toBe(userInput);
    // expect(input.prop('value')).toBe(userInput);



  })



  test('should call guessWord with input value as argument', () => {
    // console.log(getUserInputRequestMock.mock.calls);
    // const guessWordArg = getUserInputRequestMock.mock.calls[0][0]
    // expect(guessWordArg).toBe(userInput)
  })

  test('should clear inout value on submit', () => {
    // expect(wrapper.instance().inputBox.current.value).toBe('')
  })

})
