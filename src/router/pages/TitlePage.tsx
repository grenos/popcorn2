import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import TitleModal from '../../components/TitleModal/TitleModal'
import { Transition } from 'react-spring/renderprops.cjs'


const TitlePage: React.FC<INT.ITitlePageProps> = ({ movieInfo, serieInfo, isMovieModalOpen }): JSX.Element => {

  const [show, set] = useState(false)

  useEffect(() => {
    set(true)
    return () => set(false)
  }, [])

  return (
    <Transition
      items={show}
      from={{ transform: 'translate3d(0, 200%, 0)' }}
      enter={{ transform: 'translate3d(0, 0%, 0)' }}
      leave={{ transform: 'translate3d(0, 200%, 0)' }}
    // config={{ tension: 40, mass: 1, friction: 66, clamp: true, velocity: 1, }}
    >
      {show => show && (props =>
        <div style={props}>
          <TitleModal movieInfo={movieInfo} serieInfo={serieInfo} isMovieModalOpen={isMovieModalOpen} />
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



