// unconnecteed compoent get the right props from store
// check the one lazy loaded (how?)
// check if renders fallback "loading" component

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { storeFactory } from '../helpers/testUtils'
import App, { UnconnectedApp } from '../components/App/App'


Enzyme.configure({ adapter: new EnzymeAdapter() })
const defaultProps = { isMenuOpen: false }


const setup = (initialState = {}, props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const store = storeFactory(initialState)
  const wrapper = shallow(<App store={store} {...setupProps} />).dive().dive()
  return wrapper
}


describe('should render components', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })

  test('should render nav', () => {
    const nav = wrapper.find('Nav').dive()
    expect(nav.length).toBe(1)
  })

  test('should render slide menu', () => {
    //  lazy loaded not fully supported yet
  })

  test('should render menu toggle', () => {
    const MenuToggle = wrapper.find('ConnectFunction')
    expect(MenuToggle.length).toBe(1)
  })
})

