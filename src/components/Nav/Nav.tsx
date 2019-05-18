import React, { useState, useEffect } from 'react'
import logo from '../../media/img/logo.png'
import { useSpring, animated } from 'react-spring'
import SearchInput from '../SearchInput/SearchImput'

interface IAnimateImg {
  width: number | string,
  marginTop: number | string,
  transform: number | string,
  opacity: number
}
interface IAnimateHeader {
  height: number | string,
  background: number | string,
  boxShadow: number | string
}


const Nav: React.FC = (): JSX.Element => {

  const [scrolled, setScrolled] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return function cleanup(): void {
      window.removeEventListener('scroll', listenToScroll)
    };
  });

  const listenToScroll = (): void => {
    const scrolled: number = document.body.scrollTop ||
      document.documentElement.scrollTop
    setScrolled(scrolled)
  }

  const animateHeader = useSpring<IAnimateHeader>({
    height: scrolled > 20 ? `50px` : `90px`,
    background: scrolled > 20
      ? 'rgba(0, 0, 0, 0.6)'
      : 'rgba(0, 0, 0, .2)',
    boxShadow: scrolled > 20
      ? '0px 0px 10px 20px rgba(0, 0, 0, 0.6)'
      : '0px 0px 10px 20px rgba(0, 0, 0, 0.2)'
  })

  const animateImg = useSpring<IAnimateImg>({
    width: scrolled > 20 ? `240px` : `320px`,
    marginTop: scrolled > 20 ? `30px` : `100px`,
    transform: scrolled > 20 ? 'rotate(0deg)' : 'rotate(15deg)',
    opacity: scrolled > 20 ? .6 : .4
  })

  return (
    <animated.div className="nav" style={animateHeader} data-testid="first-child">
      <div className="nav__type-toggle">
        <h3>placeholder</h3>
      </div>
      <div className="nav__logo">
        <animated.img
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
