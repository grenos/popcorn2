import React from 'react'
import { render, cleanup, fireEvent, createEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Nav from '../components/Nav/Nav'
import logo from '../media/img/logo.png'

afterEach(cleanup)


test('<Nav> test dom elements', () => {
  const { getByTestId, getByAltText, container } = render(<Nav />)
  expect(getByTestId('first-child')).toBeTruthy()
  expect(getByAltText('logo').getAttribute('src')).toBe(logo)
  expect(container.firstChild).toMatchSnapshot()
})

// WRITE ANIMATION TESTS HERE



