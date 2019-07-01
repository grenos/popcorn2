import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../helpers/testUtils'
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
        id: 1,
        backdrop_path: 'djgjkdgjkdf.jpg',
        title: 'matrix',
        overview: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et facere assumenda numquam natus nulla, distinctio voluptatum cupiditate dicta asperiores nihil molestias. Cum aperiam modi nostrum iste nam quia eius sint!',
        movieInfo: {genres: ['action.', 'comedy'], tagline: 'its a movie ok?', videoKey: 'dfjdskjgksj'},
        serieInfo: {genres: ['action.', 'comedy'], videoKey: 'dfjdskjgksj'},

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
      wrapper = shallow(<UnconnectedMovieModal {...props} />)
      return wrapper
    }
  })

  test('should render component', () => {

  })

})

