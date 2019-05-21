import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import Nav from '../components/Nav/Nav'

Enzyme.configure({ adapter: new EnzymeAdapter() })


const setup = () => {
  const wrapper = shallow(<Nav />)
  return wrapper
}


test('should render nav component', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'component-nav')
  expect(component.length).toBe(1)
})

