import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { getToggleMovieCatRequest, getToggleSerieCatRequest, setAuthModalUI } from '../../redux/actions/uiActions'
import { clearMoviesByGenreState, clearSeriesByGenreState } from '../../redux/actions/apiActions'
import { RouteComponentProps } from "react-router";
import * as INT from '../../helpers/interfaces'
import { openAuthModal, getToggleMenuRequest } from '../../redux/actions/uiActions'
import useWindowSize from '@rehooks/window-size';

/**
 * toggles bwtween movies and series, also main parent of Auth modals
 * @function
 * @param {function} getToggleMovieCatRequest ACTION makes movies selected category
 * @param {function} getToggleSerieCatRequest ACTION makes series selected category
 * @param {function} clearMoviesByGenreState ACTION  
 * @param {function} clearSeriesByGenreState ACTION 
 * @param {function} getToggleMenuRequest ACTION opens slide menu (in case user is not signed in)
 * @param {function} openAuthModal ACTION 
 * @param {bool} isUserSignedIn 
 * @param {object} history - to push to new page - Router
 * @param {function} setAuthModalUI - ACTION sets which Auth modal should be displayed
 * @returns {JSX.Element} 
 */
export const UnconnectedNavToggle: React.FC<INT.IToggleProps & RouteComponentProps> = ({
  getToggleMovieCatRequest,
  getToggleSerieCatRequest,
  clearMoviesByGenreState,
  clearSeriesByGenreState,
  getToggleMenuRequest,
  openAuthModal,
  isUserSignedIn,
  history,
  setAuthModalUI
}): JSX.Element => {

  let ww = useWindowSize();

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

  // if user is signed on click goes to favorites
  // if not opens sign in modal
  const handleMyFavorites = (): void => {
    if (isUserSignedIn) {
      history.push('/favorites')
    } else {
      getToggleMenuRequest(true)
      setAuthModalUI(1)
      setTimeout(() => {
        openAuthModal(true)
      }, 1000);
    }
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
        {ww.innerWidth > 768 ? <p>My Favorites</p> : <p>Favorites</p>}

      </div>
    </div>

  )
}

const mapStateToProps = (state: any) => {
  return {
    isUserSignedIn: state.awsReducer.isUserSignedIn
  }
}

export default withRouter(connect(mapStateToProps, {
  getToggleMovieCatRequest,
  getToggleSerieCatRequest,
  clearMoviesByGenreState,
  clearSeriesByGenreState,
  getToggleMenuRequest,
  openAuthModal,
  setAuthModalUI
})(UnconnectedNavToggle))

