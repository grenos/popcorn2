import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router"
import * as INT from '../../helpers/interfaces'
import TitleModal from '../../components/TitleModal/TitleModal'
import { Transition } from 'react-spring/renderprops.cjs'
import back from '../../media/img/back.png'

const closeStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  margin: '40px 0',
  left: '3%',
  width: '35px',
  cursor: 'pointer'
}


const TitlePage: React.FC<INT.ITitlePageProps & RouteComponentProps> = ({
  movieInfoModal,
  serieInfoModal,
  isMovieModalOpen,
  isRelatedMovieSelected,
  history }): JSX.Element => {

  const [show, set] = useState(false)

  useEffect(() => {
    set(true)
    // set modal to false on route unmount
    return () => set(false)
  }, [])

  const handleClose = () => {
    set(false)
    setTimeout(() => {
      history.goBack()
    }, 300);
  }

  return (
    <Transition
      items={show}
      from={{ opacity: 0, transform: 'translate3d(0, -100%, 0)' }}
      enter={{ opacity: 1, transform: 'translate3d(0, 0%, 0)' }}
      leave={{ opacity: 0, transform: 'translate3d(0, -100%, 0)' }}
      config={{ tension: 200, mass: 1, friction: 26, clamp: true, velocity: 1, }}
    >
      {show => show && (props =>
        <div style={props}>
          <TitleModal
            movieInfo={isRelatedMovieSelected ? movieInfoModal : serieInfoModal}
            isMovieModalOpen={isMovieModalOpen}
            show={show}
          />

          <div className="close" onClick={handleClose} >
            <img src={back} alt="close modal" style={closeStyle} />
          </div>
        </div>

      )}
    </Transition>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMovieModalOpen: state.uiReducer.isMovieModalOpen,
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    movieInfoModal: state.moviesReducer.movieInfoModal,
    serieInfoModal: state.seriesReducer.serieInfoModal,
    isRelatedMovieSelected: state.uiReducer.isRelatedMovieSelected
  }
}

export default connect(mapStateToProps, {})(TitlePage)



