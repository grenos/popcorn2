import React from 'react'
import { connect } from 'react-redux'

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



/* <img src="https://media.giphy.com/media/PmdohEH13efckDtOxM/giphy.gif" alt="error" /> */
