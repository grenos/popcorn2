import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import MenuToggle, { UnconnectedMenuToggle } from '../components/MenuToggle/MenuToggle'
Enzyme.configure({ adapter: new EnzymeAdapter() })


const setup = (initialState = {}) => {
  const store = storeFactory(initialState)
  const wrapper = shallow(<MenuToggle store={store} />).dive()
  return wrapper
}

test('should render button component', () => {
  const wrapper = setup().dive()
  const button = findByTestAttr(wrapper, 'button-toggle')
  expect(button.length).toBe(1)
})


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

  test('should call getToggleMenuRequest action', () => {
    const getToggleMenuRequest = getToggleMenuRequestMock.mock.calls.length
    expect(getToggleMenuRequest).toBe(1)
    expect(getToggleMenuRequestMock).toHaveBeenCalledWith(false)

    // const btn = findByTestAttr(wrapper, 'button-toggle').last()
    // btn.simulate('click')
    // expect(getToggleMenuRequestMock.mock.calls.length).toBe(1)
    // expect(getToggleMenuRequestMock).toHaveBeenCalledWith(true)
  })
})



test('should animate button on click', () => {
  // const oldCSSProps = { transform: "translate3d(0px,0,0)" }
  // const newCSSProps = { transform: "translate3d(200px,0,0)" }

  // const userProps = {
  //   isMovieCatSelected: true
  // }
  // const Mockprops = {
  //   getToggleMenuRequest: () => null,
  //   getMovieGenresRequest: () => null,
  //   getSerieGenresRequest: () => null,
  // }
  // const props = { ...Mockprops, ...userProps }

  // const wrapper = mount(<UnconnectedMenuToggle {...props} />)
  // const button = findByTestAttr(wrapper, 'button-toggle').last()

  // const buttonNotClicked = button.prop('style')
  // expect(buttonNotClicked).toEqual(oldCSSProps)

  // act(() => {
  //   findByTestAttr(wrapper, 'button-toggle').last().simulate('click')
  //   wrapper.update()
  // })

  // const buttonClicked = findByTestAttr(wrapper, 'button-toggle').last()
  // expect(buttonClicked.prop('style')).toEqual(newCSSProps)
})


test('should animate img on click', () => {

})

