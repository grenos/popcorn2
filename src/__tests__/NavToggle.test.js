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

describe('should render components', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })

  test('should render toggle component', () => {
    const component = findByTestAttr(wrapper, 'nav-toggle')
    expect(component.length).toBe(1)
  })

})



describe('CSS props before and after scroll animation', () => {
  let wrapper

  const toggleCSSprops = {
    transform: "scale(1) translateX(70%)"
  }

  beforeEach(() => {
    wrapper = setup({ defaultProps })
  })

  test('categories elements to animate css if props > 20', () => {
    const component = findByTestAttr(wrapper, 'nav-toggle')
    const animStyleToggle = component.prop('style')
    expect(animStyleToggle).toEqual(toggleCSSprops)
  })
})
