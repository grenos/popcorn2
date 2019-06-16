import React from 'react'
import Carousel from 'nuka-carousel';
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"
import { makeDashesUrl } from '../../helpers/helperFunctions'

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

const VisoreSlider: React.FC<INT.IVisoreProps & RouteComponentProps> = ({
  isMovieCatSelected,
  topMovies,
  topSeries,
  history
}) => {


  const handleGoToMovie = (title: string, id: number): void => {
    history.push(`/title/${makeDashesUrl(title)}`)
  }

  const handleGoToSerie = (name: string, id: number): void => {
    history.push(`/title/${makeDashesUrl(name)}`)
  }


  return (
    <Carousel {...params}
      transitionMode="fade"
      renderCenterLeftControls={() => null}
      renderCenterRightControls={() => null}
    >
      {
        isMovieCatSelected ?
          topMovies.slice(0, 7).map(({ id, backdrop_path, title, overview }) => {
            return (
              <div
                key={id}
                className="slide-outer"
                style={{ backgroundImage: `url(${URL + backdrop_path})` }}
              >
                <div className="overlay-gallery-1">
                  <div className="overlay-gallery-2">
                    <div className="info-wrapper">
                      <h3>{title}</h3>
                      <p>{overview}</p>
                      <div className="cta">
                        <button onClick={() => handleGoToMovie(title, id)}>
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
                style={{ backgroundImage: `url(${URL + backdrop_path})` }}
              >
                <div className="overlay-gallery-1">
                  <div className="overlay-gallery-2">
                    <div className="info-wrapper">
                      <h3>{name}</h3>
                      <p>{overview}</p>
                      <div className="cta">
                        <button onClick={() => handleGoToSerie(name, id)}>
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

export default withRouter(connect(mapStateToProps, null)(VisoreSlider))


