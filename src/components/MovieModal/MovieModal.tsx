import React, { useRef, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { useTransition, animated as a } from 'react-spring'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router"
import { openMovieModalRequest } from '../../redux/actions/uiActions'
import { withRouter } from "react-router-dom"
import { makeDashesUrl } from '../../helpers/helperFunctions'
import close from '../../media/img/close.png'
import useWindowSize from '@rehooks/window-size';

const URL = 'https://image.tmdb.org/t/p/w1280'

const MovieModal: React.FC<INT.IModalProps & RouteComponentProps> = ({
  history,
  id,
  backdrop_path,
  title,
  overview,
  isMovieModalOpen,
  openMovieModalRequest
}) => {

  const ref = useRef<HTMLDivElement>(null)
  let windowSize = useWindowSize();

  const handleScroll = useCallback(() => {

    const div: number = ref!.current!.offsetHeight / 3
    const wh: number = windowSize.innerHeight / 2
    const nav: number = 60
    // const _WH = windowSize.outerHeight
    // const divHeight = _WH * 0.6
    // const div = parseInt(divHeight.toFixed(0)) / 3

    if (ref.current) {
      window.scroll({
        behavior: 'smooth',
        top: ref.current.offsetTop + div - wh - nav
      })
    }
  }, [ref.current])


  const transitionMount = useTransition(isMovieModalOpen, null, {
    from: { height: `0vh`, opacity: 0, marginTop: 0 },
    enter: { height: `60vh`, opacity: 1, marginTop: 10 },
    leave: { height: `0vh`, opacity: 0, marginTop: 0 },
    config: { tension: 240, mass: 1, friction: 26, clamp: true, velocity: 1 },
    onRest: () => handleScroll(),
  })

  const transitionMounted = useTransition(isMovieModalOpen, null, {
    from: { opacity: 0, },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  const handleGoToMovie = (title: string, id: number): void => {
    history.push(`/title/${makeDashesUrl(title)}`)
  }

  const handleHighlightToggle = (): void => {
    openMovieModalRequest(false)
  }

  return (
    <div className="item-modal" ref={ref}>
      {
        transitionMount.map(
          ({ item, key, props }) => (item &&
            <a.div
              key={key}
              className="modal-outer"
              style={{ backgroundImage: `url(${URL + backdrop_path})`, ...props }}
            >
              <div className="modal-content">
                <div className="modal-video">
                  <img src={`${URL + backdrop_path}`} alt='video' />
                </div>
                <div className="info-wrapper-modal">
                  <h3>{title}</h3>
                  <p>{overview}</p>
                  <div className="cta">
                    <button onClick={() => handleGoToMovie(title, id)}>Details</button>
                    <button onClick={() => console.log('added')}>Add to list</button>
                  </div>
                </div>
              </div>
              <div className="close" onClick={handleHighlightToggle}>
                <img src={close} alt="close" />
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
    isMovieModalOpen: state.uiReducer.isMovieModalOpen
  }
}

export default withRouter(connect(mapStateToProps, { openMovieModalRequest })(MovieModal))



