import React from 'react'
import { connect } from 'react-redux'
import Scrollbar from "react-scrollbars-custom";
import * as INT from '../../helpers/interfaces'
import { getMoviesByGenreRequest, getSeriesByGenreRequest } from '../../redux/actions/apiActions'
import { getToggleMenuRequest } from '../../redux/actions/uiActions'
import { useTransition, animated as a } from 'react-spring'
import { Trail } from 'react-spring/renderprops.cjs';
import popcorn from '../../media/img/popcorn.png'

export const UnconnectedSlideMenu: React.FC<INT.IMenuProps> = ({
  isMenuOpenProp,
  movieGenres,
  serieGenres,
  isMovieCatSelected,
  getMoviesByGenreRequest,
  getSeriesByGenreRequest,
  getToggleMenuRequest }): JSX.Element => {

  const transition = useTransition(isMenuOpenProp, null, {
    from: { transform: `translate3d(-100%,0,0)` },
    enter: { transform: `translate3d(0%,0,0)` },
    leave: { transform: `translate3d(-100%,0,0)` }
  })

  const renderMovieGenres = (): JSX.Element => {
    return (
      <div className="genres-wrapper" id="movie-genres">
        <ul className="genres-list">
          {
            <Trail
              items={movieGenres}
              keys={movieGenres => movieGenres.id}
              config={{ tension: 215, mass: 0.5, friction: 16 }}
              from={{ opacity: 0, transform: 'translate3d(-100px, 0, 0)' }}
              to={{ opacity: 1, transform: 'translate3d(0px, 0, 0)' }}
            >
              {({ id, name }) => ({ opacity, transform, }) =>
                <a.li
                  style={{ opacity, transform }}
                  className="genres"
                  data-test="movie-genres-list-items"
                  onClick={() => handleMovieGenreClick(id, 1)}>
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
              keys={serieGenres => serieGenres.id}
              config={{ tension: 215, mass: 0.5, friction: 16 }}
              from={{ opacity: 0, transform: 'translate3d(-100px, 0, 0)' }}
              to={{ opacity: 1, transform: 'translate3d(0px, 0, 0)' }}
            >
              {({ id, name }) => ({ opacity, transform }) =>
                <a.li
                  style={{ opacity, transform }}
                  className="genres"
                  data-test="serie-genres-list-items"
                  onClick={() => handleSerieGenreClick(id, 1)}>
                  {name}
                </a.li>}
            </Trail>
          }
        </ul>
      </div >
    )
  }

  const handleMovieGenreClick = (id: number, page: number): void => {
    getMoviesByGenreRequest(id, page)
    // getToggleMenuRequest(false)
  }

  const handleSerieGenreClick = (id: number, page: number): void => {
    getSeriesByGenreRequest(id, page)
    // getToggleMenuRequest(false)

  }

  const renderList = isMovieCatSelected ? renderMovieGenres() : renderSerieGenres()

  return (
    <div data-test="slide-menu">
      {transition.map(
        ({ item, key, props }) => (
          item &&
          <a.div className="nav-wrapper" style={props} key={key}>
            <div className="menu-logo">
              <img src={popcorn} alt="logo" />
            </div>
            <div className="nav-list-wrapper">
              <Scrollbar noDefaultStyles>
                {renderList}
              </Scrollbar>
            </div>
          </a.div >
        )
      )}
    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMenuOpenProp: state.uiReducer.isMenuOpenProp,
    movieGenres: state.moviesReducer.movieGenres,
    serieGenres: state.seriesReducer.serieGenres,
    isMovieCatSelected: state.uiReducer.isMovieCatSelected
  }
}

export default connect(mapStateToProps,
  {
    getMoviesByGenreRequest,
    getSeriesByGenreRequest,
    getToggleMenuRequest
  }
)(UnconnectedSlideMenu)

