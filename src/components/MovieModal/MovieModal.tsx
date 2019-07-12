import React, { useRef, useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useTransition, useSpring, animated as a } from 'react-spring'
import { Transition } from 'react-spring/renderprops.cjs'
import * as INT from '../../helpers/interfaces'
import {
  openMovieModalRequest,
  openVideoSectionRequest,
  openSimilarSectionRequest,
  openMoreInfoRequest
} from '../../redux/actions/uiActions'
import { getMovieInfoRequest, getSerieInfoRequest, getCastRequest } from '../../redux/actions/apiActions'
import Scrollbar from "react-scrollbars-custom"
import RelatedItems from './RelatedItems'
import Similars from './Similars'
import MoreInfo from './MoreInfo'
import close from '../../media/img/close.png'
import play from '../../media/img/play.png'
import pause from '../../media/img/pause.png'
import volume from '../../media/img/volume.png'
import mute from '../../media/img/mute.png'
import YouTube from 'react-youtube';
import get from 'lodash.get'

const URL = 'https://image.tmdb.org/t/p/w1280'

export const UnconnectedMovieModal: React.FC<INT.IModalProps> = React.memo(({
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
  isVideoSectionOpen,
  openSimilarSectionRequest,
  isSimilarSectionOpen,
  openMoreInfoRequest,
  isMoreInfoOpen,
  getCastRequest
}) => {

  const [videoPlayer, setVideoPlayer] = useState()
  const [togglePlayer, setTogglePlayer] = useState<boolean>(false)
  const [toggleMute, setToggleMute] = useState<boolean>(false)
  // const [animationEnd, setAnimationEnd] = useState<boolean>(true)

  const ref = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback((): void => {
    const nav: number = 60
    if (ref.current) {
      window.scroll({
        behavior: 'smooth',
        top: ref.current.offsetTop - nav * 2
      })
    }
  }, [])

  useEffect((): void => {
    isMovieCatSelected
      ? getMovieInfoRequest(id)
      : getSerieInfoRequest(id)
  }, [getMovieInfoRequest, getSerieInfoRequest, id, isMovieCatSelected])

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
    config: { tension: 170, mass: 1, friction: 46, clamp: true },
  })

  const fadeOnHide = useSpring({
    opacity:
      isVideoSectionOpen
        || isSimilarSectionOpen
        || isMoreInfoOpen
        ? 0 : 1,
    config: { tension: 160, mass: 1, friction: 46, clamp: true }
  })

  const handleGoToFav = (id: number): void => {
    console.log('add to fav : ' + id);
  }

  const [videoActive, setVideoActive] = useState<boolean>(false)

  const onReady = (event: any): void => {
    const player = event.target
    setVideoPlayer(player)
    setVideoActive(videoActive => !videoActive)
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

  const resetModalsOnLocChange = (): void => {
    openVideoSectionRequest(false)
    openSimilarSectionRequest(false)
    openMoreInfoRequest(false)
  }
  useEffect(() => {
    resetModalsOnLocChange()
    return () => resetModalsOnLocChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleHighlightToggle = (): void => {
    openMovieModalRequest(false)
  }

  const handleVolume = (): void => {
    setToggleMute(toggleMute => !toggleMute)
    if (toggleMute) {
      videoPlayer.unMute()
    } else {
      videoPlayer.mute()
    }
  }


  useEffect(() => {
    if (videoPlayer !== undefined) {
      if (isMovieModalOpen) {
        isVideoSectionOpen
          || isSimilarSectionOpen
          || isMoreInfoOpen
          ? videoPlayer.pauseVideo()
          : videoPlayer.playVideo()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoSectionOpen, isSimilarSectionOpen, isMoreInfoOpen, videoPlayer])


  const handlePlay = (): void => {
    setTogglePlayer(togglePlayer => !togglePlayer)
    if (togglePlayer) {
      videoPlayer.playVideo()
    } else {
      videoPlayer.pauseVideo()
    }
  }


  const handleOtherVideos = (): void => {
    openVideoSectionRequest(true)
    if (togglePlayer) {
      setTogglePlayer(togglePlayer => !togglePlayer)
      videoPlayer.pauseVideo()
    }
  }

  const handleRelated = (): void => {
    openSimilarSectionRequest(true)
    if (togglePlayer) {
      setTogglePlayer(togglePlayer => !togglePlayer)
      videoPlayer.pauseVideo()
    }
  }

  const handleInfo = (id: number): void => {
    openMoreInfoRequest(true)
    getCastRequest(id)
    if (togglePlayer) {
      setTogglePlayer(togglePlayer => !togglePlayer)
      videoPlayer.pauseVideo()
    }
  }

  const { tagline, genres } = movieInfo
  const movieVid: string = get(movieInfo, 'videos.results[0].key', '')
  const serieVid: string = get(serieInfo, 'videos.results[0].key', '')


  return (
    <div className="item-modal" ref={ref} data-test="component-modal">
      {
        transitionMount.map(
          ({ item, key, props }) => (item &&
            <a.div
              key={key}
              className="modal-outer"
              style={{ backgroundImage: `url(${URL + backdrop_path})`, ...props }}
            >
              <a.div className="modal-content" style={{ ...fadeContent, ...fadeOnHide }}>
                <YouTube
                  videoId={isMovieCatSelected ? movieVid : serieVid}
                  className={`video ${videoActive ? 'fadein' : null}`}
                  containerClassName="video-container"
                  // @ts-ignore
                  opts={Options}
                  onReady={onReady}
                />

                <div className="info-wrapper-modal">
                  <div className="sizer">
                    <div className="info-inner">
                      <h3 data-test="modal-title">{title}</h3>
                      <h5>{isMovieCatSelected && tagline}</h5>
                      <Scrollbar noDefaultStyles style={{ height: 100, marginBottom: 40 }}>
                        <p data-test="modal-overview">{overview}</p>
                      </Scrollbar>
                      <div className="modal-genres">
                        {genres && genres.map(({ id, name }) => <p key={id}>{name}</p>)}
                      </div>
                      <div className="cta">
                        <button onClick={() => handleGoToFav(id)}>Add to list</button>
                      </div>
                      <div className="rel">
                        {
                          (movieInfo.videos && movieInfo.videos.results.length < 1)
                            || (serieInfo.videos && serieInfo.videos.results.length < 1)
                            ? null
                            : <button onClick={handleOtherVideos} data-test="videosBtn">Videos</button>
                        }
                        {
                          (movieInfo.similar && movieInfo.similar.results.length < 1)
                            || (serieInfo.similar && serieInfo.similar.results.length < 1)
                            ? null
                            : <button onClick={handleRelated} data-test="relatedBtn">Related Movies</button>
                        }
                        <button onClick={() => handleInfo(id)} data-test="infoBtn">Other info</button>
                      </div>
                    </div>
                  </div>
                </div>

              </a.div>
              <div className="close" onClick={handleHighlightToggle}>
                <img src={close} alt="close modal" />
              </div>
              <div className="mute" onClick={handleVolume}>
                <img src={toggleMute ? volume : mute} alt="volume mute button" />
              </div>
              <div className="pause" onClick={handlePlay}>
                <img src={togglePlayer || isVideoSectionOpen || isSimilarSectionOpen || isMoreInfoOpen ? play : pause} alt="pplay pause button" />
              </div>

              <Transition
                items={isVideoSectionOpen}
                from={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0%, 0, 0)' }}
                leave={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}
              >
                {isVideoSectionOpen => isVideoSectionOpen && (props =>
                  <RelatedItems videos={isMovieCatSelected ? movieInfo.videos : serieInfo.videos} animation={props} data-test="related-modal" />
                )}
              </Transition>

              <Transition
                items={isSimilarSectionOpen}
                from={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0%, 0, 0)' }}
                leave={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}>
                {isSimilarSectionOpen => isSimilarSectionOpen && (props =>
                  <Similars videos={isMovieCatSelected ? movieInfo.similar : serieInfo.similar} animation={props} data-test="similar-modal" />
                )}
              </Transition>

              <Transition
                items={isMoreInfoOpen}
                from={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0%, 0, 0)' }}
                leave={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}>
                {isMoreInfoOpen => isMoreInfoOpen && (props =>
                  <MoreInfo info={isMovieCatSelected ? movieInfo : serieInfo} animation={props} data-test="moreInfo-modal" />
                )}
              </Transition>

            </a.div>
          )
        )
      }
    </div>
  )
})

const mapStateToProps = (state: any) => {
  return {
    isMovieModalOpen: state.uiReducer.isMovieModalOpen,
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    movieInfo: state.moviesReducer.movieInfo,
    serieInfo: state.seriesReducer.serieInfo,
    isVideoSectionOpen: state.uiReducer.isVideoSectionOpen,
    isSimilarSectionOpen: state.uiReducer.isSimilarSectionOpen,
    isMoreInfoOpen: state.uiReducer.isMoreInfoOpen
  }
}

export default connect(mapStateToProps, {
  openMovieModalRequest,
  getMovieInfoRequest,
  getSerieInfoRequest,
  openVideoSectionRequest,
  openSimilarSectionRequest,
  openMoreInfoRequest,
  getCastRequest
})(UnconnectedMovieModal)



