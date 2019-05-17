import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Nav from '../components/Nav/Nav'


afterEach(cleanup)

test('<Nav>', () => {

  const { debug, getByText, getByTestId, queryByTestId, getByLabelText } = render(<Nav />)


})