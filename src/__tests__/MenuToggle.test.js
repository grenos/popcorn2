import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import MenuToggle, { UnconnectedMenuToggle } from '../components/MenuToggle/MenuToggle'
Enzyme.configure({ adapter: new EnzymeAdapter() })


const setup = (initialState = {}) => {
  const store = storeFactory(initialState)
  const wrapper = shallow(<MenuToggle store={store} />).dive()
  return wrapper
}

test('should render button component', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'button-toggle')
  expect(button.length).toBe(1)
})


test('should animate button on click', () => {
  // const defaultProps = { transform: "translate3d(0px,0,0)" }
  // const wrapper = setup()
  // const button = findByTestAttr(wrapper, 'button-toggle').dive()

  // const buttonNotClicked = button.prop('style')
  // expect(buttonNotClicked).toEqual(defaultProps)

  // findByTestAttr(wrapper, 'button-toggle').dive().props().onClick()
  // expect(findByTestAttr(wrapper, 'button-toggle').dive().prop('style')).toEqual(0)
})


test('should animate img on click', () => {
  //   const wrapper = setup().dive()
  //   const button = findByTestAttr(wrapper, 'button-toggle')
  //   const img = findByTestAttr(wrapper, 'img-toggle')

  //   const imgNotClicked = button.style
  //   expect(imgNotClicked).toEqual(img.props.style)

  //   button.simulate('click')
  //   const imgClicked = findByTestAttr(wrapper, 'button-toggle')
  //   const toggleCSSprops = imgClicked.props.style

  //   expect(toggleCSSprops).toEqual(imgClicked.props.style)
})

