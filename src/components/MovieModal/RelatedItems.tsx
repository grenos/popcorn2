import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Carousel from 'nuka-carousel';
import YouTube from 'react-youtube';
import * as INT from '../../helpers/interfaces'
import { openVideoSectionRequest } from '../../redux/actions/uiActions'
import IMG from '../../media/img/index'
import { useCssClass } from '../../helpers/hooks'
import useWindowSize from '@rehooks/window-size';

/**
 * related videos modal panel
 * @function
 * @param {array} videos - similar videos passed from parent
 * @param {function} openVideoSectionRequest - Action used to close panel
 * @param {object} animation object with animation passed from parent 
 */
export const UnconnectedRelatedItems = ({ videos, openVideoSectionRequest, animation }: INT.IRelatedVidProps): JSX.Element | null => {

  let ww = useWindowSize();
  const [slides, setSlides] = useState<number>(0)
  const [drag, setDrag] = useState<boolean>(false)
  const [swipe, setSwipe] = useState<boolean>(false)

  // set number of slides depending on window width
  useEffect(() => {
    if (ww.innerWidth <= 1024) {
      setSlides(1)
      setDrag(true)
      setSwipe(true)
    } else {
      setSlides(3)
      setDrag(false)
      setSwipe(false)
    }
  }, [ww.innerWidth])


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
    dragging: drag,
    swiping: swipe,
    slidesToShow: slides || 1,
    slidesToScroll: slides || 1,
    height: '100%',
    width: '100%',
  }

  // custom hook - change class name depending on videos array length
  const { CssClass } = useCssClass(videos.results.length)

  const handleCloseVideo = (): void => {
    openVideoSectionRequest(false)
  }

  // if videos is less than 4 use flex else use carousel plugin
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
          <img src={String(IMG.close)} alt="close" />
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
          <img src={String(IMG.close)} alt="close" />
        </div>
      </div>
    )
  }

}


export default connect(null, {
  openVideoSectionRequest
})(UnconnectedRelatedItems)


