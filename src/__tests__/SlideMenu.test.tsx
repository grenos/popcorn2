import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import SlideMenu, { UnconnectedSlideMenu } from '../components/SlideMenu/SlideMenu'
Enzyme.configure({ adapter: new EnzymeAdapter() })


test('should render component', () => {
  const initialState = {}
  const store = storeFactory(initialState)
  const wrapper = shallow(<SlideMenu store={store} />).dive().dive()
  const component = findByTestAttr(wrapper, 'slide-menu')
  expect(component.length).toBe(1)
})


describe('<UnconnectedSlideMenu />', () => {
  let wrapper: any
  let getMoviesByGenreRequestMock: any
  let getSeriesByGenreRequestMock: any
  let setup: any

  beforeEach(() => {
    getMoviesByGenreRequestMock = jest.fn()
    getSeriesByGenreRequestMock = jest.fn()


    setup = (testProps: any = {}) => {
      const userProps = {
        isMenuOpen: false,
        movieGenres: { id: 28, name: 'Action' },
        serieGenres: { id: 10759, name: '"Action & Adventure"' },
        isMovieCatSelected: false
      }

      const Mocks = {
        getMoviesByGenreRequest: getMoviesByGenreRequestMock,
        getSeriesByGenreRequest: getSeriesByGenreRequestMock,
      }
      const props = { ...Mocks, ...userProps, ...testProps }

      wrapper = mount(<UnconnectedSlideMenu {...props} />)
      return wrapper
    }
  })

  test('should test if isMenuOpen prop open menu', () => {
    const wrapper = setup({ isMenuOpen: true })
    expect(wrapper.find('.nav-wrapper').first().length).toBe(1)
  })

  test('should test if isMovieCatSelected prop renders MovieGenres', () => {
    const wrapper = setup({ isMovieCatSelected: true, isMenuOpen: true })
    expect(wrapper.find('#movie-genres').length).toBe(1)
  })

  test('should test if not isSerieCatSelected prop renders SerieGenres', () => {
    const wrapper = setup({ isMenuOpen: true })
    expect(wrapper.find('#serie-genres').length).toBe(1)
  })

  test('should test if getMoviesByGenreRequest gets called', () => {
    const wrapper = setup({ isMenuOpen: true, isMovieCatSelected: true })
    const list = findByTestAttr(wrapper, 'movie-genres-list-items').last()

    list.simulate('click')
    const getMoviesByGenreRequest = getMoviesByGenreRequestMock.mock.calls.length
    expect(getMoviesByGenreRequest).toBe(1)
  })

  test('should test if getSeriesByGenreRequest gets called', () => {
    const wrapper = setup({ isMenuOpen: true })
    const list = findByTestAttr(wrapper, 'serie-genres-list-items').last()

    list.simulate('click')
    const getSeriesByGenreRequest = getSeriesByGenreRequestMock.mock.calls.length
    expect(getSeriesByGenreRequest).toBe(1)
  })

})


