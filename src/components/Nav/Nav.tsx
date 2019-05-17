import React, { useState, useEffect } from 'react'
import logo from '../../media/img/logo.png'
import { useSpring, animated } from 'react-spring'

interface animateImg {
  width: number | string,
  marginTop: number | string,
  transform: number | string
}
interface animateHeader {
  height: number | string
}


const Nav: React.FC = () => {

  const [scrolled, setScrolled] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return function cleanup() {
      window.removeEventListener('scroll', listenToScroll)
    };
  });

  const listenToScroll = () => {
    const scrolled: number = document.body.scrollTop || document.documentElement.scrollTop
    setScrolled(scrolled)
  }

  const animateHeader = useSpring<animateHeader>({
    height: scrolled > 20 ? `50px` : `90px`,
  })

  const animateImg = useSpring<animateImg>({
    width: scrolled > 20 ? `240px` : `320px`,
    marginTop: scrolled > 20 ? `30px` : `100px`,
    transform: scrolled > 20 ? 'rotate(0deg)' : 'rotate(15deg)',
  })

  return (
    <animated.div className="nav" style={animateHeader}>
      <animated.img
        src={logo} alt="logo"
        className="nav__img"
        style={animateImg} />
    </animated.div>
  )
}

export default Nav
