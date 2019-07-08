import React, { useState, useEffect } from 'react'
import * as INT from '../../helpers/interfaces'
import { connect } from 'react-redux'
import { filterNoImg } from '../../helpers/helperFunctions'
import logo from '../../media/img/logo.png'


const URL = 'https://image.tmdb.org/t/p/original'


const TitleModal: React.FC<INT.ITitleModalProps> = ({ movieInfo, isMovieModalOpen }): JSX.Element => {

  let { backdrop_path, budget, homepage, id, original_language, overview, popularity, poster_path, release_date, revenue, runtime, similar, spoken_languages, status, tagline, title, videos, vote_average, } = movieInfo

  return (
    <div className="title-modal__wrapper" style={{ background: `url(${URL + backdrop_path}), rgba(0, 0, 0, 0.3)` }}>
      <div className="title-modal__header">
        <div className="header__icons">
          <img src={logo} alt="popcorn logo" />
        </div>
        <div className="header__title">
          <h3>test main title</h3>
          <h5>test subtitle or tagline</h5>
        </div>
      </div>

      <div className="title-modal__main-window">
        <div className="main-window__video">
          video goes here
        </div>
        <div className="main-window__info">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eaque aliquam voluptate soluta facilis porro nam maiores, minima similique nesciunt iure quidem nisi ex, quia officiis quas vero dolorum laborum?</p>
        </div>
      </div>
    </div>
  )
}


export default TitleModal

