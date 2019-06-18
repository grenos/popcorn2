import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr, storeFactory } from '../helpers/testUtils'
import { UnconnectedVisoreSlider } from '../components/VisoreSlider/VisoreSlider'
// import { MemoryRouter as Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { topMovies, topSeries } from '../helpers/data'
Enzyme.configure({ adapter: new EnzymeAdapter() })


const history = createMemoryHistory();
// const mountWithRouter = (UnconnectedVisoreSlider: any) =>
//   mount(<Router>{UnconnectedVisoreSlider}</Router>);


const defaultProps = {
  isMovieCatSelected: true,
  topMovies,
  topSeries,
  history: history
}
const URL = 'https://image.tmdb.org/t/p/original'

const setup = (initialState = {}, props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const store = storeFactory(initialState)
  const wrapper = shallow(<UnconnectedVisoreSlider store={store} {...setupProps} />)
  return wrapper
}

test('should render visore component', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'visore-component')
  expect(component.length).toBe(1)
})

test('should render 7 movie slides', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'movie-slide')
  expect(component.length).toBe(7)
})

test('should render 7 serie slides', () => {
  const wrapper = setup({}, { isMovieCatSelected: false })
  const component = findByTestAttr(wrapper, 'serie-slide')
  expect(component.length).toBe(7)
})

test('should test if movie slides have all content passed', () => {
  const bgImg = { "backgroundImage": "url(https://image.tmdb.org/t/p/originaltest.jpg)" }
  const wrapper = setup()

  const component = findByTestAttr(wrapper, 'movie-slide')
  expect(component.first().prop('style')).toEqual(bgImg)

  const info = wrapper.find('.info-wrapper')
  expect(info.find('h3')).toHaveLength(7)
  expect(info.find('p')).toHaveLength(7)
  expect(info.find('button')).toHaveLength(14)
})

test('should test if serie slides have all content passed', () => {
  const bgImg = { "backgroundImage": "url(https://image.tmdb.org/t/p/originaltest.jpg)" }
  const wrapper = setup({}, { isMovieCatSelected: false })

  const component = findByTestAttr(wrapper, 'serie-slide')
  expect(component.first().prop('style')).toEqual(bgImg)

  const info = wrapper.find('.info-wrapper')
  expect(info.find('h3')).toHaveLength(7)
  expect(info.find('p')).toHaveLength(7)
  expect(info.find('button')).toHaveLength(14)
})







