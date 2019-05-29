import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useSpring, animated as a } from 'react-spring';
import Scrollbars from 'react-custom-scrollbars';

export const UnconnectedSlideMenu = ({ isMenuOpen }: any) => {

  useEffect(() => {
    if (isMenuOpen) {
      console.log(`menu ${isMenuOpen}`)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isMenuOpen]);

  const menuAnimation = useSpring({
    transform: isMenuOpen
      ? `translate3d(0,0,0)`
      : `translate3d(-100%,0,0)`
  })

  return (
    <a.div className="nav-wrapper" style={menuAnimation}>
      <div className="nav-list-wrapper">
        <Scrollbars className="nav-list">
        <h3>test</h3>
        </Scrollbars>
      </div>
    </a.div>
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


