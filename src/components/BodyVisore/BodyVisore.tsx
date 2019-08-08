import React, { useEffect } from 'react'
import * as INT from '../../helpers/interfaces'
import { connect } from 'react-redux'
import popcorn from '../../media/img/popcorn.png'
import { filterNoImg } from '../../helpers/helperFunctions'
import { getBodyVisoreMovieInfoReq, getBodyVisoreSerieInfoReq } from '../../redux/actions/apiActions'

const URLBG = 'https://image.tmdb.org/t/p/original'

interface props {
  id: number
  backdrop_path: string
  title: string
  overview: string
  getBodyVisoreMovieInfoReq: Function
  isMovieCatSelected: boolean
  movie_body_visore_info: INT.IMovieInfoRes
}

const BodyVisore = ({ id, backdrop_path, title, overview, getBodyVisoreMovieInfoReq, isMovieCatSelected }: props) => {

  useEffect(() => {
    if (isMovieCatSelected) {
      getBodyVisoreMovieInfoReq(id)
    } else {
      getBodyVisoreSerieInfoReq(id)
    }
  }, [isMovieCatSelected, getBodyVisoreMovieInfoReq, id])

  return (
    <div className="last-item-wrapper" key={id}
      style={{ backgroundImage: `url(${filterNoImg(URLBG, backdrop_path, popcorn)})` }}>
      <div className="last-item__video-wrapper">
        {/* if id is same with id from movie_body_visore_info print  */}
      </div>
      <div className="last-item__info-wrapper">
        <h1 className="last-item__title">{title}</h1>
        <p className="last-item__overview">{overview}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    movie_body_visore_info: state.bodyVisoreReducer.movie_body_visore_info
  }
}

export default connect(mapStateToProps, {
  getBodyVisoreMovieInfoReq
})(BodyVisore)


