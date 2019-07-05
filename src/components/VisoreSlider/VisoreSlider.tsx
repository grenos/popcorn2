import React from 'react'
import Carousel from 'nuka-carousel';
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"
import { getMovieInfoModalRequest, getSerieInfoModalRequest } from '../../redux/actions/apiActions'

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
}

interface ISeriePorops { id: number, name: string }

export const UnconnectedVisoreSlider: React.FC<INT.IVisoreProps & RouteComponentProps> = ({
  isMovieCatSelected,
  topMovies,
  topSeries,
  history,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest
}): JSX.Element => {

  const handleGoToMovie = (id: number, title: string, ): void => {
    getMovieInfoModalRequest(id, title)
    //! called from saga
    // history.push(`/title/${makeDashesUrl(title)}`)
  }

  const handleGoToSerie = (id: number, name: string, ): void => {
    getSerieInfoModalRequest(id, name)
    //! called from saga
    // history.push(`/title/${makeDashesUrl(name)}`)
  }


  return (
    <Carousel {...params}
      transitionMode="fade"
      renderCenterLeftControls={() => null}
      renderCenterRightControls={() => null}
      renderBottomCenterControls={() => null}
      data-test="visore-component"
    >
      {
        isMovieCatSelected ?
          topMovies.slice(0, 7).map(({ id, backdrop_path, title, overview }) => {
            return (
              <div
                key={id}
                className="slide-outer"
                data-test="movie-slide"
                style={{ backgroundImage: `url(${URL + backdrop_path})` }}
              >
                <div className="overlay-gallery-1">
                  <div className="overlay-gallery-2">
                    <div className="info-wrapper">
                      <h3>{title}</h3>
                      <p>{overview}</p>
                      <div className="cta">
                        <button onClick={() => handleGoToMovie(id, title)}>
                          Details
                        </button>
                        <button onClick={() => console.log('added')}>
                          Add to list
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          :
          topSeries.slice(0, 7).map(({ id, backdrop_path, name, overview }) => {
            return (
              <div
                key={id}
                className="slide-outer"
                data-test="serie-slide"
                style={{ backgroundImage: `url(${URL + backdrop_path})` }}
              >
                <div className="overlay-gallery-1">
                  <div className="overlay-gallery-2">
                    <div className="info-wrapper">
                      <h3>{name}</h3>
                      <p>{overview}</p>
                      <div className="cta">
                        <button onClick={() => handleGoToSerie(id, name)}>
                          Details
                        </button>
                        <button onClick={() => console.log('added')}>
                          Add to list
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

const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    topMovies: state.moviesReducer.topMovies,
    topSeries: state.seriesReducer.topSeries
  }
}

export default withRouter(connect(mapStateToProps, {
  getMovieInfoModalRequest,
  getSerieInfoModalRequest
})(UnconnectedVisoreSlider))


