import React, { useState, useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux'
import MenuToggle from 'components/MenuToggle/MenuToggle'
import Nav from '../Nav/Nav'
import * as INT from '../../helpers/interfaces'
const SlideMenu = lazy(() => import('components/SlideMenu/SlideMenu'));


export const UnconnectedApp: React.FC<INT.IMenuPropSingle> = ({ isMenuOpenProp }): JSX.Element => {

  const [scrolled, setScrolled] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return function cleanup(): void {
      window.removeEventListener('scroll', listenToScroll)
    };
  }, []);

  useEffect(() => {
    if (isMenuOpenProp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isMenuOpenProp]);

  const listenToScroll = (): void => {
    const scrolled: number = window.pageYOffset
    setScrolled(scrolled)
  }

  // test loader for now
  const Loader = () => <div className="loader">loading</div>

  return (
    <div className="wrapper">
      <Nav scrolled={scrolled} />

      <Suspense fallback={<Loader />}>
        <SlideMenu />
      </Suspense>

      <MenuToggle />
    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMenuOpenProp: state.uiReducer.isMenuOpenProp,
  };
};

export default connect(mapStateToProps, null)(UnconnectedApp)


