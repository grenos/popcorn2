import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { connect } from 'react-redux'
import { getToggleMenuRequest } from '../../redux/actions/uiActions'
import chevron from '../../media/img/chevron.png'
import * as INT from '../../helpers/interfaces'


export const UnconnectedMenuToggle: React.FC<INT.IToggleMenuProps> = ({
  getToggleMenuRequest }): JSX.Element => {

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    getToggleMenuRequest(isMenuOpen)
  }, [getToggleMenuRequest, isMenuOpen])

  const btnAnimation = useSpring<INT.IAnimateToggle>({
    transform: isMenuOpen
      ? `translate3d(300px,0,0)`
      : `translate3d(0px,0,0)`
  });

  const imgAnimation = useSpring<INT.IAnimateToggle>({
    transform: isMenuOpen
      ? `rotate(0deg)`
      : `rotate(540deg)`
  });

  const makeBoolGlobal = (): void => {
    setMenuOpen(isMenuOpen => !isMenuOpen)
  }

  return (
    <a.button
      data-test="button-toggle"
      className="menu-button"
      onClick={makeBoolGlobal}
      style={btnAnimation}
      type="button"
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


