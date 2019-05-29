import React, { useState, useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux'
import MenuToggle from 'components/MenuToggle/MenuToggle'
import Nav from '../Nav/Nav'
import * as INT from '../../helpers/interfaces'
const SlideMenu = lazy(() => import('components/SlideMenu/SlideMenu'));


export const UnconnectedApp: React.FC<INT.IMenuProps> = ({ isMenuOpen }): JSX.Element => {

  const [scrolled, setScrolled] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return function cleanup(): void {
      window.removeEventListener('scroll', listenToScroll)
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isMenuOpen]);

  const listenToScroll = (): void => {
    const scrolled: number = window.pageYOffset
    setScrolled(scrolled)
  }

  // test loader for now
  const loader = () => <div className="loader">loading</div>

  return (
    <div className="wrapper">
      <Nav scrolled={scrolled} />

      <Suspense fallback={() => loader()}>
        <SlideMenu />
      </Suspense>

      <MenuToggle />
    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMenuOpen: state.uiReducer.isMenuOpen,
  };
};

export default connect(mapStateToProps, null)(UnconnectedApp)


