import React from 'react'
import { render, cleanup, fireEvent, createEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Nav from '../components/Nav/Nav'
import logo from '../media/img/logo.png'

afterEach(cleanup)

const listenToScroll = jest.fn()


test('<Nav> test dom elements', () => {
  const { getByTestId, getByAltText, container } = render(<Nav />)
  expect(getByTestId('first-child')).toBeTruthy()
  expect(getByAltText('logo').getAttribute('src')).toBe(logo)
  expect(container.firstChild).toMatchSnapshot()
})

test('<Nav> test animation', () => {
  const { getByTestId, getByAltText } = render(<Nav />)
  // test navbar
  expect(getByTestId('first-child')).toHaveStyle(
    `height: 90px; 
    background: rgba(0, 0, 0, 0.4); 
    box-shadow: 0px 0px 10px 20px rgba(0, 0, 0, 0.4);`
  )
  expect(listenToScroll).toHaveBeenCalledTimes(0)
  // listenToScroll.mock.calls[0]
  const myEvent = createEvent.scroll(window, { scrollY: 21 })
  fireEvent(window, myEvent)
  expect(listenToScroll).toHaveBeenCalledTimes(1)


  // expect(getByTestId('first-child')).toHaveStyle(
  //   `height: 90px; 
  //    background: rgba(0, 0, 0, 0.4); 
  //    box-shadow: 0px 0px 10px 20px rgba(0, 0, 0, 0.4);`
  // )

  // test logo



})



