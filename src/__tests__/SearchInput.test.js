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
      getUserInputRequest: getUserInputRequestMock
    }

    wrapper = shallow(<UnconnectedSearchInput {...props} />)

    const input = findByTestAttr(wrapper, 'search-input')
    expect(input.name()).to.equal('input')

    input.prop('onChange')({ currentTarget: { value: userInput } })
    // expect(input.prop('value')).toBe(userInput);


    // wrapper.instance().inputBox.current = { value: userInput }

    // simulate click
    // const submitButton = findByTestAttr(wrapper, 'input-button')
    // submitButton.simulate('click', { preventDefault() { } })
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
