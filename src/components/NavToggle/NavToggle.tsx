import React from 'react'
import { useSpring, animated } from 'react-spring'
import { connect } from 'react-redux'
import { getToggleMoviesRequest } from '../../redux/actions/apiActions'
import * as INT from '../../helpers/interfaces'
import tele from '../../media/img/television.png'
import film from '../../media/img/film.png'


export const UnconnectedNavToggle: React.FC<INT.IToggleProps> = ({ scrolled, getToggleMoviesRequest }): JSX.Element => {

  const animateToggle = useSpring<INT.IAnimateToggle>({
    transform: scrolled > 20
      ? 'scale(1) translateX(70%)'
      : 'scale(0.8) translateX(-120%)',
  })

  const handleMoviesToggle = (): void => {
    getToggleMoviesRequest(1)
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
      <img src={tele} alt="series" className="toggle__img--tele" />
    </animated.div>

  )
}

export default connect(null, { getToggleMoviesRequest })(UnconnectedNavToggle)

