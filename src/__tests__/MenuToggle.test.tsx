import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import MenuToggle, { UnconnectedMenuToggle } from '../components/MenuToggle/MenuToggle'
Enzyme.configure({ adapter: new EnzymeAdapter() })



describe('should call action creators based on prps', () => {
  let wrapper: any
  let getToggleMenuRequestMock: any

  beforeEach(() => {
    getToggleMenuRequestMock = jest.fn()

    const Mockprops = {
      getToggleMenuRequest: getToggleMenuRequestMock,
    }
    wrapper = mount(<UnconnectedMenuToggle {...Mockprops} />)
  })


  test('should render button component', () => {
    const button = findByTestAttr(wrapper, 'button-toggle').last()
    expect(button.length).toBe(1)
  })


  test('should call getToggleMenuRequest action', () => {
    const button = findByTestAttr(wrapper, 'button-toggle').last()
    button.simulate('click')
    const getToggleMenuRequest = getToggleMenuRequestMock.mock.calls.length
    expect(getToggleMenuRequest).toBe(1)
    expect(getToggleMenuRequestMock).toHaveBeenCalledWith()
  })
})


