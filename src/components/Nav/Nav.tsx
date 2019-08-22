import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import SearchInput from '../SearchInput/SearchInput'
import NavToggle from '../NavToggle/NavToggle'
import * as INT from '../../helpers/interfaces'
import IMG from '../../media/img/index'
import useWindowSize from '@rehooks/window-size';


/**
 * nav component hides some of its elements based on pathname and window width
 * @function
 * @param {number} scrolled - passed from parent (App)
 * @param {object} location - passed from Router to get current location
 */
const Nav: React.FC<INT.INavProps> = ({ scrolled, location }): JSX.Element => {

  let ww = useWindowSize();
  const [showSearch, setShowSearch] = useState<boolean>(true)


  const transition = useSpring({
    transform: showSearch ? `translate3d(0%,0,0)` : `translate3d(150%,0,0)`
  })

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


  // hide search inout on favorites page
  useEffect(() => {
    if (location.pathname === '/favorites') {
      setShowSearch(false)
    } else {
      setShowSearch(true)
    }
    return () => {
      if (location.pathname === '/favorites') {
        setShowSearch(false)
      } else {
        setShowSearch(true)
      }
    }
  }, [location])

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
          src={String(IMG.logo)} alt="logo"
          className="nav__img"
        />
      </animated.div>}

      {<animated.div className="nav__search-inp" style={transition}>
        <SearchInput scrolled={scrolled} />
      </animated.div>}

    </animated.div >
  )
}

export default Nav
