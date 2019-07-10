import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { storeFactory } from '../helpers/testUtils'
import { UnconnectedApp } from '../components/App/App'
import { createLocation } from 'history'
Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = { isMenuOpenProp: false }

const location = createLocation({
  hash: "",
  key: "mx9m5y",
  pathname: "/genres/",
  search: "",
  state: { from: '' }
})

const setup = (initialState = {}, props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const store = storeFactory(initialState)
  const wrapper = shallow(<UnconnectedApp {...setupProps} location={location} store={store} />)
  return wrapper
}


test('should render nav', () => {
  const wrapper = setup()
  const nav = wrapper.find('Nav')
  expect(nav.length).toBe(1)
})

test('should render slide menu', () => {
  //  lazy loaded components not fully supported yet
})

test('should render menu toggle', () => {
  const wrapper = setup()
  const MenuToggle = wrapper.find('ConnectFunction')
  expect(MenuToggle.length).toBe(1)
})


