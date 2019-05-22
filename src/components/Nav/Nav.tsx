import React from 'react'
import logo from '../../media/img/logo.png'
import { useSpring, animated } from 'react-spring'
import SearchInput from '../SearchInput/SearchImput'
import * as INT from '../../helpers/interfaces'




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

  const animateImg = useSpring<INT.IAnimateImg>({
    width: scrolled > 20 ? `240px` : `320px`,
    marginTop: scrolled > 20 ? `30px` : `100px`,
    transform: scrolled > 20 ? 'rotate(0deg)' : 'rotate(15deg)',
    opacity: scrolled > 20 ? .6 : .4
  })

  return (
    <animated.div className="nav" style={animateHeader} data-test="component-nav">
      <div className="nav__type-toggle">
        <h3>placeholder</h3>
      </div>
      <div className="nav__logo">
        <animated.img
          data-test="nav-logo"
          src={logo} alt="logo"
          className="nav__img"
          style={animateImg} />
      </div>

      <div className="nav__search-inp">
        <SearchInput scrolled={scrolled} />
      </div>
    </animated.div>
  )
}

export default Nav
