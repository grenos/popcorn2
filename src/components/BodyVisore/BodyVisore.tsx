import React, { useEffect, useState } from 'react'
import * as INT from '../../helpers/interfaces'
import { connect } from 'react-redux'
import popcorn from '../../media/img/popcorn.png'
import { filterNoImg } from '../../helpers/helperFunctions'
import { getBodyVisoreMovieInfoReq, getBodyVisoreSerieInfoReq } from '../../redux/actions/apiActions'
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
  isMovieCatSelected: boolean
  movie_body_visore_info: any
}


const BodyVisore = ({
  id,
  backdrop_path,
  title,
  overview,
  getBodyVisoreMovieInfoReq,
  isMovieCatSelected,
  movie_body_visore_info
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
  const [togglePlayer, setTogglePlayer] = useState<boolean>(false)
  const [toggleMute, setToggleMute] = useState<boolean>(false)
  // const [videoActive, setVideoActive] = useState<boolean>(false);
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


  const handleOnClick = (id: number) => {
    // maybe better to use cta?
    console.log('this click will send to modal');
  }


  const handlePrintVideo = (id: number, movie_body_visore_info: any): any => {
    let print: any
    movie_body_visore_info.map((item: any) => {
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



  return (
    <div
      className={inView ? 'last-item-wrapper' : 'last-item-wrapper show'}
      key={id}
      ref={ref}
      style={{ backgroundImage: `url(${filterNoImg(URLBG, backdrop_path, popcorn)})` }}>

      <div className="overlay-handler"
        onMouseEnter={() => handleHover(id)}
        onMouseLeave={() => handleHover(id)}
        onClick={() => handleOnClick(id)}>
      </div>

      <div className={
        activeHover === id
          && toggleHover
          ? 'last-item__video-wrapper active'
          : 'last-item__video-wrapper'}>
        {handlePrintVideo(id, movie_body_visore_info)}
      </div>

      <div className="last-item__info-wrapper">
        <h1 className="last-item__title">{title}</h1>
        <p className="last-item__overview">{overview}</p>
      </div>

    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    movie_body_visore_info: state.bodyVisoreReducer.movie_body_visore_info
  }
}

export default connect(mapStateToProps, {
  getBodyVisoreMovieInfoReq
})(BodyVisore)


