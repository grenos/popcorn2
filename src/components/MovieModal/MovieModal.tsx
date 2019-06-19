import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { useTransition, animated as a } from 'react-spring'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router"
import { openMovieModalRequest } from '../../redux/actions/uiActions'
import { withRouter } from "react-router-dom"
import { makeDashesUrl, usePrevious } from '../../helpers/helperFunctions'
import close from '../../media/img/close.png'


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

  const refContainer = useRef<HTMLDivElement>(null)

  const transitionMount = useTransition(isMovieModalOpen, null, {
    from: { height: `0vh`, opacity: 0, },
    enter: { height: `55vh`, opacity: 1 },
    leave: { height: `0vh`, opacity: 0 }
  })

  const transitionMounted = useTransition(isMovieModalOpen, null, {
    from: { opacity: 0, },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  const handleGoToMovie = (title: string, id: number): void => {
    history.push(`/title/${makeDashesUrl(title)}`)
  }

  const handleHighlightToggle = () => {
    openMovieModalRequest(false)
  }

  useEffect(() => {
    if (refContainer.current) {
      console.log('on');
    }
    return () => {
      console.log('CIAO');
    }
  }, [refContainer])

  return (
    <div className="item-modal" ref={refContainer}>
      {
        transitionMounted.map(
          ({ item, key, props }) => (item &&
            <a.div
              key={key}
              className="modal-outer"
              style={{ backgroundImage: `url(${URL + backdrop_path})`, ...props }}
            >
              <div className="modal-content">
                <div className="modal-video">
                  <img src='http://unsplash.it/600/350?&gravity=center' alt='' />
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



