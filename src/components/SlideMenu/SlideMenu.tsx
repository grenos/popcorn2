import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Scrollbar from "react-scrollbars-custom";
import * as INT from '../../helpers/interfaces'
import {
  getMoviesByGenreRequest,
  getSeriesByGenreRequest,
  getMovieGenresRequest,
  getSerieGenresRequest
} from '../../redux/actions/apiActions'
import { openAuthModal, getToggleMenuRequest, setAuthModalUI, clearMovieGenresState, clearSerieGenresState } from '../../redux/actions/uiActions'
import { userSignedIn, clearUserInfo } from '../../redux/actions/awsActions'
import { useTransition, animated as a } from 'react-spring'
import { Trail } from 'react-spring/renderprops.cjs';
import { withRouter } from "react-router-dom"
import { RouteComponentProps } from "react-router";
import { makeDashesUrl } from '../../helpers/helperFunctions'
import popcorn from '../../media/img/popcorn.png'
import Modal from '../SignInModal/Modal'
import { Auth } from 'aws-amplify'
import get from 'lodash.get'


/**
 * 
 * @function
 * @param {bool} isMenuOpenProp - used for animation
 * @param {function} getMovieGenresRequest - Action called on mount (gets all genres)
 * @param {function} getSerieGenresRequest - Action called on mount (gets all genres)
 * @param {array} movieGenres - aray of objects (genres to print)
 * @param {array} serieGenres - aray of objects (genres to print)
 * @param {bool} isMovieCatSelected 
 * @param {function} getMoviesByGenreRequest - Action gets first page of genre selected
 * @param {function} getSeriesByGenreRequest - Action gets first page of genre selected
 * @param {object} location - sets url history state to current genre page
 * @param {object} history - push to genre page
 * @param {function} openAuthModal - Action open auth modal
 * @param {function} userSignedIn - Action sets to false on logout
 * @param {function} clearUserInfo - Action clear user info from state on logout
 * @param {function} getToggleMenuRequest - Action close slide menu on logout
 * @param {object} userInfo - gets userInfo from state to display name once user is logged in
 * @param {bool} isUserSignedIn - used as toggle to display signin / login info 
 * @param {function} setAuthModalUI - choose auth modal to display 
 * @param {number} isAuthModalUI - passes to child type of auth modal to display
 * @param {function} clearMovieGenresState - clear entire genre state on new category
 * @param {function} clearSerieGenresState - clear entire genre state on new category
 * @returns {JSX.Element}
 */
