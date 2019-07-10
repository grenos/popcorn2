import React from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"
import { getMovieInfoModalRequest, getSerieInfoModalRequest } from '../../redux/actions/apiActions'

const URL = 'https://image.tmdb.org/t/p/original'

export const UnconnectedItemHighlight: React.FC<INT.IHighlightProps & RouteComponentProps> = ({
  isMovieCatSelected,
  history,
  searchMovies,
  searchSeries,
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
    <div className="item-highlight">
      {
        isMovieCatSelected ?
          searchMovies.slice(0, 1).map(({ id, backdrop_path, title, overview }) => {
            return (
              <div
                key={id}
                className="highlight-outer"
                style={{ backgroundImage: `url(${URL + backdrop_path})` }}
              >
                <div className="highlight-content">
                  <div className="info-wrapper-highlight">
                    <h3>{title}</h3>
                    <p>{overview}</p>
                    <div className="cta">
                      <button onClick={() => handleGoToMovie(id, title)}>
                        Detials
                      </button>
                      <button onClick={() => console.log('added')}>
                        Add to list
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          :
          searchSeries.slice(0, 1).map(({ id, backdrop_path, name, overview }) => {
            return (
              <div
                key={id}
                className="highlight-outer"
                style={{ backgroundImage: `url(${URL + backdrop_path})` }}
              >
                <div className="highlight-content">
                  <div className="info-wrapper-highlight">
                    <h3>{name}</h3>
                    <p>{overview}</p>
                    <div className="cta">
                      <button onClick={() => handleGoToSerie(id, name)}>
                        Detials
                      </button>
                      <button onClick={() => console.log('added')}>
                        Add to list
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    searchMovies: state.moviesReducer.searchMovies,
    searchSeries: state.seriesReducer.searchSeries
  }
}

export default withRouter(connect(mapStateToProps, {
  getSerieInfoModalRequest,
  getMovieInfoModalRequest
})(UnconnectedItemHighlight))


