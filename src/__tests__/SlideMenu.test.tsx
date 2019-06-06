import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import SlideMenu, { UnconnectedSlideMenu } from '../components/SlideMenu/SlideMenu'
Enzyme.configure({ adapter: new EnzymeAdapter() })


test('should render component', () => {
  const initialState = {}
  const store = storeFactory(initialState)
  const wrapper = shallow(<SlideMenu store={store} />).dive().dive()
  const component = findByTestAttr(wrapper, 'slide-menu')
  expect(component.length).toBe(1)
})


