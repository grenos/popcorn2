import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../helpers/testUtils'
import 'jest-dom/extend-expect'
import { UnconnectedMovieModal } from '../components/MovieModal/MovieModal'
Enzyme.configure({ adapter: new EnzymeAdapter() })


describe('<UnconnectedMovieModal />', () => {
  let wrapper: any
  let setup: any
  let openMovieModalRequestMock: any
  let getMovieInfoRequestMock: any
  let getSerieInfoRequestMock: any
  let openVideoSectionRequestMock: any
  let openSimilarSectionRequestMock: any
  let openMoreInfoRequestMock: any

  beforeEach(() => {
    openMovieModalRequestMock = jest.fn()
    getMovieInfoRequestMock = jest.fn()
    getSerieInfoRequestMock = jest.fn()
    openVideoSectionRequestMock = jest.fn()
    openSimilarSectionRequestMock = jest.fn()
    openMoreInfoRequestMock = jest.fn()

    setup = (testProps: any = {}) => {
      const userProps = {
        title: 'matrix',
        overview: 'Lorem, ipsum',
        movieInfo: {

          genres: [{ id: 32, name: 'action' }],
          tagline: 'its a movie ok?',
        },

        isMovieCatSelected: true,
        isMovieModalOpen: true,
        isVideoSectionOpen: false,
        isSimilarSectionOpen: false,
        isMoreInfoOpen: false,

        openMovieModalRequest: openMovieModalRequestMock,
        getMovieInfoRequest: getMovieInfoRequestMock,
        getSerieInfoRequest: getSerieInfoRequestMock,
        openVideoSectionRequest: openVideoSectionRequestMock,
        openSimilarSectionRequest: openSimilarSectionRequestMock,
        openMoreInfoRequest: openMoreInfoRequestMock
      }

      const props = { ...userProps, ...testProps }
      wrapper = mount(<UnconnectedMovieModal {...props} />)
      return wrapper
    }
  })

  test('should render component', () => {
    setup()
    const component = findByTestAttr(wrapper, 'component-modal')
    expect(component.length).toBe(1)
  })

  test('should test if all elements are rendered inside modal', () => {
    setup()
    const video = wrapper.find('YouTube')
    const title = findByTestAttr(wrapper, 'modal-title')
    const tagline = wrapper.find('.info-inner h5')
    const overview = findByTestAttr(wrapper, 'modal-overview')
    const genres = wrapper.find('.modal-genres')

    expect(video.length).toBe(1)
    expect(title.text()).toContain('matrix')
    expect(tagline.text()).toContain('its a movie ok?')
    expect(overview.text()).toContain('Lorem, ipsum')
    expect(genres.text()).toContain('action')
  })

  test('should print stuff if series category is active', () => {
    setup({ isMovieCatSelected: false })
    const tagline = wrapper.find('.info-inner h5')
    expect(tagline.text()).toEqual('')
  })

  test('should test click handlers onload', () => {
    setup({})

    // on mount
    expect(openVideoSectionRequestMock).toHaveBeenCalledTimes(1)
    expect(openSimilarSectionRequestMock).toHaveBeenCalledTimes(1)
    expect(openMoreInfoRequestMock).toHaveBeenCalledTimes(1)


    const close = wrapper.find('.close')
    close.simulate('click')
    expect(openMovieModalRequestMock).toHaveBeenCalledTimes(1)
    expect(openMovieModalRequestMock).toHaveBeenCalledWith(false)
    expect(getMovieInfoRequestMock).toHaveBeenCalledTimes(1)

    const videosBtn = findByTestAttr(wrapper, 'videosBtn')
    videosBtn.simulate('click')
    // why is it called twice?
    expect(openVideoSectionRequestMock).toHaveBeenCalledTimes(2)

    const relatedBtn = findByTestAttr(wrapper, 'relatedBtn')
    relatedBtn.simulate('click')
    // why is it called twice?
    expect(openSimilarSectionRequestMock).toHaveBeenCalledTimes(2)

    const infoBtn = findByTestAttr(wrapper, 'relatedBtn')
    infoBtn.simulate('click')
    expect(openMoreInfoRequestMock).toHaveBeenCalledTimes(1)


    setup({ isMovieCatSelected: false })
    expect(getSerieInfoRequestMock).toHaveBeenCalledTimes(1)
  })

})

