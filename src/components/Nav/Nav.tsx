import React from 'react'
import { useSpring, animated } from 'react-spring'
import SearchInput from '../SearchInput/SearchImput'
import NavToggle from '../NavToggle/NavToggle'
import * as INT from '../../helpers/interfaces'
import logo from '../../media/img/logo.png'


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

  return (
    <animated.div
      className="nav"
      style={animateHeader}
      data-test="component-nav"
    >
      <div className="nav__type-toggle-container" >
        <NavToggle scrolled={scrolled} />
      </div>

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
