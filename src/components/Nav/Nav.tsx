import React from 'react'
import { useSpring, animated } from 'react-spring'
import SearchInput from '../SearchInput/SearchImput'
import * as INT from '../../helpers/interfaces'
import logo from '../../media/img/logo.png'
import tele from '../../media/img/television.png'
import film from '../../media/img/film.png'



const Nav: React.FC<INT.IScrollProps> = ({ scrolled }): JSX.Element => {

  const animateHeader = useSpring<INT.IAnimateHeader>({
    height: scrolled > 20 ? `50px` : `90px`,
    background: scrolled > 20
      ? 'rgba(0, 0, 0, 0.6)'
      : 'rgba(0, 0, 0, .2)',
    boxShadow: scrolled > 20
      ? '0px 0px 10px 20px rgba(0, 0, 0, 0.6)'
      : '0px 0px 10px 20px rgba(0, 0, 0, 0.2)'
  })

  const animateImg = useSpring<INT.IAnimateLogo>({
    transform: scrolled > 20 ? 'scale(0.7)' : 'scale(1)',
    opacity: scrolled > 20 ? .6 : .4
  })

  const animateToggle = useSpring<INT.IAnimateToggle>({
    transform: scrolled > 20
      ? 'scale(1) translateX(15%)'
      : 'scale(0.8) translateX(-100%)',
  })

  return (
    <animated.div
      className="nav"
      style={animateHeader}
      data-test="component-nav"
    >
      <animated.div
        className="nav__type-toggle"
        data-test="nav-toggle"
        style={animateToggle}
      >
        <img src={film} alt="movies" className="toggle__img--film" />
        <img src={tele} alt="series" className="toggle__img--tele" />
      </animated.div>
      <animated.div className="nav__logo" style={animateImg} data-test="nav-logo">
        <img
          src={logo} alt="logo"
          className="nav__img"
        />
      </animated.div>

      <div className="nav__search-inp">
        <SearchInput scrolled={scrolled} />
      </div>
    </animated.div >
  )
}

export default Nav
