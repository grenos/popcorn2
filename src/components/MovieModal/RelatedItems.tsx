import React from 'react'
import { connect } from 'react-redux'
import Carousel from 'nuka-carousel';
import YouTube from 'react-youtube';
import * as INT from '../../helpers/interfaces'
import { openVideoSectionRequest } from '../../redux/actions/uiActions'
import close from '../../media/img/close.png'
import { useCssClass } from '../../helpers/hooks'

export const UnconnectedRelatedItems = ({ videos, openVideoSectionRequest, animation }: INT.IRelatedVidProps): JSX.Element | null => {

  const Options = {
    // @ts-ignore
    playerVars: {
      autoplay: 0,
      cc_load_policy: 0,
      disablekb: 1,
      origin: 'http://localhost:3000/',
      enablejsapi: 1,
      fs: 1,
      iv_load_policy: 3,
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

  const { CssClass } = useCssClass(videos.results.length)

  const handleCloseVideo = (): void => {
    openVideoSectionRequest(false)
  }


  if (videos === undefined) {
    return null
  } else if (videos.results.length < 4) {
    return (
      <div className="thumb-wrapper-no-slider" style={animation} data-test="component-related">
        {videos.results.slice(0, 6).map(({ id, key, name }) => (
          <div key={id} className="thumb-inner-no-slider">
            <YouTube
              videoId={key}
              className={CssClass}
              containerClassName="thumb-container-no-slider"
              // @ts-ignore
              opts={Options}
            />
            <p className="thumb-info-no-slider">{name}</p>
          </div>
        ))}
        <div className="close" onClick={handleCloseVideo}>
          <img src={close} alt="close" />
        </div>
      </div>
    )
  } else {
    return (
      <div className="thumb-wrapper" style={animation} data-test="component-related">
        <Carousel {...params}>
          {videos.results.slice(0, 6).map(({ id, key, name }) => (
            <div key={id} className="thumb-inner">
              <YouTube
                videoId={key}
                className="thumb"
                containerClassName="thumb-container"
                // @ts-ignore
                opts={Options}
              />
              <p className="thumb-info">{name}</p>
            </div>
          ))}
        </Carousel>
        <div className="close" onClick={handleCloseVideo}>
          <img src={close} alt="close" />
        </div>
      </div>
    )
  }

}


export default connect(null, {
  openVideoSectionRequest
})(UnconnectedRelatedItems)


