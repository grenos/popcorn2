import React from 'react'
import { connect } from 'react-redux'


/**
 * ADisplays error message generated from saga
 * @function
 * @param {object} isTopItemError - error object from Redux
 * @returns {JSX.Element} 
 */
const ApiCallError = ({ isTopItemError }: any) => {

  return (
    <div className="net-error-wrapper">
      <h1>{isTopItemError.message}</h1>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isTopItemError: state.uiReducer.isTopItemError,
  }
}

export default connect(mapStateToProps, {})(ApiCallError)




