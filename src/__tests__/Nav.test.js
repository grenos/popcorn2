import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import 'jest-dom/extend-expect'
import sinon from 'sinon';

import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import Nav from '../components/Nav/Nav'

Enzyme.configure({ adapter: new EnzymeAdapter() })



const setup = () => {
  const wrapper = shallow(<Nav />).dive()
  return wrapper
}


test('should render nav component', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'component-nav')
  expect(component.length).toBe(1)
})


describe('CSS props before and after scroll animation', () => {
  let wrapper

  beforeEach(() => {
    wrapper = setup()
  })

  test('nav should change css on scroll', () => {
    const component = findByTestAttr(wrapper, 'component-nav')

    // save original css before anim set by js
    const initStyleNav = component.prop('style')

    // simulate scroll

    // save animated CSS values after scroll simulation
    const newStyleNav = component.prop('style')

    // expect old css NOT to be equal to new css
    // expect(initStyleNav).not.toEqual(newStyleNav)
  })
})


