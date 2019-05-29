import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { animated } from 'react-spring'
import Scrollbars from 'react-custom-scrollbars'
import * as INT from '../../helpers/interfaces'


export const UnconnectedSlideMenu: React.FC<INT.ISlideMenuProps> = ({ props, key }): JSX.Element => {

  // useEffect(() => {
  //   if (isMenuOpen) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = 'visible'
  //   }
  // }, [isMenuOpen]);

  // const menuAnimation = useSpring<INT.IAnimateMenu>({
  //   transform: isMenuOpen
  //     ? `translate3d(0,0,0)`
  //     : `translate3d(-100%,0,0)`
  // })

  // const transition = useTransition(isMenuOpen, null, {
  //   from: { transform: `translate3d(-100%,0,0)` },
  //   enter: { transform: `translate3d(0%,0,0)` },
  //   leave: { transform: `translate3d(-100%,0,0)` }
  // })

  return (
    <animated.div className="nav-wrapper" style={props} key={key}>
      <div className="nav-list-wrapper">
        <Scrollbars className="nav-list">
          <h3>test</h3>
        </Scrollbars>
      </div>
    </animated.div >
  )
}

const mapStateToProps = (state: any) => {
  return {
    isMenuOpen: state.uiReducer.isMenuOpen,
  };
};


export default connect(
  mapStateToProps,
  null
)(UnconnectedSlideMenu)