export const UnconnectedSlideMenu: React.FC<INT.IMenuProps & RouteComponentProps> = ({
  isMenuOpenProp,
  getMovieGenresRequest,
  getSerieGenresRequest,
  movieGenres,
  serieGenres,
  isMovieCatSelected,
  getMoviesByGenreRequest,
  getSeriesByGenreRequest,
  location,
  history,
  openAuthModal,
  userSignedIn,
  clearUserInfo,
  getToggleMenuRequest,
  userInfo,
  isUserSignedIn,
  setAuthModalUI,
  isAuthModalUI,
  clearMovieGenresState,
  clearSerieGenresState
}): JSX.Element => {

  const transition = useTransition(isMenuOpenProp, null, {
    from: { transform: `translate3d(-100%,0,0)` },
    enter: { transform: `translate3d(0%,0,0)` },
    leave: { transform: `translate3d(-100%,0,0)` }
  })

  useEffect(() => {
    history.push({ state: { from: '' } })

    isMovieCatSelected
      ? getMovieGenresRequest()
      : getSerieGenresRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMovieCatSelected, getMovieGenresRequest, getSerieGenresRequest])


  const renderMovieGenres = (): JSX.Element => {
    return (
      <div className="genres-wrapper" id="movie-genres">
        <ul className="genres-list">
          {
            <Trail
              items={movieGenres}
              keys={({ id }) => id}
              config={{ tension: 215, mass: 0.5, friction: 16 }}
              from={{ opacity: 0, transform: 'translate3d(-100px, 0, 0)' }}
              to={{ opacity: 1, transform: 'translate3d(0px, 0, 0)' }}
            >
              {({ id, name }) => ({ opacity, transform, }) =>
                <a.li
                  style={{ opacity, transform }}
                  className="genres"
                  data-test="movie-genres-list-items"
                  onClick={() => handleMovieGenreClick(id, 1, name)}>
                  {name}
                </a.li>}
            </Trail>
          }
        </ul>
      </div >
    )
  }

  const renderSerieGenres = (): JSX.Element => {
    return (
      <div className="genres-wrapper" id="serie-genres">
        <ul className="genres-list">
          {
            <Trail
              items={serieGenres}
              keys={({ id }) => id}
              config={{ tension: 215, mass: 0.5, friction: 16 }}
              from={{ opacity: 0, transform: 'translate3d(-100px, 0, 0)' }}
              to={{ opacity: 1, transform: 'translate3d(0px, 0, 0)' }}
            >
              {({ id, name }) => ({ opacity, transform }) =>
                <a.li
                  style={{ opacity, transform }}
                  className="genres"
                  data-test="serie-genres-list-items"
                  onClick={() => handleSerieGenreClick(id, 1, name)}>
                  {name}
                </a.li>}
            </Trail>
          }
        </ul>
      </div >
    )
  }

  const handleLogin = () => {
    setAuthModalUI(1)
    openAuthModal(true)
  }

  const handleSignup = () => {
    setAuthModalUI(2)
    openAuthModal(true)
  }

  const handleSignOut = () => {
    setTimeout(() => {
      Auth.signOut()
        .then(
          getToggleMenuRequest(false),
          userSignedIn(false)
        )
        .catch(err => console.log(err));
      clearUserInfo()
    }, 1000)
  }

  /**
   * handles clicked genre actions
   * @function
   * @param {number} id - to make api call 
   * @param {number} page - always he first page
   * @param {string} name - genre name - to be displayed at url
   */
  const handleMovieGenreClick = (id: number, page: number, name: string): void | null => {
    // check if user is already at current genre page
    // if yes do not call again on genre name click
    if (location.pathname === `/genres/films/${name}`) {
      return null
    } else {
      clearMovieGenresState()
      getMoviesByGenreRequest(id, page, makeDashesUrl(name))
      history.push({ pathname: `/genres/films/${makeDashesUrl(name)}`, state: { from: location.pathname } })
      setTimeout(() => {
        getToggleMenuRequest(false)
      }, 400)
    }
  }


  /**
 * handles clicked genre actions
 * @function
 * @param {number} id - to make api call 
 * @param {number} page - always he first page
 * @param {string} name - genre name - to be displayed at url
 */
  const handleSerieGenreClick = (id: number, page: number, name: string): void | null => {
    // check if user is already at current genre page
    // if yes do not call again on genre name click
    if (location.pathname === `/genres/series/${name}`) {
      return null
    } else {
      clearSerieGenresState()
      getSeriesByGenreRequest(id, page, makeDashesUrl(name))
      // push new history state here 
      // to know when we come from another genre page (on TopItems conponent)
      // so we can reset the counter
      history.push({ pathname: `/genres/series/${makeDashesUrl(name)}`, state: { from: location.pathname } })
      setTimeout(() => {
        getToggleMenuRequest(false)
      }, 400)

    }
  }

  const renderList = isMovieCatSelected ? renderMovieGenres() : renderSerieGenres()
  const name: string = get(userInfo, 'attributes.name', '')

  return (
    <div data-test="slide-menu">

      {
        transition.map(
          ({ item, key, props }) => (item &&
            <a.div className="nav-wrapper" style={props} key={key}>
              <Modal modalType={isAuthModalUI} />
              <div className="menu-logo">
                <img src={popcorn} alt="logo" />
                <div className="signup">
                  <div>
                    {isUserSignedIn ? null : <p onClick={handleLogin}>Log In</p>}
                    {isUserSignedIn ? null : <p onClick={handleSignup}>Sign Up</p>}
                  </div>
                  <div>
                    <span>{isUserSignedIn ? name : null}</span>
                    {isUserSignedIn ? <p onClick={handleSignOut}>Sign Out</p> : null}
                  </div>
                </div>
              </div>
              <div className="nav-list-wrapper">
                <Scrollbar noDefaultStyles style={{ height: 'calc(100vh - 13rem)' }}>
                  {renderList}
                </Scrollbar>
              </div>
            </a.div>
          )
        )
      }
    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMenuOpenProp: state.uiReducer.isMenuOpenProp,
    movieGenres: state.moviesReducer.movieGenres,
    serieGenres: state.seriesReducer.serieGenres,
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    userInfo: state.awsReducer.userInfo,
    isUserSignedIn: state.awsReducer.isUserSignedIn,
    isAuthModalUI: state.uiReducer.isAuthModalUI
  }
}

export default withRouter(connect(mapStateToProps,
  {
    getMoviesByGenreRequest,
    getSeriesByGenreRequest,
    getMovieGenresRequest,
    getSerieGenresRequest,
    openAuthModal,
    userSignedIn,
    clearUserInfo,
    getToggleMenuRequest,
    setAuthModalUI,
    clearMovieGenresState,
    clearSerieGenresState
  }
)(UnconnectedSlideMenu))

