import React from 'react'
import Carousel from 'nuka-carousel';
import YouTube from 'react-youtube';
import * as INT from '../../helpers/interfaces'
import get from 'lodash.get'


const RelatedItems = ({ videos }: any) => {

  const Options = {
    // @ts-ignore
    // height: '65vh',
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

  if (videos === undefined) {
    return null
  } else {
    return (
      <Carousel>
         {videos.results.map((video: any, ) => (
          <div className="wrapper" key={video.id}>
            <YouTube
              videoId={video.key}
              className="video"
              containerClassName="video-container"
              // @ts-ignore
              opts={Options}
            />
          </div>
        ))} 
      </Carousel>
    )
  }

}

export default RelatedItems
