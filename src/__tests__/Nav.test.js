import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import 'jest-dom/extend-expect'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import Nav from '../components/Nav/Nav'



Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = { scrolled: 21 }

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const wrapper = shallow(<Nav {...setupProps} />).dive()
  return wrapper
}



test('should render nav component', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'component-nav')
  expect(component.length).toBe(1)
})


describe('CSS props before and after scroll animation', () => {
  let wrapper

  const navCSSprops = {
    background: "rgba(0, 0, 0, 0.6)",
    boxShadow: "0px 0px 10px 20px rgba(0, 0, 0, 0.6)",
    height: "50px"
  }
  const imgCSSprops = {
    marginTop: "30px",
    opacity: '0.6',
    transform: "rotate(0deg)",
    width: "240px"
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
    const animStyleNav = component.prop('style')
    expect(animStyleNav).toEqual(imgCSSprops)
  })
  test('categories elements to animate css if props > 20', () => {

  })

})




// wrapper = setup({ scrolled: 19 })
// const newStyleNav = component.prop('style')

// // expect old css NOT to be equal to new css
// expect(initStyleNav).not.toEqual(newStyleNav)