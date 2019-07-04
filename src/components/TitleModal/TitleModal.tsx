import React, { useState, useEffect } from 'react'
import * as INT from '../../helpers/interfaces'
import { connect } from 'react-redux'
import { filterNoImg } from '../../helpers/helperFunctions'
import close from '../../media/img/close.png'

const URL = 'https://image.tmdb.org/t/p/original'


const TitleModal: React.FC<INT.ITitleModalProps> = ({ movieInfo, serieInfo, isMovieModalOpen }): JSX.Element => {

  let { backdrop_path } = movieInfo


  return (
    <div className="title-modal-wrapper" style={{ backgroundImage: `url(${URL + backdrop_path})` }}>
      <h1>TEST</h1>
    </div>
  )
}


export default TitleModal

