import React from 'react'
import { connect } from 'react-redux'
import Scrollbars from 'react-custom-scrollbars'
import * as INT from '../../helpers/interfaces'
import { useTransition, useTrail, animated as a } from 'react-spring'


export const UnconnectedSlideMenu: React.FC<INT.IMenuProps> = ({
  isMenuOpen,
  movieGenres,
  serieGenres }): JSX.Element => {

  const transition = useTransition(isMenuOpen, null, {
    from: { transform: `translate3d(-100%,0,0)` },
    enter: { transform: `translate3d(0%,0,0)` },
    leave: { transform: `translate3d(-100%,0,0)` }
  })

  // const trail = useTrail(movieGenres.length, {
  //   opacity: 1,
  //   transform: 'translateX(0px)'
  // })

  const renderMovieGenres = () => {
    return (
      <div className="movie-genres-wrapper">
        <ul>
          {
            movieGenres.map(genre => (
              <a.li className="movie-genre" key={genre.id}>
                {genre.name}
              </a.li>
            ))
          }
        </ul>
      </div >
    )
  }

  return (
    <>
      {transition.map(
        ({ item, key, props }) => (
          item &&
          <a.div className="nav-wrapper" style={props} key={key}>
            <div className="nav-list-wrapper">
              <Scrollbars>
                {renderMovieGenres()}
              </Scrollbars>
            </div>
          </a.div >
        )
      )}
    </>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMenuOpen: state.uiReducer.isMenuOpen,
    movieGenres: state.moviesReducer.movieGenres,
    serieGenres: state.seriesReducer.serieGenres
  };
};

export default connect(mapStateToProps, null)(UnconnectedSlideMenu)






