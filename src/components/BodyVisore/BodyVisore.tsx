import React, { useEffect, useState } from 'react'
import * as INT from '../../helpers/interfaces'
import { connect } from 'react-redux'
import popcorn from '../../media/img/popcorn.png'
import { filterNoImg } from '../../helpers/helperFunctions'
import {
  getBodyVisoreMovieInfoReq,
  getBodyVisoreSerieInfoReq,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest
} from '../../redux/actions/apiActions'
import { relatedMovieSelected } from '../../redux/actions/uiActions'
import YouTube from 'react-youtube';
import get from 'lodash.get';
import { useInView } from 'react-intersection-observer'

const URLBG = 'https://image.tmdb.org/t/p/original'

interface props {
  id: number
  backdrop_path: string
  title: string
  overview: string
  getBodyVisoreMovieInfoReq: Function
  getBodyVisoreSerieInfoReq: Function
  relatedMovieSelected: Function
  getMovieInfoModalRequest: Function
  getSerieInfoModalRequest: Function
  isMovieCatSelected: boolean
  movie_body_visore_info: any
  serie_body_visore_info: any
}

const BodyVisore = ({
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
  serie_body_visore_info
}: props) => {


  const [ref, inView] = useInView({
    threshold: 0.2,
  })


  useEffect(() => {
    if (isMovieCatSelected) {
      getBodyVisoreMovieInfoReq(id)
    } else {
      getBodyVisoreSerieInfoReq(id)
    }
  }, [isMovieCatSelected, getBodyVisoreMovieInfoReq, id])


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


    // videoPlayer.unMute();
    // videoPlayer.mute();
    // videoPlayer.pauseVideo()
    // videoPlayer.playVideo();
  }

  const handleHover = (id: number) => {
    setActiveHover(id)
    setToggleHover(toggleHover => !toggleHover)
    handleVideoStatus(id)
  }

  const handleVideoStatus = (id: number) => {
    if (activeHover === id && toggleHover) {
      videoPlayer.pauseVideo()
      videoPlayer.mute()
    } else {
      videoPlayer.playVideo()
      videoPlayer.unMute()
    }
  }


  useEffect(() => {
    if (videoPlayer !== undefined) {
      videoPlayer.pauseVideo()
      videoPlayer.mute()
    }
  }, [videoPlayer])


  const handleAddToFavs = (id: number) => {
    // maybe better to use cta?
    console.log('this click will send to modal');
  }


  const handlePrintVideo = (id: number, visoreInfo: any): any => {
    let print: any
    visoreInfo.map((item: any) => {
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
      return print
    })
    return print
  }


  const handlePrintGenres = (id: number, visoreInfo: any): any => {
    let print: any = []
    visoreInfo && visoreInfo.map((item: any) => item.genres.map((genre: any) => {
      if (id === item.id) {
        print.push(genre.name)
      }
    }
    ))
    return print
  }


  /**
   * calls action to go to title page
   * @function
   * @param id 
   * @param title 
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
  ): JSX.Element | null => {
    let itemIdM: Array<number> = []
    let itemIdS: Array<number> = []
    // eslint-disable-next-line array-callback-return
    favMovies.map(item => {
      itemIdM.push(item.id);
    })

    // eslint-disable-next-line array-callback-return
    favSeries.map(item => {
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
        onMouseLeave={() => handleHover(id)}
        onClick={() => handleAddToFavs(id)}>
        <div className="last-item__info-wrapper">
          <h1 className="last-item__title">{title}</h1>
          <p className="last-item__overview">{overview}</p>
          <div className="last-item__genres-wrapper">
            {handlePrintGenres(id, isMovieCatSelected ? movie_body_visore_info : null).map((gen: any, i: number) => (
              <p key={i} className="last-item__genres">{gen}</p>
            ))}
          </div>
          <div className="last-item__cta">
            <button onClick={() => handleGoToMovie(id, title)}>
              Details
            </button>
            {/* {haandleFavMovieImg(id, backdrop_path, genre_ids, title)} */}
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
    serie_body_visore_info: state.bodyVisoreReducer.serie_body_visore_info
  }
}

export default connect(mapStateToProps, {
  getBodyVisoreMovieInfoReq,
  getBodyVisoreSerieInfoReq,
  relatedMovieSelected,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest
})(BodyVisore)


