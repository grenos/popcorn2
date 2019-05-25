import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils';
import EnzymeAdapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import SearchInput, { UnconnectedSearchInput } from '../components/SearchInput/UI'
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



describe('test input and dispatch action', () => {
  // this need to be a the action that gets mocked
  // let changeValueMock
  let wrapper
  const userInput = 'matrix'

  beforeEach(() => {
    // changeValueMock = jest.fn()
    const props = {
      // handleChange: changeValueMock
    }

    wrapper = shallow(<UnconnectedSearchInput {...props} />).dive()
    // wrapper = mount(<UnconnectedSearchInput {...props} />)
  })

  test('should update input value', () => {
    const input = findByTestAttr(wrapper, 'search-input').dive()
    // const input = findByTestAttr(wrapper, 'search-input').last()

    expect(input.name()).toBe('input')
    expect(input.props().value).toBe('')

    input.props().onChange({ currentTarget: { value: userInput } })
    // input.simulate('change', { currentTarget: { value: userInput } })

    // used with mount
    // act(() => {
    //   input.props().onChange({ currentTarget: { value: userInput } })
    // })
    // wrapper.update()


    // expect(changeValueMock).toBeCalledTimes(1)
    // expect(input.prop('value')).toBe(userInput);
    // expect(input.props().value).toBe('')


  })
})
