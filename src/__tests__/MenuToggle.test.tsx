import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { act } from 'react-dom/test-utils';
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
  let getMovieGenresRequestMock: any
  let getSerieGenresRequestMock: any

  beforeEach(() => {
    getToggleMenuRequestMock = jest.fn()
    getMovieGenresRequestMock = jest.fn()
    getSerieGenresRequestMock = jest.fn()

    const userProps = {
      isMovieCatSelected: true
    }
    const Mockprops = {
      getToggleMenuRequest: getToggleMenuRequestMock,
      getMovieGenresRequest: getMovieGenresRequestMock,
      getSerieGenresRequest: getSerieGenresRequestMock,
    }
    const props = { ...Mockprops, ...userProps }
    wrapper = mount(<UnconnectedMenuToggle {...props} />)
  })

  test('should call getToggleMenuRequest action', () => {
    const getToggleMenuRequest = getToggleMenuRequestMock.mock.calls.length
    expect(getToggleMenuRequest).toBe(1)
  })

  test('should call getMovieGenresRequest action', () => {
    const getMovieGenresRequest = getMovieGenresRequestMock.mock.calls.length
    expect(getMovieGenresRequest).toBe(1)
  })

  test('should call getSerieGenresRequest action', () => {
    const getSerieGenresRequest = getSerieGenresRequestMock.mock.calls.length
    expect(getSerieGenresRequest).not.toBe(1)
  })
})



test('should animate button on click', () => {
  const oldCSSProps = { transform: "translate3d(0px,0,0)" }
  const newCSSProps = { transform: "translate3d(200px,0,0)" }

  const userProps = {
    isMovieCatSelected: true
  }
  const Mockprops = {
    getToggleMenuRequest: () => null,
    getMovieGenresRequest: () => null,
    getSerieGenresRequest: () => null,
  }
  const props = { ...Mockprops, ...userProps }

  const wrapper = mount(<UnconnectedMenuToggle {...props} />)
  const button = findByTestAttr(wrapper, 'button-toggle').last()

  const buttonNotClicked = button.prop('style')
  expect(buttonNotClicked).toEqual(oldCSSProps)

  act(() => {
    findByTestAttr(wrapper, 'button-toggle').last().simulate('click')
  })

  const buttonClicked = findByTestAttr(wrapper, 'button-toggle').last()
  expect(buttonClicked.prop('style')).toEqual(newCSSProps)
})


test('should animate img on click', () => {

})

