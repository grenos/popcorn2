import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import 'jest-dom/extend-expect'
import { findByTestAttr } from '../helpers/testUtils'
import Nav from '../components/Nav/Nav'
import * as INT from '../helpers/interfaces'

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
  let wrapper: any

  // this needs to be an interface
  const initStyleNav = {
    height: '90px',
    background: 'rgba(0, 0, 0, 0.2)',
    boxShadow: '0px 0px 10px 20px rgba(0, 0, 0, 0.2)'
  }

  beforeEach(() => {
    wrapper = setup()
  })


  test('nav should change css on scroll', () => {
    const component = findByTestAttr(wrapper, 'component-nav')

    // save original css before anim set by js
    const initStyleNav = component.prop('style')

    // simulate window scroll


    // save animated CSS values after scroll simulation
    const newStyleNav = component.prop('style')

    // expect old css NOT to be equal to new css
    // expect(initStyleNav).not.toEqual(newStyleNav)
  })
})


