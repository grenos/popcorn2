import React, { useEffect, useState } from 'react'
import * as INT from '../../helpers/interfaces'
import { connect } from 'react-redux'
import popcorn from '../../media/img/popcorn.png'
import { filterNoImg } from '../../helpers/helperFunctions'
import {
  getBodyVisoreMovieInfoReq,
  getBodyVisoreSerieInfoReq,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  getMovieFavoriteRequest,
  removeFavMovieRequest,
  getSerieFavoriteRequest,
  removeFavSerieRequest,
} from '../../redux/actions/apiActions'
import { relatedMovieSelected, openMovieModalRequest } from '../../redux/actions/uiActions'
import YouTube from 'react-youtube';
import get from 'lodash.get';
import { useInView } from 'react-intersection-observer'
import useWindowSize from '@rehooks/window-size'

const URLBG = 'https://image.tmdb.org/t/p/original'


/**
 * BodyVisore Component
 * @function
 * @param {number} id - passed from parent (id of each visore when loaded)
 * @param {stringList} backdrop_path - passed from parent
 * @param {string} title - passed from parent
 * @param {string} overview - passed from parent
 * @param {function} getBodyVisoreMovieInfoReq - Action to get more item info (Api Call)
 * @param {function} getBodyVisoreSerieInfoReq - Action to get more item info (Api Call)
 * @param {function} getMovieInfoModalRequest - Opens title page - ACTION
 * @param {function} getSerieInfoModalRequest - Opens title page - ACTION
 * @param {boolean} isMovieCatSelected 
 * @param {boolean} relatedMovieSelected - Is used to sseperate which info to use for Title Page
 * @param {array} movie_body_visore_info - body visore item info (happens on top items component)
 * @param {array} serie_body_visore_info - body visore item info (happens on top items component)
 * @param {array} genre_ids - genre ids of current BodyVisore
 * @param {function} getMovieFavoriteRequest - add to facorites
 * @param {function} removeFavMovieRequest - remove from favorites
 * @param {function} getSerieFavoriteRequest - add to facorites
 * @param {function} removeFavSerieRequest - remove from favorites
 * @param {array} favMovies - array to compare favorites (for add to list button)
 * @param {array} favSeries - rray to compare favorites (for add to list button)
 * @param {boolean} isUserSignedIn - to check if should render button
 * @returns {JSX.Element}
 */

