import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import 'jest-dom/extend-expect'
import { findByTestAttr } from '../helpers/testUtils'
import NavToggle from '../components/NavToggle/NavToggle'


Enzyme.configure({ adapter: new EnzymeAdapter() })
const defaultProps = { scrolled: 21 }


const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const wrapper = shallow(<NavToggle {...setupProps} />).dive()
  return wrapper
}


test('should render toggle component', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'nav-toggle')
  expect(component.length).toBe(1)
})


const toggleCSSprops = {
  transform: "scale(1) translateX(70%)"
}
test('categories elements to animate css if props > 20', () => {
  const wrapper = setup({ defaultProps })
  const component = findByTestAttr(wrapper, 'nav-toggle')
  const animStyleToggle = component.prop('style')
  expect(animStyleToggle).toEqual(toggleCSSprops)
})



// describe('getUserInputRequest action creator call', () => {
//   let getUserInputRequestMock: any
//   let wrapper: any
//   const userInput = 'matrix'

//   beforeEach(() => {
//     getUserInputRequestMock = jest.fn()

//     const props = {
//       scrolled: 19,
//       getUserInputRequest: getUserInputRequestMock
//     }

//     wrapper = shallow(<UnconnectedNavToggle {...props} />)
//     findByTestAttr(wrapper, 'search-input')
//       .dive().props().onChange({ target: { value: userInput } })
//   })

//   test('should call getUserInputRequest action onKeyUp with userInput value', () => {
//     findByTestAttr(wrapper, 'search-input').dive().props().onKeyUp(userInput)
//     expect(getUserInputRequestMock).toHaveBeenCalledTimes(1)
//     expect(getUserInputRequestMock).toHaveBeenCalledWith(userInput)
//   })
// })
