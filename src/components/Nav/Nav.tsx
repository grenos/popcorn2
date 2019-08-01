import React from 'react'
import { useSpring, animated } from 'react-spring'
import SearchInput from '../SearchInput/SearchInput'
import NavToggle from '../NavToggle/NavToggle'
import * as INT from '../../helpers/interfaces'
import logo from '../../media/img/logo.png'
import useWindowSize from '@rehooks/window-size';

const Nav: React.FC<INT.IScrollProps> = ({ scrolled }): JSX.Element => {

  let ww = useWindowSize();

  const animateHeader = useSpring<INT.IAnimateHeader>({
    background: scrolled > 30
      ? 'rgba(0, 0, 0, 1)'
      : 'rgba(0, 0, 0, 0)',
    boxShadow: scrolled > 30
      ? '0px 0px 10px 20px rgba(0, 0, 0, 1)'
      : '0px 0px 10px 20px rgba(0, 0, 0, 0)'
  })

  const animateHeaderHeight = useSpring<INT.IAnimateHeaderHeight>({
    height: scrolled > 30
      ? 50
      : 90,
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
      style={
        ww.innerWidth > 668
          ? animateHeader
          : animateHeaderHeight
      }
      data-test="component-nav"
    >
      <div className="nav__type-toggle-container" >
        <NavToggle />
      </div>

      {(ww.innerWidth > 668) && <animated.div
        className="nav__logo"
        data-test="nav-logo">
        <img
          src={logo} alt="logo"
          className="nav__img"
        />
      </animated.div>}

      <div className="nav__search-inp">
        <SearchInput scrolled={scrolled} />
      </div>
    </animated.div >
  )
}

export default Nav
