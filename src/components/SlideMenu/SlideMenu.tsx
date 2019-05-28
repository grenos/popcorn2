import React, { useState, useEffect } from 'react'
import { useSpring, animated as a } from 'react-spring';

const SlideMenu = ({ isNavOpen }: any) => {

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }
  }, [isNavOpen]);

  const menuAnimation = useSpring({
    transform: isNavOpen
      ? `translate3d(0,0,0)`
      : `translate3d(-100%,0,0)`
  })

  return (
    <a.div className="nav-wrapper" style={menuAnimation}>
      <a.div className="nav-list">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Store</a>
        <a href="#">Tutorials</a>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Store</a>
        <a href="#">Tutorials</a>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Store</a>
        <a href="#">Tutorials</a>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Store</a>
        <a href="#">Tutorials</a>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Store</a>
        <a href="#">Tutorials</a>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Store</a>
        <a href="#">Tutorials</a>
      </a.div>
    </a.div>
  )
}

export default SlideMenu
