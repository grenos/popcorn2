import React from 'react';
import { connect } from 'react-redux'
import { useSpring, animated as a } from 'react-spring';
import { getToggleMenuRequest } from '../../redux/actions/uiActions'
import chevron from '../../media/img/chevron.png'
import * as INT from '../../helpers/interfaces'
import useWindowSize from '@rehooks/window-size';

/**
 * slide menu toggler
 * @param {function} getToggleMenuRequest - sets true/false Action
 * @param {bool} isMenuOpenProp gets true/false Action
 */
export const UnconnectedMenuToggle: React.FC<INT.IToggleMenuProps> = ({
  getToggleMenuRequest, isMenuOpenProp }): JSX.Element => {

  let ww = useWindowSize();

  const btnAnimationDesk = useSpring<INT.IAnimateToggle>({
    transform: isMenuOpenProp
      ? `translate3d(200px,0,0)`
      : `translate3d(0px,0,0)`
  })

  const btnAnimationMob = useSpring<INT.IAnimateToggle>({
    transform: isMenuOpenProp
      ? `translate3d(280px,0,0)`
      : `translate3d(0px,0,0)`
  })

  const imgAnimation = useSpring<INT.IAnimateToggle>({
    transform: isMenuOpenProp
      ? `rotate(0deg)`
      : `rotate(540deg)`
  })

  const makeBoolGlobal = (): void => {
    getToggleMenuRequest()
  }

  return (
    <a.button
      data-test="button-toggle"
      className="menu-button"
      onClick={makeBoolGlobal}
      style={
        ww.innerWidth > 668
          ? btnAnimationDesk
          : btnAnimationMob
      }
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

const mapStateToProps = (state: any) => {
  return {
    isMenuOpenProp: state.uiReducer.isMenuOpenProp,
  }
}


export default connect(mapStateToProps, {
  getToggleMenuRequest,
})(UnconnectedMenuToggle)