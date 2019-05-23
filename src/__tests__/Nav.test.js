import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import 'jest-dom/extend-expect'
import { findByTestAttr } from '../helpers/testUtils'
import Nav from '../components/Nav/Nav'



Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = { scrolled: 21 }

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const wrapper = shallow(<Nav {...setupProps} />).dive()
  return wrapper
}

describe('should render components', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })

  test('should render nav component', () => {
    const component = findByTestAttr(wrapper, 'component-nav')
    expect(component.length).toBe(1)
  })
  test('should render logo component', () => {
    const component = findByTestAttr(wrapper, 'nav-logo')
    expect(component.length).toBe(1)
  })
  test('should render toggle component', () => {
    const component = findByTestAttr(wrapper, 'nav-toggle')
    expect(component.length).toBe(1)
  })
})





describe('CSS props before and after scroll animation', () => {
  let wrapper

  const navCSSprops = {
    background: "rgba(0, 0, 0, 0.6)",
    boxShadow: "0px 0px 10px 20px rgba(0, 0, 0, 0.6)",
    height: "50px"
  }
  const logoCSSprops = {
    opacity: 0.6,
    transform: "scale(0.7)"
  }

  const toggleCSSprops = {
    transform: "scale(1) translateX(15%)"
  }

  beforeEach(() => {
    wrapper = setup({ defaultProps })
  })


  test('nav component to animate css if props > 20', () => {
    const component = findByTestAttr(wrapper, 'component-nav')
    const animStyleNav = component.prop('style')
    expect(animStyleNav).toEqual(navCSSprops)
  })
  test('logo element to animate css if props > 20', () => {
    const component = findByTestAttr(wrapper, 'nav-logo')
    const animStyleLogo = component.dive().prop('style')
    expect(animStyleLogo).toEqual(logoCSSprops)
  })
  test('categories elements to animate css if props > 20', () => {
    const component = findByTestAttr(wrapper, 'nav-toggle')
    const animStyleToggle = component.dive().prop('style')
    expect(animStyleToggle).toEqual(toggleCSSprops)
  })
})
