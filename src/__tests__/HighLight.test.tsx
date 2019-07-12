import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../helpers/testUtils'
import 'jest-dom/extend-expect'
import { UnconnectedItemHighlight } from '../components/ItemHighLight/ItemHighlight'
import { createLocation } from 'history';
Enzyme.configure({ adapter: new EnzymeAdapter() })


describe('<UnconnectedItemHighlight />', () => {
  let wrapper: any
  let setup: any
  let location: any
  let getSerieInfoModalRequestMock: any
  let getMovieInfoModalRequestMock: any
  let store: any


  beforeEach(() => {
    getSerieInfoModalRequestMock = jest.fn()
    getMovieInfoModalRequestMock = jest.fn()

    location = createLocation({
      pathname: "/results",
    })

    setup = (testProps: any = {}) => {
      const userProps = {
        isMovieCatSelected: true,
        location: location,
        store: store,
        searchMovies: [
          {
            id: 1,
            backdrop_path: 'aaaaaa.jpg',
            title: 'matrix 1',
            overview: 'lorem ipsum'
          },
          {
            id: 2,
            backdrop_path: 'bbbbb.jpg',
            title: 'matrix 2',
            overview: 'lorems ipsums'
          }],
        searchSeries: [
          {
            id: 3,
            backdrop_path: 'ccccc.jpg',
            name: 'matrix 3',
            overview: 'lorem lorem'
          },
          {
            id: 4,
            backdrop_path: 'ddddd.jpg',
            name: 'matrix 4',
            overview: 'ipsum ipsum'
          }],
        getMovieInfoModalRequest: getMovieInfoModalRequestMock,
        getSerieInfoModalRequest: getSerieInfoModalRequestMock
      }
      const props = { ...userProps, ...testProps }
      wrapper = shallow(<UnconnectedItemHighlight {...props} />)
      return wrapper
    }
  })


  test('should render component', () => {
    setup()
    const component = findByTestAttr(wrapper, 'component-highlight')
    expect(component.length).toBe(1)
  })

  test('should render movie highlight', () => {
    setup()
    const highlight = findByTestAttr(wrapper, 'movie-highlight-outer')
    expect(highlight.length).toBe(1)
  })

  test('should render serie highlight', () => {
    setup({ isMovieCatSelected: false })
    const highlight = findByTestAttr(wrapper, 'serie-highlight-outer')
    expect(highlight.length).toBe(1)
  })

  test('should print highlight contents', () => {
    setup()
    const title = wrapper.find('.info-wrapper-highlight h3')
    const info = wrapper.find('.info-wrapper-highlight p')
    expect(title.length).toBe(1)
    expect(info.length).toBe(1)
    expect(title.text()).toEqual('matrix 1')
    expect(info.text()).toEqual('lorem ipsum')


    setup({ isMovieCatSelected: false })
    const h3 = wrapper.find('.info-wrapper-highlight h3')
    const p = wrapper.find('.info-wrapper-highlight p')
    expect(h3.length).toBe(1)
    expect(p.length).toBe(1)
    expect(h3.text()).toEqual('matrix 3')
    expect(p.text()).toEqual('lorem lorem')
  })

  test('should if buttons are rendered and are calling action', () => {
    setup()
    const cta = findByTestAttr(wrapper, 'cta-details')
    expect(cta.length).toBe(1)
    expect(getSerieInfoModalRequestMock.mock.calls.length).toBe(0)
    cta.simulate('click')
    expect(getMovieInfoModalRequestMock.mock.calls.length).toBe(1)
    expect(getMovieInfoModalRequestMock).toHaveBeenCalledWith(1, 'matrix 1')


    setup({ isMovieCatSelected: false })
    const cta2 = findByTestAttr(wrapper, 'cta-details')
    expect(cta2.length).toBe(1)
    expect(getSerieInfoModalRequestMock.mock.calls.length).toBe(0)
    cta2.simulate('click')
    expect(getSerieInfoModalRequestMock.mock.calls.length).toBe(1)
    expect(getSerieInfoModalRequestMock).toHaveBeenCalledWith(3, 'matrix 3')
  })
})
