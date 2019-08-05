import React, { useState, useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux'
import MenuToggle from 'components/MenuToggle/MenuToggle'
import { userSignedIn } from '../../redux/actions/awsActions'
import Nav from '../Nav/Nav'
import * as INT from '../../helpers/interfaces'
import { withRouter } from "react-router-dom"
import { RouteComponentProps } from "react-router"
const SlideMenu = lazy(() => import('components/SlideMenu/SlideMenu'))



export const UnconnectedApp: React.FC<INT.IMenuPropSingle & RouteComponentProps> = ({
  isMenuOpenProp,
  location
}): JSX.Element | null => {

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

  const Loader = () => <div>Loading</div>


  if (location.pathname.includes('/title/')) {
    return (
      null
    )
  } else {
    return (
      <>
        < Nav scrolled={scrolled} location={location} />
        <Suspense fallback={<Loader />}>
          <SlideMenu />
        </Suspense>
        <MenuToggle />
      </>
    )
  }
}


const mapStateToProps = (state: any) => {
  return {
    isMenuOpenProp: state.uiReducer.isMenuOpenProp,
  };
};


export default withRouter(connect(mapStateToProps, { userSignedIn })(UnconnectedApp))


