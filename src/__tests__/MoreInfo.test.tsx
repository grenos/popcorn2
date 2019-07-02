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
        openMoreInfoRequest: openMoreInfoRequestMock
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
    console.log(wrapper.debug());

  })


})

