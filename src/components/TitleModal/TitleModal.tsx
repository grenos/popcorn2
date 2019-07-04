import React, { useState, useEffect } from 'react'
import * as INT from '../../helpers/interfaces'
import { connect } from 'react-redux'
import { filterNoImg } from '../../helpers/helperFunctions'
import chevron from '../../media/img/chevron.png'



const TitleModal = () => {
  return (
    <div className="title-modal-wrapper">
      <h1>TEST</h1>
    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMovieModalOpen: state.uiReducer.isMovieModalOpen
  }
}

export default connect(mapStateToProps, {})(TitleModal)

