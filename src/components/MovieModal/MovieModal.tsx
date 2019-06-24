import React, { useRef, useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useTransition, useSpring, animated as a } from 'react-spring'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router"
import { openMovieModalRequest, openVideoSectionRequest } from '../../redux/actions/uiActions'
import { getMovieInfoRequest, getSerieInfoRequest } from '../../redux/actions/apiActions'
import { withRouter } from "react-router-dom"
import RelatedItems from './RelatedItems'
import close from '../../media/img/close.png'
import play from '../../media/img/play.png'
import pause from '../../media/img/pause.png'
import volume from '../../media/img/volume.png'
import mute from '../../media/img/mute.png'
import useWindowSize from '@rehooks/window-size';
import YouTube from 'react-youtube';
import get from 'lodash.get'

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
  movieInfo,
  serieInfo,
  openVideoSectionRequest,
  isVideoSectionOpen
}) => {

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

  const fadeContent = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 140, mass: 1, friction: 46, clamp: true },
  })

  const handleGoToFav = (id: number): void => {
    console.log('add to fav');
  }

  const [videoPlayer, setVideoPlayer] = useState()
  const [togglePlayer, setTogglePlayer] = useState(false)
  const [toggleMute, setToggleMute] = useState(false)

  const [toggleVideos, setToggleVideos] = useState(false)
  // const [toggleMute, setToggleMute] = useState(false)
  // const [toggleMute, setToggleMute] = useState(false)


  const onReady = (event: any) => {
    const player = event.target
    setVideoPlayer(player)
  }

  const Options = {
    // @ts-ignore
    height: '65vh',
    playerVars: {
      autoplay: 1,
      cc_load_policy: 0,
      controls: 0,
      disablekb: 1,
      origin: 'http://localhost:3000/',
      enablejsapi: 1,
      fs: 0,
      iv_load_policy: 3,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
    }
  }

  const handleHighlightToggle = (): void => {
    openMovieModalRequest(false)
  }

  const handleVolume = (): void => {
    setToggleMute(toggleMute => !toggleMute)
    // @ts-ignore
    if (toggleMute) {
      videoPlayer.unMute()
    } else {
      videoPlayer.mute()
    }
  }

  const handlePlay = (): void => {
    setTogglePlayer(togglePlayer => !togglePlayer)
    // @ts-ignore
    if (togglePlayer) {
      videoPlayer.playVideo()
    } else {
      videoPlayer.pauseVideo()
    }
  }

  const handleOtherVideos = () => {
    openVideoSectionRequest(true)

    setTogglePlayer(togglePlayer => !togglePlayer)
    videoPlayer.pauseVideo()
  }

  const handleRelated = () => {

  }

  const handleInfo = () => {

  }

  const { tagline, genres } = movieInfo
  const movieVid = get(movieInfo, 'videos.results[0].key', 'loading')
  const serieVid = get(serieInfo, 'videos.results[0].key', 'loading')


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
              <a.div className="modal-content" style={fadeContent}>
                <YouTube
                  videoId={isMovieCatSelected ? movieVid : serieVid}
                  className="video"
                  containerClassName="video-container"
                  // @ts-ignore
                  opts={Options}
                  onReady={onReady}
                />

                <div className="info-wrapper-modal">
                  <div className="sizer">
                    <div className="info-inner">
                      <h3>{title}</h3>
                      <h5>{isMovieCatSelected && tagline}</h5>
                      <p>{overview}</p>
                      <div className="modal-genres">
                        {genres && genres.map(({ id, name }) => <p key={id}>{name}</p>)}
                      </div>
                      <div className="cta">
                        <button onClick={() => handleGoToFav(id)}>Add to list</button>
                      </div>
                      <div className="rel">
                        <button onClick={handleOtherVideos}>Videos</button>
                        <button onClick={handleRelated}>Related Movies</button>
                        <button onClick={handleInfo}>Other info</button>
                      </div>
                    </div>
                  </div>
                </div>

              </a.div>
              <div className="close" onClick={handleHighlightToggle}>
                <img src={close} alt="close" />
              </div>
              <div className="mute" onClick={handleVolume}>
                <img src={toggleMute ? volume : mute} alt="close" />
              </div>
              <div className="pause" onClick={handlePlay}>
                <img src={togglePlayer ? play : pause} alt="close" />
              </div>
              {isVideoSectionOpen && <RelatedItems videos={isMovieCatSelected ? movieInfo.videos : serieInfo.videos} />}
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
    movieInfo: state.moviesReducer.movieInfo,
    serieInfo: state.seriesReducer.serieInfo,
    isVideoSectionOpen: state.uiReducer.isVideoSectionOpen
  }
}

export default withRouter(connect(mapStateToProps, {
  openMovieModalRequest,
  getMovieInfoRequest,
  getSerieInfoRequest,
  openVideoSectionRequest
})(MovieModal))



