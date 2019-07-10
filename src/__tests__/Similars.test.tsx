import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../helpers/testUtils'
import 'jest-dom/extend-expect'
import { UnconnectedSimilarItems } from '../components/MovieModal/Similars'
import { createMemoryHistory, createLocation } from 'history';
Enzyme.configure({ adapter: new EnzymeAdapter() })


describe('<UnconnectedSimilarItems />', () => {
  let wrapper: any
  let setup: any
  let openSimilarSectionRequestMock: any
  let getMovieInfoModalRequestMock: any
  let getSerieInfoModalRequestMock: any
  let history: any
  let location: any
  let match: any

  beforeEach(() => {
    openSimilarSectionRequestMock = jest.fn()
    getMovieInfoModalRequestMock = jest.fn()
    getSerieInfoModalRequestMock = jest.fn()

    history = createMemoryHistory()
    location = createLocation({
      hash: "",
      key: "mx9m5y",
      pathname: "/genres/Family",
      search: "",
      state: { from: "/genres/Family" }
    })
    match = {
      isExact: true,
      params: { id: "Family" },
      path: "/genres/:id",
      url: "/genres/Family",
    }

    setup = () => {
      const userProps = {
        isMovieCatSelected: true,
        openSimilarSectionRequest: openSimilarSectionRequestMock,
        getMovieInfoModalRequest: getMovieInfoModalRequestMock,
        getSerieInfoModalRequest: getSerieInfoModalRequestMock,
        videos: {
          results: [
            { id: 3434, title: 'matrix', poster_path: 'gdfgd.jpg' },
            { id: 65, title: 'matrix 2', poster_path: 'hgfds.jpg' }
          ]
        },
        animation: false,
        history: history,
        location: location,
        match: match,
      }

      const props = { ...userProps }
      wrapper = shallow(<UnconnectedSimilarItems {...props} />)
      return wrapper
    }
  })

  test('should render component', () => {
    setup()
    const component = findByTestAttr(wrapper, 'component-similars')
    expect(component.length).toBe(1)
  })

  test('should print carousel', () => {
    setup()
    const carousel = wrapper.find('Carousel')
    expect(carousel.length).toBe(1)
  })

  test('should print 2 locandine and their contents correctly', () => {
    setup()
    const locs = wrapper.find('.similar-item')
    expect(locs.length).toBe(2)

    const locImg1 = wrapper.find('img').at(0)
    expect(locImg1.props().alt).toEqual('matrix')
    expect(locImg1.props().src).toEqual("https://image.tmdb.org/t/p/w500/gdfgd.jpg")
    const locImg2 = wrapper.find('img').at(1)
    expect(locImg2.props().alt).toEqual('matrix 2')
    expect(locImg2.props().src).toEqual("https://image.tmdb.org/t/p/w500/hgfds.jpg")
  })

  test('should call action to call movie data', () => {
    setup({ isMovieCatSelected: true })
    const loc1 = wrapper.find('.similar-item').at(0)
    loc1.simulate('click')
    expect(getMovieInfoModalRequestMock).toHaveBeenCalledTimes(1)
  })

  test('should call action to call serie data', () => {
    setup({ isMovieCatSelected: false })
    const loc2 = wrapper.find('.similar-item').at(0)
    loc2.simulate('click')
    expect(getMovieInfoModalRequestMock).toHaveBeenCalledTimes(1)
  })

  test('should close modal', () => {
    setup()
    const close = wrapper.find('.close')
    close.simulate('click')
    expect(openSimilarSectionRequestMock).toHaveBeenCalledTimes(1)
    expect(openSimilarSectionRequestMock).toHaveBeenCalledWith(false)
  })

  test('should test hover state changes', () => {
    setup()
    expect(wrapper.state('activeHover')).toBe(0)
    expect(wrapper.state('toggleHover')).toBe(false)

    const hoverIn = wrapper.find('.similar-inner-item').at(0)
    hoverIn.simulate('mouseenter')
    expect(wrapper.state('activeHover')).toBe(3434)
    expect(wrapper.state('toggleHover')).toBe(true)

    const hoverOut = wrapper.find('.similar-inner-item').at(0)
    hoverOut.simulate('mouseleave')
    expect(wrapper.state('toggleHover')).toBe(false)
  })
})

