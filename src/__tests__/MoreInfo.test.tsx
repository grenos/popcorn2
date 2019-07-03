import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../helpers/testUtils'
import 'jest-dom/extend-expect'
import { UnconnectedMoreInfo } from '../components/MovieModal/MoreInfo'
Enzyme.configure({ adapter: new EnzymeAdapter() })


describe('<UnconnectedMoreInfo />', () => {
  let wrapper: any
  let setup: any
  let openMoreInfoRequestMock: any


  beforeEach(() => {
    openMoreInfoRequestMock = jest.fn()

    setup = () => {
      const userProps = {
        info: {
          budget: 35235,
          homepage: 'www.site.com',
          original_language: 'EN',
          original_title: 'matrix',
          production_companies: [{ id: 64, name: 'company' }],
          production_countries: [{ index: 4, name: 'usa' }],
          release_date: '15-06-1985',
          revenue: 54353,
          runtime: 654,
          status: 'released',
          spoken_languages: [{ name: 'usa' }],
        },
        animation: false,
        openMoreInfoRequest: openMoreInfoRequestMock,
        cast: [{ name: 'actor name' }]
      }

      const props = { ...userProps }
      wrapper = shallow(<UnconnectedMoreInfo {...props} />)
      return wrapper
    }
  })

  test('should render component', () => {
    setup()
    const component = findByTestAttr(wrapper, 'component-moreInfo')
    expect(component.length).toBe(1)
  })

  test('should print all info', () => {
    setup()

    const title = wrapper.find('.more-info-title h3') //matrix
    const listCol1 = wrapper.find('.more-info-wrapper__col ul>li a').at(0) // www.site.com
    const listCol2 = wrapper.find('.more-info-wrapper__col ul>li').at(1) // EN
    const listCol3 = wrapper.find('.more-info-wrapper__col ul>li').at(2) // released
    const listCol4 = wrapper.find('.more-info-wrapper__col ul>li').at(3) // 15-06-1985
    const listCol5 = wrapper.find('.more-info-wrapper__col ul>li').at(4) // 35235
    const listCol6 = wrapper.find('.more-info-wrapper__col ul>li').at(5) // 54353
    const listCol7 = wrapper.find('.more-info-wrapper__col ul>li').at(6) // 654
    const listCol8 = wrapper.find('.more-info-wrapper__col ul>li').at(7) // company
    const listCol9 = wrapper.find('.more-info-wrapper__col ul>li').at(8) // usa

    expect(title.text()).toEqual('matrix')
    expect(listCol1.props().href).toEqual('www.site.com')
    expect(listCol2.text()).toEqual('Original language:EN')
    expect(listCol3.text()).toEqual('Status:released')
    expect(listCol4.text()).toEqual('Release date:15-06-1985')
    expect(listCol5.text()).toEqual('Total Budget:35235')
    expect(listCol6.text()).toEqual('Total Revenue:54353')
    expect(listCol7.text()).toEqual('Run Time:654min.')
    expect(listCol8.text()).toEqual('company')
    expect(listCol9.text()).toEqual('usa')
  })

  test('should close modal', () => {
    setup()
    const close = wrapper.find('.close')
    close.simulate('click')
    expect(openMoreInfoRequestMock).toHaveBeenCalledTimes(1)
    expect(openMoreInfoRequestMock).toHaveBeenCalledWith(false)
  })
})

