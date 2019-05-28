import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useSpring, animated as a } from 'react-spring';
import CustomScrollbar from './CustomScrollbar'

export const UnconnectedSlideMenu = ({ isMenuOpen }: any) => {

  useEffect(() => {
    if (isMenuOpen) {
      console.log(`menu ${isMenuOpen}`)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }
  }, [isMenuOpen]);

  const menuAnimation = useSpring({
    transform: isMenuOpen
      ? `translate3d(0,0,0)`
      : `translate3d(-100%,0,0)`
  })

  return (
    <a.div className="nav-wrapper" style={menuAnimation}>
      <a.div className="nav-list-wrapper">
        <CustomScrollbar>
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
        </CustomScrollbar>
      </a.div>
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