const BodyVisore: React.FC<INT.IBodyVisore> = ({
  id,
  backdrop_path,
  title,
  overview,
  getBodyVisoreMovieInfoReq,
  getBodyVisoreSerieInfoReq,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  isMovieCatSelected,
  relatedMovieSelected,
  movie_body_visore_info,
  serie_body_visore_info,
  genre_ids,
  getMovieFavoriteRequest,
  removeFavMovieRequest,
  getSerieFavoriteRequest,
  removeFavSerieRequest,
  favMovies,
  favSeries,
  isUserSignedIn,
  openMovieModalRequest
}): JSX.Element => {

  let ww = useWindowSize();

  // checks when visore is on screen for animation
  const [ref, inView] = useInView({
    threshold: 0.2,
  })

  // calls api on load to get more info on video
  useEffect(() => {
    if (isMovieCatSelected) {
      getBodyVisoreMovieInfoReq(id)
    } else {
      getBodyVisoreSerieInfoReq(id)
    }
  }, [isMovieCatSelected, getBodyVisoreMovieInfoReq, getBodyVisoreSerieInfoReq, id])


  const [videoPlayer, setVideoPlayer] = useState()
  const [activeHover, setActiveHover] = useState<number>(0);
  const [toggleHover, setToggleHover] = useState<boolean>(false);



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
  }

  // set video event to state to access later
  const onReady = (event: any): void => {
    const player = event.target
    setVideoPlayer(player)
  }

  // set actual hovered visore id on state to
  const handleHover = (id: number) => {
    setActiveHover(id)
    setToggleHover(toggleHover => !toggleHover)
    handleVideoStatus(id)
  }

  // select correct visore on hover
  const handleVideoStatus = (id: number) => {
    if (activeHover === id && toggleHover) {
      if (videoPlayer !== undefined) {
        videoPlayer.pauseVideo()
        videoPlayer.mute()
      }
    } else {
      if (videoPlayer !== undefined) {
        videoPlayer.playVideo()
        videoPlayer.unMute()
        ww.innerWidth > 1023 && openMovieModalRequest(false)
      }
    }
  }

  // do on load
  useEffect(() => {
    if (videoPlayer !== undefined) {
      videoPlayer.pauseVideo()
      videoPlayer.mute()
    }
  }, [videoPlayer])


  /**
   * handlePrintVideo - prints Youtube player
   * @function
   * @param {number} id - passed down from parent (topItems)
   * @param {IMovieInfoRes} visoreInfo - IMovieInfoRes - on component load from api call
   * @returns {JSX.Element} - print variable
   */
  const handlePrintVideo = (id: number, visoreInfo: INT.IMovieInfoRes[]): any => {
    let print: any
    // eslint-disable-next-line array-callback-return
    visoreInfo.map((item: INT.IMovieInfoRes) => {
      const videoId: string = get(item, 'videos.results[0].key', '')

      if (id === item.id) {
        print = <YouTube
          videoId={videoId}
          className="last-item-video"
          containerClassName="last-item-video-container"
          // @ts-ignore
          opts={Options}
          onReady={onReady}
        />
      }
    })
    return print
  }


  /**
   * calls action to go to title page
   * @function
   * @param {number} id - passed down from parent (topItems)
   * @param {string} title - passed down from parent (topItems)
   */
  const handleGoToMovie = (id: number, title: string, ): void => {
    if (isMovieCatSelected) {
      relatedMovieSelected(true)
      getMovieInfoModalRequest(id, title)
    } else {
      relatedMovieSelected(false)
      getSerieInfoModalRequest(id, title)
    }
    //! called from saga
    // history.push(`/title/${makeDashesUrl(title)}`)
  }


  /**
   * checks if item exists in favorites If NO adds it / if YES removes it
   * @function
   * @param {number} id 
   * @param {string} poster 
   * @param {number} genreId 
   * @param {string} title 
   */
  const handleMovieFavs = (
    id: number, poster: string, genreId: number, title: string
  ) => {
    // on first load to avoid "length of undefined"
    (favMovies.length === 0) &&
      getMovieFavoriteRequest({ id, poster, genreId, title })

    if (favMovies.length !== 0) {
      let removedID: boolean = false
      // eslint-disable-next-line array-callback-return
      favMovies.map((item: any, i: number) => {
        if (!removedID) {
          if (item.id === id) {
            removeFavMovieRequest(item.id, item.genreId)
            removedID = true
          } else {
            (i + 1 === favMovies.length) &&
              getMovieFavoriteRequest({ id, poster, genreId, title })
          }
        }
      })
    }
  }

  /**
  * checks if item exists in favorites If NO adds it / if YES removes it
  * @function
  * @param {number} id 
  * @param {string} poster 
  * @param {number} genreId 
  * @param {string} title 
  */
  const handleSerieFavs = (
    id: number, poster: string, genreId: number, name: string
  ): void => {
    // on first load to avoid "length of undefined"
    (favSeries.length === 0) &&
      getSerieFavoriteRequest({ id, poster, genreId, name })

    if (favSeries.length !== 0) {
      let removedID: boolean = false
      // eslint-disable-next-line array-callback-return
      favSeries.map((item: any, i: number) => {
        if (!removedID) {
          if (item.id === id) {
            removeFavSerieRequest(item.id, item.genreId)
            removedID = true
          } else {
            (i + 1 === favSeries.length) &&
              getSerieFavoriteRequest({ id, poster, genreId, name })
          }
        }
      })
    }
  }



  /**
  * Checks if passed id exists on favorites array 
  * @function
  * @param {number} id
  * @param {string} backdrop_path
  * @param {Array} genre_ids
  * @param {array} rest - movie title and serie name
  * @returns {(JSX.Element | null)} - Returns correct element depending on user status (signin)
  */
  const haandleFavMovieImg = (
    id: number, backdrop_path: string, genre_ids: Array<number>, ...rest: Array<string>
  ) => {
    let itemIdM: Array<number> = []
    let itemIdS: Array<number> = []
    // eslint-disable-next-line array-callback-return
    favMovies.map((item: INT.IFavMovie) => {
      itemIdM.push(item.id);
    })

    // eslint-disable-next-line array-callback-return
    favSeries.map((item: INT.IFavMovie) => {
      itemIdS.push(item.id);
    })

    if (isUserSignedIn) {
      if (isMovieCatSelected) {
        if (itemIdM.includes(id)) {
          return (
            <button
              onClick={() => handleMovieFavs(id, backdrop_path, genre_ids[0], rest[0])}>
              <span>Remove from list</span>
            </button>
          )
        } else {
          return (
            <button
              onClick={() => handleMovieFavs(id, backdrop_path, genre_ids[0], rest[0])}>
              <span>Add to list</span>
            </button>
          )
        }
      } else {
        if (itemIdS.includes(id)) {
          return (
            <button
              onClick={() => handleSerieFavs(id, backdrop_path, genre_ids[0], rest[0])}>
              <span>Remove from list</span>
            </button>
          )
        } else {
          return (
            <button
              onClick={() => handleSerieFavs(id, backdrop_path, genre_ids[0], rest[0])}>
              <span>Add to list</span>
            </button>
          )
        }
      }
    } else {
      return null
    }
  }



  return (
    <div
      className={inView ? 'last-item-wrapper' : 'last-item-wrapper show'}
      key={id}
      ref={ref}
      style={{ backgroundImage: `url(${filterNoImg(URLBG, backdrop_path, popcorn)})` }}>

      <div className="overlay-handler"
        onMouseEnter={() => handleHover(id)}
        onMouseLeave={() => handleHover(id)}>
        <div className="last-item__info-wrapper">
          <h1 className="last-item__title">{title}</h1>
          <p className="last-item__overview">{overview}</p>
          <div className="last-item__genres-wrapper">
            {/* eslint-disable-next-line array-callback-return */}
            {movie_body_visore_info && movie_body_visore_info.map((item: INT.IMovieInfoRes) => item.genres.map((genre: INT.IGenres, i: number) => {
              if (id === item.id) {
                return <p key={i} className="last-item__genres">{genre.name}</p>
              }
            }))}
          </div>
          <div className="last-item__cta">
            <button onClick={() => handleGoToMovie(id, title)}>
              Details
            </button>
            {haandleFavMovieImg(id, backdrop_path, genre_ids, title)}
          </div>
        </div>
      </div>

      <div className={
        activeHover === id
          && toggleHover
          ? 'last-item__video-wrapper active'
          : 'last-item__video-wrapper'}>
        {handlePrintVideo(id, isMovieCatSelected ? movie_body_visore_info : serie_body_visore_info)}
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    movie_body_visore_info: state.bodyVisoreReducer.movie_body_visore_info,
    serie_body_visore_info: state.bodyVisoreReducer.serie_body_visore_info,
    favMovies: state.moviesReducer.favMovies,
    favSeries: state.seriesReducer.favSeries,
    isUserSignedIn: state.awsReducer.isUserSignedIn,
  }
}

export default connect(mapStateToProps, {
  getBodyVisoreMovieInfoReq,
  getBodyVisoreSerieInfoReq,
  relatedMovieSelected,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  getMovieFavoriteRequest,
  removeFavMovieRequest,
  getSerieFavoriteRequest,
  removeFavSerieRequest,
  openMovieModalRequest
})(BodyVisore)


