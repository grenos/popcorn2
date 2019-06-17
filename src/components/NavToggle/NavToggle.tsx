import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { getToggleMovieCatRequest, getToggleSerieCatRequest } from '../../redux/actions/uiActions'
import { clearMoviesByGenreState, clearSeriesByGenreState } from '../../redux/actions/apiActions'
import { RouteComponentProps } from "react-router";
import * as INT from '../../helpers/interfaces'
// import tele from '../../media/img/television.png'
// import film from '../../media/img/film.png'


export const UnconnectedNavToggle: React.FC<INT.IToggleProps & RouteComponentProps> = ({
  getToggleMovieCatRequest,
  getToggleSerieCatRequest,
  clearMoviesByGenreState,
  clearSeriesByGenreState,
  history
}): JSX.Element => {

  const handleMoviesToggle = (): void => {
    getToggleMovieCatRequest(true)
    getToggleSerieCatRequest(false)
    clearSeriesByGenreState()
    history.push('/')
  }

  const handleSeriesToggle = (): void => {
    getToggleSerieCatRequest(true)
    getToggleMovieCatRequest(false)
    clearMoviesByGenreState()
    history.push('/')
  }

  const handleMyFavorites = (): void => {
    console.log('favorites');
  }

  return (
    <div
      className="nav__type-toggle"
      data-test="nav-toggle"
    >
      <div
        data-test='toggle-film'
        className="toggle__img--film"
        onClick={handleMoviesToggle}
      >
        <p>Movies</p>
      </div>

      <div
        data-test='toggle-serie'
        className="toggle__img--tele"
        onClick={handleSeriesToggle}
      >
        <p>Series</p>
      </div>

      <div
        data-test='favorites-button'
        className="favorites-button"
        onClick={handleMyFavorites}
      >
        <p>My Favorites</p>
      </div>
    </div>

  )
}

export default withRouter(connect(null, {
  getToggleMovieCatRequest,
  getToggleSerieCatRequest,
  clearMoviesByGenreState,
  clearSeriesByGenreState
})(UnconnectedNavToggle))

