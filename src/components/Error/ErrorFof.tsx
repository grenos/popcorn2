import React from 'react'

/**
 * ErrorFof component displays on 404 page
 * @function
 * @returns {JSX.Element} - Rendered Component 
 */
const ErrorFof = () => {
  return (
    <div className="fof-wrapper">
      <h1>Error 404!</h1>
      <div className="fof-img-wrapper">
        <img src="https://media.giphy.com/media/PmdohEH13efckDtOxM/giphy.gif" alt="error" />
      </div>
    </div>
  )
}

export default ErrorFof
