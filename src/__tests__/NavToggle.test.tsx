import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import 'jest-dom/extend-expect'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import NavToggle, { UnconnectedNavToggle } from '../components/NavToggle/NavToggle'


Enzyme.configure({ adapter: new EnzymeAdapter() })
const defaultProps = { scrolled: 21 }


const setup = (initialState = {}, props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const store = storeFactory(initialState)
  const wrapper = shallow(<NavToggle store={store} {...setupProps} />).dive()
  return wrapper
}


test('should render toggle component', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'nav-toggle').dive()
  expect(component.length).toBe(1)
})


const toggleCSSprops = {
  transform: "scale(1) translateX(70%)"
}
test('categories elements to animate css if props > 20', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'nav-toggle').dive()
  const animStyleToggle = component.prop('style')
  expect(animStyleToggle).toEqual(toggleCSSprops)
})



describe('should call action creators', () => {
  let getToggleMoviesRequestMock: any
  let getToggleSeriesRequestMock: any
  let wrapper: any

  beforeEach(() => {
    getToggleMoviesRequestMock = jest.fn()
    getToggleSeriesRequestMock = jest.fn()
    const props = {
      getToggleMoviesRequest: getToggleMoviesRequestMock,
      getToggleSeriesRequest: getToggleSeriesRequestMock,
      scrolled: 21
    }
    wrapper = shallow(<UnconnectedNavToggle {...props} />)

    const toggleFilms = findByTestAttr(wrapper, 'toggle-film')
    toggleFilms.simulate('click')
    const toggleSeries = findByTestAttr(wrapper, 'toggle-serie')
    toggleSeries.simulate('click')
  })

  test('should call getToggleMoviesRequest action', () => {
    const movieToggleCallCount = getToggleMoviesRequestMock.mock.calls.length
    expect(movieToggleCallCount).toBe(1)
  })

  test('should call getToggleSeriesRequest action', () => {
    const serieToggleCallCount = getToggleSeriesRequestMock.mock.calls.length
    expect(serieToggleCallCount).toBe(1)
  })

});
