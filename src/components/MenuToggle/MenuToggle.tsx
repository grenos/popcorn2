import React, { useState } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { connect } from 'react-redux'
import { getToggleMenuRequest } from '../../redux/actions/uiActions'
import chevron from '../../media/img/chevron.png'


export const UnconnectedMenuToggle = ({ getToggleMenuRequest }: any) => {

  const [isMenuOpen, setMenuOpen] = useState(false);

  const btnAnimation = useSpring({
    transform: isMenuOpen
      ? `translate3d(300px,0,0)`
      : `translate3d(0px,0,0)`
  });

  const imgAnimation = useSpring({
    transform: isMenuOpen
      ? `rotate(0deg)`
      : `rotate(1980deg)`
  });

  const makeBoolGlobal = () => {
    setMenuOpen(isMenuOpen => !isMenuOpen)
    // Hack!?!? maybe 
    getToggleMenuRequest(!isMenuOpen)
  }

  return (
    <a.button
      data-test="button-toggle"
      className="menu-button"
      onClick={makeBoolGlobal}
      style={btnAnimation}
    >
      <a.img src={chevron}
        data-test="img-toggle"
        alt="Open Menu"
        style={imgAnimation}
      />
    </a.button>
  )
}

export default connect(null, {
  getToggleMenuRequest,
})(UnconnectedMenuToggle)


