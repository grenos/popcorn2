import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../helpers/testUtils'
import 'jest-dom/extend-expect'
import { UnconnectedRelatedItems } from '../components/MovieModal/RelatedItems'
Enzyme.configure({ adapter: new EnzymeAdapter() })


describe('<UnconnectedRelatedItems />', () => {
  let wrapper: any
  let setup: any
  let openVideoSectionRequestMock: any


  beforeEach(() => {
    openVideoSectionRequestMock = jest.fn()

    setup = (testProps: any = {}) => {
      const userProps = {
        videos: {
          results: [
            { id: 345, key: 'fdfgdfg', name: 'just a title' },
            { id: 634, key: 'fasssss', name: 'just another title' },
            { id: 6555, key: 'yassss', name: 'just another title again' },
            { id: 666, key: 'hehehe', name: 'yes' },
          ]
        },
        openVideoSectionRequest: openVideoSectionRequestMock,
        animation: false
      }

      const props = { ...userProps, ...testProps }
      wrapper = shallow(<UnconnectedRelatedItems {...props} />)
      return wrapper
    }
  })

  test('should render component', () => {
    setup()
    const component = findByTestAttr(wrapper, 'component-related')
    expect(component.length).toBe(1)
  })

  test('should have carousel', () => {
    setup()
    const carousel = wrapper.find('Carousel')
    expect(carousel.length).toBe(1)
  })

  test('should Not have carousel', () => {
    setup({ videos: { results: [] } })
    const carousel = wrapper.find('Carousel')
    expect(carousel.length).toBe(0)
  })

  // because we fake pass 4 videos here in test
  test('should have 4 youtube players', () => {
    setup()
    const youtube = wrapper.find('YouTube')
    expect(youtube.length).toBe(4)
  })

  test('should print video titles', () => {
    setup()
    const title = wrapper.find('.thumb-info')
    expect(title.first().text()).toContain('just a title')
    expect(title.last().text()).toContain('yes')
  })

  test('should call action', () => {
    setup()
    const close = wrapper.find('.close')
    close.simulate('click')
    expect(openVideoSectionRequestMock).toHaveBeenCalledTimes(1)
    expect(openVideoSectionRequestMock).toHaveBeenCalledWith(false)

  })

})

