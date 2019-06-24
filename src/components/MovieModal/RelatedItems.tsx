import React, { useState } from 'react'
import Carousel from 'nuka-carousel';
import YouTube from 'react-youtube';
import * as INT from '../../helpers/interfaces'
import get from 'lodash.get'
import close from '../../media/img/close.png'

const RelatedItems = ({ videos }: any) => {

  const Options = {
    // @ts-ignore
    playerVars: {
      autoplay: 0,
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

  const params = {
    dragging: false,
    swiping: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    height: '100%',
    width: '100%',
  }


  if (videos === undefined) {
    return null
  } else {
    return (
      <div className="thumb-wrapper">
        <Carousel {...params}>
          {videos.results.slice(0, 6).map((video: any, ) => (
            <div key={video.id}>
              <YouTube
                videoId={video.key}
                className="thumb"
                containerClassName="thumb-container"
                // @ts-ignore
                opts={Options}
              />
              <p className="thumb-info">{video.title}</p>
            </div>
          ))}
        </Carousel>
        <div className="close">
          <img src={close} alt="close" />
        </div>
      </div>
    )
  }

}

export default RelatedItems
