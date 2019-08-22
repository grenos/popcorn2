import React, { useRef, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTransition, useSpring, animated as a } from 'react-spring';
import { Transition } from 'react-spring/renderprops.cjs';
import * as INT from '../../helpers/interfaces';
import {
  openMovieModalRequest,
  openVideoSectionRequest,
  openSimilarSectionRequest,
  openMoreInfoRequest
} from '../../redux/actions/uiActions';
import {
  getMovieInfoRequest,
  getSerieInfoRequest,
  getCastRequest,
  getSerieFavoriteRequest,
  getMovieFavoriteRequest,
  removeFavMovieRequest,
  removeFavSerieRequest
} from '../../redux/actions/apiActions';
import Scrollbar from 'react-scrollbars-custom';
import RelatedItems from './RelatedItems';
import Similars from './Similars';
import MoreInfo from './MoreInfo';
import IMG from '../../media/img/index'
import YouTube from 'react-youtube';
import get from 'lodash.get';
import useWindowSize from '@rehooks/window-size';
import CatchAll from '../../components/Error/CatchAll'

const URL = 'https://image.tmdb.org/t/p/w1280';

/**
 * Modal menu opens when a locandina is clicked
 * @function
 * @param {number} id 
 * @param {string} backdrop_path 
 * @param {string} title 
 * @param {string} overview 
 * @param {bool} isMovieModalOpen 
 * @param {function} openMovieModalRequest Action
 * @param {function} getMovieInfoRequest Action gets more info about selected item
 * @param {function} getSerieInfoRequest Action gets more info about selected item
 * @param {bool} isMovieCatSelected 
 * @param {object} movieInfo from State - more saved for selected item
 * @param {object} serieInfo from State - more saved for selected item
 * @param {function} openVideoSectionRequest Action opens otherVideos modal panel
 * @param {bool} isVideoSectionOpen
 * @param {function} openSimilarSectionRequest Action opens similar items panel
 * @param {bool} isSimilarSectionOpen
 * @param {function} openMoreInfoRequest Action opens more info panel
 * @param {bool} isMoreInfoOpen
 * @param {function} getCastRequest Action get cast for more info panel
 * @param {function} getSerieFavoriteRequest Action add item to favorites
 * @param {function} getMovieFavoriteRequest Action add item to favorites
 * @param {array} favMovies from State - favorites
 * @param {array} favSeries from State - favorites
 * @param {function} removeFavMovieRequest Action removie item from favosites
 * @param {function} removeFavSerieRequest Action removie item from favosites
 * @param {bool} isUserSignedIn 
 * @returns {JSX.Element} - Rendered Component 
 */
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
  getCastRequest,
  getSerieFavoriteRequest,
  getMovieFavoriteRequest,
  favMovies,
  favSeries,
  removeFavMovieRequest,
  removeFavSerieRequest,
  isUserSignedIn
}) => {

  let ww = useWindowSize();

  const [_WW, set_WW] = useState<number>(0)

  useEffect(() => {
    if (ww.innerWidth <= 1366) {
      set_WW(45)
    } else {
      set_WW(160)
    }
  }, [ww.innerWidth])


  const [videoPlayer, setVideoPlayer] = useState();
  const [togglePlayer, setTogglePlayer] = useState<boolean>(false);
  const [toggleMute, setToggleMute] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  /**
   * auto scroll modal on full view when locandina is clicked to open
   */
  const handleScroll = useCallback((): void => {
    const nav: number = 60;
    if (ref.current) {
      window.scroll({
        behavior: 'smooth',
        top: ref.current.offsetTop - nav * 2
      });
    }
  }, []);

  useEffect((): void => {
    isMovieCatSelected ? getMovieInfoRequest(id) : getSerieInfoRequest(id);
  }, [getMovieInfoRequest, getSerieInfoRequest, id, isMovieCatSelected]);

  // @ts-ignore
  const transitionMount = useTransition(isMovieModalOpen, null, {
    from: { height: `0vh`, opacity: 0 },
    enter: { height: `65vh`, opacity: 1 },
    leave: { height: `0vh`, opacity: 0 },
    config: { tension: 240, mass: 1, friction: 26, clamp: true, velocity: 1 },
    onRest: () => handleScroll()
  });

  const fadeContent = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 170, mass: 1, friction: 46, clamp: true }
  });

  const fadeOnHide = useSpring({
    opacity:
      isVideoSectionOpen || isSimilarSectionOpen || isMoreInfoOpen ? 0 : 1,
    config: { tension: 160, mass: 1, friction: 46, clamp: true }
  });

  const [videoActive, setVideoActive] = useState<boolean>(false);

  // set video event to state to access later
  const onReady = (event: any): void => {
    const player = event.target;
    setVideoPlayer(player);
    setVideoActive(videoActive => !videoActive);
  };

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
      showinfo: 0
    }
  };

  // resets values on modal when another locandina is clicked
  const resetModalsOnLocChange = (): void => {
    openVideoSectionRequest(false);
    openSimilarSectionRequest(false);
    openMoreInfoRequest(false);
  };
  useEffect(() => {
    resetModalsOnLocChange();
    return () => resetModalsOnLocChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // closes modal
  const handleHighlightToggle = (): void => {
    openMovieModalRequest(false);
  };

  const handleVolume = (): void => {
    setToggleMute(toggleMute => !toggleMute);
    if (toggleMute) {
      videoPlayer.unMute();
    } else {
      videoPlayer.mute();
    }
  };

  // pause video if any of the other modal panels are open
  // unpause when the are closed
  useEffect(() => {
    if (videoPlayer !== undefined) {
      if (isMovieModalOpen) {
        isVideoSectionOpen || isSimilarSectionOpen || isMoreInfoOpen
          ? videoPlayer.pauseVideo()
          : videoPlayer.playVideo();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoSectionOpen, isSimilarSectionOpen, isMoreInfoOpen, videoPlayer]);


  const handlePlay = (): void => {
    setTogglePlayer(togglePlayer => !togglePlayer);
    if (togglePlayer) {
      videoPlayer.playVideo();
    } else {
      videoPlayer.pauseVideo();
    }
  };

  const handleOtherVideos = (): void => {
    openVideoSectionRequest(true);
    if (togglePlayer) {
      setTogglePlayer(togglePlayer => !togglePlayer);
      videoPlayer.pauseVideo();
    }
  };

  const handleRelated = (): void => {
    openSimilarSectionRequest(true);
    if (togglePlayer) {
      setTogglePlayer(togglePlayer => !togglePlayer);
      videoPlayer.pauseVideo();
    }
  };

  const handleInfo = (id: number): void => {
    openMoreInfoRequest(true);
    getCastRequest(id);
    if (togglePlayer) {
      setTogglePlayer(togglePlayer => !togglePlayer);
      videoPlayer.pauseVideo();
    }
  };

  /**
 * checks if favorite item exist in state and adds or remove it depending on status
 * @param {number} id - data for the Action
 * @param {string} poster - data for the Action
 * @param {number} genreId - data for the Action
 * @param {string} title - data for the Action
 */
  const handleMovieFavs = (
    id: number,
    poster: string,
    genreId: number,
    title: string
  ) => {
    favMovies.length === 0 &&
      getMovieFavoriteRequest({ id, poster, genreId, title });

    if (favMovies.length !== 0) {
      let removedID: boolean = false;
      // eslint-disable-next-line array-callback-return
      favMovies.map((item, i) => {
        if (!removedID) {
          if (item.id === id) {
            removeFavMovieRequest(id, genreId);
            removedID = true;
          } else {
            i + 1 === favMovies.length &&
              getMovieFavoriteRequest({ id, poster, genreId, title });
          }
        }
      });
    }
  }

  /**
 * checks if favorite item exist in state and adds or remove it depending on status
 * @param {number} id - data for the Action
 * @param {string} poster - data for the Action
 * @param {number} genreId - data for the Action
 * @param {string} title - data for the Action
 */
  const handleSerieFavs = (
    id: number,
    poster: string,
    genreId: number,
    name: string
  ): void => {
    favSeries.length === 0 &&
      getSerieFavoriteRequest({ id, poster, genreId, name });

    if (favSeries.length !== 0) {
      let removedID: boolean = false;
      // eslint-disable-next-line array-callback-return
      favSeries.map((item, i) => {
        if (!removedID) {
          if (item.id === id) {
            removeFavSerieRequest(id, genreId);
            removedID = true;
          } else {
            i + 1 === favSeries.length &&
              getSerieFavoriteRequest({ id, poster, genreId, name });
          }
        }
      });
    }
  }

  /**
   * checks if item is already in favorites and renderes right button/heart element
   * @param {number} id 
   * @returns {JSX.Element} - Right element to render
   */
  const haandleFavMovieImg = (id: number): JSX.Element | null => {
    let itemIdM: Array<number> = [];
    let itemIdS: Array<number> = [];
    // eslint-disable-next-line array-callback-return
    favMovies.map(item => {
      itemIdM.push(item.id);
    });

    // eslint-disable-next-line array-callback-return
    favSeries.map(item => {
      itemIdS.push(item.id);
    });

    if (isUserSignedIn) {
      if (isMovieCatSelected) {
        if (itemIdM.includes(id)) {
          return (
            <button onClick={() =>
              handleMovieFavs(id, backdrop_path, genres[0].id, title)}
              data-test="remove-cta">
              <span>Remove from list</span>
            </button>
          )
        } else {
          return (
            <button onClick={() =>
              handleMovieFavs(id, backdrop_path, genres[0].id, title)}
              data-test="add-cta">
              <span>Add to list</span>
            </button>
          )
        }
      } else {
        if (itemIdS.includes(id)) {
          return (
            <button onClick={() =>
              handleSerieFavs(serieInfo.id, serieInfo.backdrop_path, serieInfo.genres[0].id, serieInfo.name)}
              data-test="remove-cta-serie">
              <span>Remove from list</span>
            </button>
          )
        } else {
          return (
            <button onClick={() =>
              handleSerieFavs(serieInfo.id, serieInfo.backdrop_path, serieInfo.genres[0].id, serieInfo.name)}
              data-test="add-cta-serie">
              <span>Add to list</span>
            </button>
          )
        }
      }
    } else {
      return null
    }
  }


  const { tagline, genres } = movieInfo;
  const movieVid: string = get(movieInfo, 'videos.results[0].key', '');
  const serieVid: string = get(serieInfo, 'videos.results[0].key', '');

  return (
    <div className="item-modal" ref={ref} data-test="component-modal">
      {transitionMount.map(
        ({ item, key, props }) =>
          item && (
            <a.div
              key={key}
              className="modal-outer"
              style={{
                backgroundImage: `url(${URL + backdrop_path})`,
                ...props
              }}
            >
              <a.div
                className="modal-content"
                style={{ ...fadeContent, ...fadeOnHide }}
              >

                <CatchAll>
                  <YouTube
                    videoId={isMovieCatSelected ? movieVid : serieVid}
                    className={`video ${videoActive ? 'fadein' : null}`}
                    containerClassName="video-container"
                    // @ts-ignore
                    opts={Options}
                    onReady={onReady}
                  />
                </CatchAll>


                <div className="info-wrapper-modal">
                  <div className="sizer">
                    <div className="info-inner">
                      <h3 data-test="modal-title">{title}</h3>
                      <h5>{isMovieCatSelected && tagline}</h5>
                      <Scrollbar
                        noDefaultStyles
                        momentum={true}
                        style={{ height: _WW }}
                      >
                        <p data-test="modal-overview">{overview}</p>
                      </Scrollbar>
                      <div className="modal-genres">
                        {genres &&
                          genres.map(({ id, name }) => (
                            <p key={id}>{name}</p>
                          ))}
                      </div>
                      <div className="cta">
                        {haandleFavMovieImg(id)}
                      </div>
                      <div className="rel">
                        {(movieInfo.videos &&
                          movieInfo.videos.results.length < 1) ||
                          (serieInfo.videos &&
                            serieInfo.videos.results.length < 1) ? null : (
                            <button
                              onClick={handleOtherVideos}
                              data-test="videosBtn"
                            >
                              Videos
                            </button>
                          )}
                        {(movieInfo.similar &&
                          movieInfo.similar.results.length < 1) ||
                          (serieInfo.similar &&
                            serieInfo.similar.results.length < 1) ? null : (
                            <button
                              onClick={handleRelated}
                              data-test="relatedBtn"
                            >
                              Related Movies
                            </button>
                          )}
                        <button
                          onClick={() => handleInfo(id)}
                          data-test="infoBtn"
                        >
                          Other info
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a.div>
              <div className="close" onClick={handleHighlightToggle}>
                <img src={String(IMG.close)} alt="close modal" />
              </div>
              <div className="mute" onClick={handleVolume}>
                <img
                  src={toggleMute ? String(IMG.volume) : String(IMG.mute)}
                  alt="volume mute button"
                />
              </div>
              <div className="pause" onClick={handlePlay}>
                <img
                  src={
                    togglePlayer ||
                      isVideoSectionOpen ||
                      isSimilarSectionOpen ||
                      isMoreInfoOpen
                      ? String(IMG.play)
                      : String(IMG.pause)
                  }
                  alt="pplay pause button"
                />
              </div>

              <Transition
                items={isVideoSectionOpen}
                from={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0%, 0, 0)' }}
                leave={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}
              >
                {isVideoSectionOpen =>
                  isVideoSectionOpen &&
                  (props => (
                    <CatchAll>
                      <RelatedItems
                        videos={
                          isMovieCatSelected
                            ? movieInfo.videos
                            : serieInfo.videos
                        }
                        animation={props}
                        data-test="related-modal"
                      />
                    </CatchAll>
                  ))
                }
              </Transition>

              <Transition
                items={isSimilarSectionOpen}
                from={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0%, 0, 0)' }}
                leave={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}
              >
                {isSimilarSectionOpen =>
                  isSimilarSectionOpen &&
                  (props => (
                    <CatchAll>
                      <Similars
                        videos={
                          isMovieCatSelected
                            ? movieInfo.similar
                            : serieInfo.similar
                        }
                        animation={props}
                        data-test="similar-modal"
                      />
                    </CatchAll>
                  ))
                }
              </Transition>

              <Transition
                items={isMoreInfoOpen}
                from={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0%, 0, 0)' }}
                leave={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}
              >
                {isMoreInfoOpen =>
                  isMoreInfoOpen &&
                  (props => (
                    <CatchAll>
                      <MoreInfo
                        info={isMovieCatSelected ? movieInfo : serieInfo}
                        animation={props}
                        data-test="moreInfo-modal"
                      />
                    </CatchAll>
                  ))
                }
              </Transition>
            </a.div>
          )
      )}
    </div>
  );
}
);

const mapStateToProps = (state: any) => {
  return {
    isMovieModalOpen: state.uiReducer.isMovieModalOpen,
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    movieInfo: state.moviesReducer.movieInfo,
    serieInfo: state.seriesReducer.serieInfo,
    isVideoSectionOpen: state.uiReducer.isVideoSectionOpen,
    isSimilarSectionOpen: state.uiReducer.isSimilarSectionOpen,
    isMoreInfoOpen: state.uiReducer.isMoreInfoOpen,
    favMovies: state.moviesReducer.favMovies,
    favSeries: state.seriesReducer.favSeries,
    isUserSignedIn: state.awsReducer.isUserSignedIn
  };
};

export default connect(
  mapStateToProps,
  {
    openMovieModalRequest,
    getMovieInfoRequest,
    getSerieInfoRequest,
    openVideoSectionRequest,
    openSimilarSectionRequest,
    openMoreInfoRequest,
    getCastRequest,
    getMovieFavoriteRequest,
    getSerieFavoriteRequest,
    removeFavMovieRequest,
    removeFavSerieRequest
  }
)(UnconnectedMovieModal);
