import React, { useEffect, useState, Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router"
import * as INT from '../../helpers/interfaces'
import TitleModal from '../../components/TitleModal/TitleModal'
import { Transition } from 'react-spring/renderprops.cjs'
import close from '../../media/img/close.png'

const closeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '5%',
  right: '10%',
  width: '20px'
}


const TitlePage: React.FC<INT.ITitlePageProps & RouteComponentProps> = ({
  movieInfoModal,
  serieInfoModal,
  isMovieModalOpen,
  isMovieCatSelected,
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
            movieInfo={isMovieCatSelected ? movieInfoModal : serieInfoModal}
            isMovieModalOpen={isMovieModalOpen} />

          <div className="close" onClick={handleClose} >
            <img src={close} alt="close modal" style={closeStyle} />
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
    serieInfoModal: state.seriesReducer.serieInfoModal
  }
}

export default connect(mapStateToProps, {})(TitlePage)



