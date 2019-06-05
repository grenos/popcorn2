import React from 'react'
import Enzyme, { shallow } from 'enzyme'
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
    wrapper = shallow(<UnconnectedMenuToggle {...props} />).dive()

    // const button = findByTestAttr(wrapper, 'button-toggle')
    // button.props().onClick()
  })

  test('should call getToggleMenuRequest action', () => {
    // const getToggleMenuRequest = getToggleMenuRequestMock.mock.calls.length
    // expect(getToggleMenuRequest).toBe(1)
  })

  test('should call getMovieGenresRequest action', () => {
    // const getMovieGenresRequest = getMovieGenresRequestMock.mock.calls.length
    // expect(getMovieGenresRequest).toBe(1)
  })

  test('should call getSerieGenresRequest action', () => {
    // const getSerieGenresRequest = getSerieGenresRequestMock.mock.calls.length
    // expect(getSerieGenresRequest).toBe(1)
  })
})



test('should animate button on click', () => {
  // const oldCSSProps = { transform: "translate3d(0px,0,0)" }
  // const newCSSProps = { transform: "translate3d(200px,0,0)" }

  // const wrapper = setup()
  // const button = findByTestAttr(wrapper, 'button-toggle').dive()

  // const buttonNotClicked = button.prop('style')
  // expect(buttonNotClicked).toEqual(oldCSSProps)

  // findByTestAttr(wrapper, 'button-toggle').dive().props().onClick()
  // const buttonClicked = findByTestAttr(wrapper, 'button-toggle').dive()

  // expect(buttonClicked.prop('style')).toEqual(newCSSProps)
})


test('should animate img on click', () => {

})

