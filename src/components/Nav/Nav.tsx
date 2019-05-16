import React, { useState, useEffect } from 'react'
import logo from '../../media/img/logo.png'
import { Waypoint } from 'react-waypoint'
import { useSpring, animated, config } from 'react-spring'


const Nav = () => {

  const [scroll, useScroll] = useState();

  return (
    <div className="nav">
      <img src={logo} alt="logo" className="nav__img" />
    </div>
  )
}



export default Nav
