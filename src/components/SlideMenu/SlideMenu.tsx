import React from 'react'
import { connect } from 'react-redux'
import Scrollbars from 'react-custom-scrollbars'
import * as INT from '../../helpers/interfaces'
import { getMoviesByGenreRequest, getSeriesByGenreRequest } from '../../redux/actions/apiActions'
import { useTransition, animated as a } from 'react-spring'
import { Trail } from 'react-spring/renderprops.cjs';
import popcorn from '../../media/img/popcorn.png'

export const UnconnectedSlideMenu: React.FC<INT.IMenuProps> = ({
  isMenuOpen,
  movieGenres,
  serieGenres,
  isMovieCatSelected,
  getMoviesByGenreRequest,
  getSeriesByGenreRequest }): JSX.Element => {

  const transition = useTransition(isMenuOpen, null, {
    from: { transform: `translate3d(-100%,0,0)` },
    enter: { transform: `translate3d(0%,0,0)` },
    leave: { transform: `translate3d(-100%,0,0)` }
  })

  const renderMovieGenres = (): JSX.Element => {
    return (
      <div className="genres-wrapper">
        <ul className="genres-list">
          {
            <Trail
              items={movieGenres}
              keys={movieGenres => movieGenres.id}
              config={{ tension: 215, mass: 0.5, friction: 16 }}
              from={{ opacity: 0, transform: 'translate3d(-100px, 0, 0)' }}
              to={{ opacity: 1, transform: 'translate3d(0px, 0, 0)' }}
            >
              {movieGenres => props =>
                <a.li
                  style={props}
                  className="genres"
                  onClick={() => getMoviesByGenreRequest(
                    movieGenres.id, 1
                  )}
                >
                  {movieGenres.name}
                </a.li>}
            </Trail>
          }
        </ul>
      </div >
    )
  }

  const renderSerieGenres = (): JSX.Element => {
    return (
      <div className="genres-wrapper">
        <ul className="genres-list">
          {
            <Trail
              items={serieGenres}
              keys={serieGenres => serieGenres.id}
              config={{ tension: 215, mass: 0.5, friction: 16 }}
              from={{ opacity: 0, transform: 'translate3d(-100px, 0, 0)' }}
              to={{ opacity: 1, transform: 'translate3d(0px, 0, 0)' }}
            >
              {serieGenres => props =>
                <a.li
                  style={props}
                  className="genres"
                  onClick={() => getSeriesByGenreRequest(
                    serieGenres.id, 1
                  )}
                >
                  {serieGenres.name}
                </a.li>}
            </Trail>
          }
        </ul>
      </div >
    )
  }

  const renderList = isMovieCatSelected ? renderMovieGenres() : renderSerieGenres()

  return (
    <div data-test="slide-menu">
      {transition.map(
        ({ item, key, props }) => (
          item &&
          <a.div className="nav-wrapper"  style={props} key={key}>
            <div className="menu-logo">
              <img src={popcorn} alt="logo" />
            </div>
            <div className="nav-list-wrapper">
              <Scrollbars className="scrollbar">
                {renderList}
              </Scrollbars>
            </div>
          </a.div >
        )
      )}
    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMenuOpen: state.uiReducer.isMenuOpen,
    movieGenres: state.moviesReducer.movieGenres,
    serieGenres: state.seriesReducer.serieGenres,
    isMovieCatSelected: state.uiReducer.isMovieCatSelected
  }
}

export default connect(mapStateToProps,
  {
    getMoviesByGenreRequest,
    getSeriesByGenreRequest
  }
)(UnconnectedSlideMenu)

