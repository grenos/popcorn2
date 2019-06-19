import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useSpring, animated as a } from 'react-spring'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router"
import { openMovieModalRequest } from '../../redux/actions/uiActions'
import { withRouter } from "react-router-dom"
import { makeDashesUrl } from '../../helpers/helperFunctions'
import close from '../../media/img/close.png'

const URL = 'https://image.tmdb.org/t/p/original'


const MovieModal: React.FC<INT.IModalProps & RouteComponentProps> = ({
  history,
  id,
  backdrop_path,
  title,
  overview,
  isMovieModalOpen,
  openMovieModalRequest
}) => {

  const [toggle, setToggle] = useState<boolean>(true)

  const animateChevron = useSpring<INT.IAnimateChevron>({
    transform: toggle ? 'rotate(90deg)' : 'rotate(270deg)',
  })

  const animateHighlight = useSpring<INT.IAnimateHighlight>({
    height: toggle ? '60vh' : '7vh'
  })

  const animateOpacity = useSpring<INT.IAnimateOpacity>({
    opacity: toggle ? 1 : 0
  })

  const handleGoToMovie = (title: string, id: number): void => {
    history.push(`/title/${makeDashesUrl(title)}`)
  }

  const handleGoToSerie = (name: string, id: number): void => {
    history.push(`/title/${makeDashesUrl(name)}`)
  }

  const handleHighlightToggle = () => {
    // setToggle(toggle => !toggle)
    openMovieModalRequest(false)
  }


  return (
    <div className="item-modal">
      <a.div
        key={id}
        className="modal-outer"
        style={{ backgroundImage: `url(${URL + backdrop_path})`, ...animateHighlight }}
      >
        <div className="modal-content">
          <a.div className="modal-video" style={animateOpacity}>
            <img src='http://unsplash.it/600/350?random&gravity=center' alt='' />
          </a.div>
          <a.div className="info-wrapper-modal" style={animateOpacity}>
            <h3>{title}</h3>
            <p>{overview}</p>
            <div className="cta">
              <button onClick={() => handleGoToMovie(title, id)}>
                Details
              </button>
              <button onClick={() => console.log('added')}>
                Add to list
              </button>
            </div>
          </a.div>
        </div>
        <div className="close" onClick={handleHighlightToggle}>
          <a.img src={close} alt="close" />
        </div>
      </a.div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isMovieModalOpen: state.uiReducer.isMovieModalOpen
  }
}

export default withRouter(connect(mapStateToProps, { openMovieModalRequest })(MovieModal))
