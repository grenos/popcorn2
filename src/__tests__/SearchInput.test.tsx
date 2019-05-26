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
  let getUserInputRequestMock: Function
  let wrapper: any
  const userInput = 'matrix'

  beforeEach(() => {
    getUserInputRequestMock = jest.fn()

    const props = {
      scrolled: 21,
      getUserInputRequest: getUserInputRequestMock
    }

    wrapper = shallow(<UnconnectedSearchInput {...props} />)
    findByTestAttr(wrapper, 'search-input')
      .dive().props().onChange({ target: { value: '_test_' } })
  })

  test('should call guesseWord action when button is clicked', () => {
    // check to see if mock ran
    const mockedEvent = { target: { key: 'A' } };
    findByTestAttr(wrapper, 'search-input').dive().props().onKeyUp(mockedEvent)
    expect(getUserInputRequestMock).toHaveBeenCalledTimes(1);
    // expect(getUserInputRequestMock).toHaveBeenCalledWith(mockedEvent);

  })

  test('should call guessWord with input value as argument', () => {
    // console.log(guessWordMock.mock.calls);
    // const guessWordArg = guessWordMock.mock.calls[0][0]
    // expect(guessWordArg).toBe(guessedWord)
  })

  test('should clear inout value on submit', () => {
    // expect(wrapper.instance().inputBox.current.value).toBe('')
  })

})
