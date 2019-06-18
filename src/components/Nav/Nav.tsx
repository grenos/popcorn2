import React from 'react'
import { useSpring, animated } from 'react-spring'
import SearchInput from '../SearchInput/SearchInput'
import NavToggle from '../NavToggle/NavToggle'
import * as INT from '../../helpers/interfaces'
import logo from '../../media/img/logo.png'


const Nav: React.FC<INT.IScrollProps> = ({ scrolled }): JSX.Element => {

  const animateHeader = useSpring<INT.IAnimateHeader>({
    background: scrolled > 30
      ? 'rgba(0, 0, 0, 1)'
      : 'rgba(0, 0, 0, 0)',
    boxShadow: scrolled > 30
      ? '0px 0px 10px 20px rgba(0, 0, 0, 1)'
      : '0px 0px 10px 20px rgba(0, 0, 0, 0)'
  })

  return (
    <animated.div
      className="nav"
      style={animateHeader}
      data-test="component-nav"
    >
      <div className="nav__type-toggle-container" >
        <NavToggle />
      </div>

      <animated.div
        className="nav__logo"
        data-test="nav-logo">
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
