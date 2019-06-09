import React from 'react'
import { useSpring, animated } from 'react-spring'
import { connect } from 'react-redux'
import { getToggleMovieCatRequest, getToggleSerieCatRequest } from '../../redux/actions/uiActions'
import * as INT from '../../helpers/interfaces'
import tele from '../../media/img/television.png'
import film from '../../media/img/film.png'


export const UnconnectedNavToggle: React.FC<INT.IToggleProps> = ({
  scrolled,
  getToggleMovieCatRequest,
  getToggleSerieCatRequest
}): JSX.Element => {

  const animateToggle = useSpring<INT.IAnimateToggle>({
    transform: scrolled > 20
      ? 'scale(1) translateX(70%)'
      : 'scale(0.8) translateX(-120%)',
  })

  const handleMoviesToggle = (): void => {
    getToggleMovieCatRequest(true)
    getToggleSerieCatRequest(false)
  }

  const handleSeriesToggle = (): void => {
    getToggleSerieCatRequest(true)
    getToggleMovieCatRequest(false)
  }

  return (
    <animated.div
      className="nav__type-toggle"
      data-test="nav-toggle"
      style={animateToggle}
    >
      <img src={film}
        alt="movies"
        data-test='toggle-film'
        className="toggle__img--film"
        onClick={handleMoviesToggle}
      />
      <img src={tele}
        alt="series"
        data-test='toggle-serie'
        className="toggle__img--tele"
        onClick={handleSeriesToggle}
      />
    </animated.div>

  )
}

export default connect(null, {
  getToggleMovieCatRequest,
  getToggleSerieCatRequest
})(UnconnectedNavToggle)

