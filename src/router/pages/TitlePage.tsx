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
  movieInfo,
  serieInfo,
  isMovieModalOpen,
  history }): JSX.Element => {

  const [show, set] = useState(false)

  useEffect(() => {
    set(true)
    // set modal to false on route unmount
    return () => set(false)
  }, [])

  useEffect(() => {
    // set modal to false if user presses browser back button
    window.onpopstate = (e) => {
      set(false)
    }
  }, [window.onpopstate])


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
          <TitleModal movieInfo={movieInfo} serieInfo={serieInfo} isMovieModalOpen={isMovieModalOpen} />

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
    movieInfo: state.moviesReducer.movieInfo,
    serieInfo: state.seriesReducer.serieInfo
  }
}

export default connect(mapStateToProps, {})(TitlePage)



