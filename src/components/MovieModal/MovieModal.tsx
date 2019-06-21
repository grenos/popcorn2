import React, { useRef, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { useTransition, animated as a } from 'react-spring'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router"
import { openMovieModalRequest } from '../../redux/actions/uiActions'
import { getMovieInfoRequest, getSerieInfoRequest } from '../../redux/actions/apiActions'
import { withRouter } from "react-router-dom"
import { makeDashesUrl } from '../../helpers/helperFunctions'
import close from '../../media/img/close.png'
import useWindowSize from '@rehooks/window-size';
import YouTube from 'react-youtube';

const URL = 'https://image.tmdb.org/t/p/w1280'

const MovieModal: React.FC<INT.IModalProps & RouteComponentProps> = ({
  history,
  id,
  backdrop_path,
  title,
  overview,
  isMovieModalOpen,
  openMovieModalRequest,
  getMovieInfoRequest,
  getSerieInfoRequest,
  isMovieCatSelected,
  movieInfo
}) => {

  const Options = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }

  const _onReady = () => {
    console.log('work');
  }

  const ref = useRef<HTMLDivElement>(null)
  let windowSize = useWindowSize();

  const handleScroll = useCallback(() => {
    const nav: number = 60
    if (ref.current) {
      window.scroll({
        behavior: 'smooth',
        top: ref.current.offsetTop - nav * 2
      })
    }
  }, [windowSize.innerHeight])

  useEffect(() => {
    isMovieCatSelected
      ? getMovieInfoRequest(id)
      : getSerieInfoRequest(id)
  }, [])

  const transitionMount = useTransition(isMovieModalOpen, null, {
    from: { height: `0vh`, opacity: 0 },
    enter: { height: `65vh`, opacity: 1 },
    leave: { height: `0vh`, opacity: 0 },
    config: { tension: 240, mass: 1, friction: 26, clamp: true, velocity: 1, },
    onRest: () => handleScroll(),
  })

  const handleGoToMovie = (title: string, id: number): void => {
    history.push(`/title/${makeDashesUrl(title)}`)
  }

  const handleHighlightToggle = (): void => {
    openMovieModalRequest(false)
  }

  const { tagline, genres } = movieInfo

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
                  <YouTube
                    videoId="2g811Eo7K8U"
                    opts={Options}
                    onReady={_onReady}
                  />
                </div>
                <div className="info-wrapper-modal">
                  <h3>{title}</h3>
                  <h5>{tagline}</h5>
                  <p>{overview}</p>
                  <div className="modal-genres">
                    {genres && genres.map(({ id, name }) => <p key={id}>{name}</p>)}
                  </div>
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
    isMovieModalOpen: state.uiReducer.isMovieModalOpen,
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    movieInfo: state.moviesReducer.movieInfo
  }
}

export default withRouter(connect(mapStateToProps, {
  openMovieModalRequest,
  getMovieInfoRequest,
  getSerieInfoRequest
})(MovieModal))



