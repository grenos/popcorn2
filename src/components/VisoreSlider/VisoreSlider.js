import React from 'react'
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { params } from '../../helpers/swiperParams'
import { connect } from 'react-redux'

const URL = 'https://image.tmdb.org/t/p/original'

const VisoreSlider = ({ isMovieCatSelected, topMovies, topSeries }) => {
  return (
    <Swiper {...params} >
      {
        topMovies.map(movie => {
          return (
            <div
              key={movie.id}
              className="slide-outer"
              style={{ background: `url(${URL + movie.backdrop_path})` }}
            >
              <div className="overlay-gallery">
                {/* <h3>{movie.title}</h3> */}
                <div className="ratings">
                  <p>{movie.info}</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </Swiper>
  )
}

const mapStateToProps = (state) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    topMovies: state.moviesReducer.topMovies,
    topSeries: state.seriesReducer.topSeries
  }
}

export default connect(mapStateToProps, null)(VisoreSlider)


