import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../helpers/testUtils'
import { UnconnectedTopItems } from '../components/TopItems/TopItems'
Enzyme.configure({ adapter: new EnzymeAdapter() })

import { MemoryRouter as Router } from 'react-router-dom';
const mountWithRouter = (UnconnectedTopItems: any) =>
  mount(<Router>{UnconnectedTopItems}</Router>);


describe('<UnconnectedToItems />', () => {
  let wrapper: any
  let setup: any
  let handlePaginationMock: any

  beforeEach(() => {
    handlePaginationMock = jest.fn()

    setup = (testProps: any = {}) => {
      const userProps = {
        movies: [{ id: 1, title: 'matrix', poster_path: "sgsdgdsgg.jpg" }],
        series: [{ id: 2, title: 'GOT', poster_path: "gdfgdfgdfg.jpg" }],
        isMovieCatSelected: true
      }

      const mocks = {
        handlePagination: handlePaginationMock
      }

      const props = { ...mocks, ...userProps, ...testProps }
      wrapper = mountWithRouter(<UnconnectedTopItems {...props} />)
      return wrapper
    }
  })

  test('should render component', () => {
    setup()
    const component = findByTestAttr(wrapper, 'component-locandine')
    expect(component.length).toBe(1)
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


  test('should waypoint', () => {
  })
})