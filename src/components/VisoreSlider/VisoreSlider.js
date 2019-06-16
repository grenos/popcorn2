import React, { useEffect } from 'react'
import Carousel from 'nuka-carousel';
import { connect } from 'react-redux'


const URL = 'https://image.tmdb.org/t/p/original'

const params = {
  autoplay: true,
  autoplayInterval: 6000,
  dragging: false,
  slideWidth: 1,
  speed: 1500,
  swiping: false,
  width: '100%',
  height: '100vh',
  wrapAround: true,
  pauseOnHover: false,
  transitionMode: 'fade'
}

const VisoreSlider = ({ isMovieCatSelected, topMovies, topSeries }) => {

  return (
    <Carousel {...params}
      renderCenterLeftControls={() => null}
      renderCenterRightControls={() => null}
    >
      {
        isMovieCatSelected ?
          topMovies.slice(0, 7).map(movie => {
            return (
              <div
                key={movie.id}
                className="slide-outer"
                style={{ backgroundImage: `url(${URL + movie.backdrop_path})` }}
              >
                <div className="overlay-gallery-1">
                  <div className="overlay-gallery-2">
                    <div className="info-wrapper">
                      <h3>{movie.title}</h3>
                      <p>{movie.overview}</p>
                      <div className="cta">
                        <button onClick={() => console.log('clicked')}>
                          Details
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          :
          topSeries.slice(0, 7).map(serie => {
            return (
              <div
                key={serie.id}
                className="slide-outer"
                style={{ backgroundImage: `url(${URL + serie.backdrop_path})` }}
              >
                <div className="overlay-gallery-1">
                  <div className="overlay-gallery-2">
                    <div className="info-wrapper">
                      <h3>{serie.name}</h3>
                      <p>{serie.overview}</p>
                      <div className="cta">
                        <button onClick={() => console.log('clicked')}>
                          Details
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })

      }
    </Carousel>
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


