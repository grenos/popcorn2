import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import TopItems, { UnconnectedTopItems } from '../components/TopItems/TopItems'
Enzyme.configure({ adapter: new EnzymeAdapter() })


test('should render component', () => {
  const initialState = {}
  const store = storeFactory(initialState)
  const wrapper = shallow(<TopItems store={store} />).dive().dive()
  const component = findByTestAttr(wrapper, 'component-locandine')
  expect(component.length).toBe(1)
})


describe('<UnconnectedToItems />', () => {
  let wrapper: any
  let setup: any
  let getToggleMoviesRequestMock: any

  beforeEach(() => {
    getToggleMoviesRequestMock = jest.fn()

    setup = (testProps: any = {}) => {
      const userProps = {
        isMenuOpenProp: false,
        topMovies: [{ id: 1, title: 'matrix', poster_path: "sgsdgdsgg.jpg" }],
        topSeries: [{ id: 2, title: 'GOT', poster_path: "gdfgdfgdfg.jpg" }],
        isMovieCatSelected: true
      }

      const mocks = {
        getToggleMoviesRequest: getToggleMoviesRequestMock
      }

      const props = { ...mocks, ...userProps, ...testProps }
      wrapper = mount(<UnconnectedTopItems {...props} />)
      return wrapper
    }
  })

  test('should render renderMovies locandine', () => {
    setup()
    const component = findByTestAttr(wrapper, 'locandina-movie')
    expect(component.length).toBe(1)
  });

  test('should render renderSeries locandine', () => {
    setup({ isMovieCatSelected: false })
    const component = findByTestAttr(wrapper, 'locandina-serie')
    expect(component.length).toBe(1)
  });


  // test if onClick on category list item work for movies and series

  test('should waypoint', () => {
  })
})