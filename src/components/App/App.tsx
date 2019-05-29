import React, { useState, useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux'
import MenuToggle from 'components/MenuToggle/MenuToggle'
import Nav from '../Nav/Nav'
import { useTransition } from 'react-spring'
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


  const transition = useTransition(isMenuOpen, null, {
    from: { transform: `translate3d(-100%,0,0)` },
    enter: { transform: `translate3d(0%,0,0)` },
    leave: { transform: `translate3d(-100%,0,0)` }
  })

  const listenToScroll = (): void => {
    const scrolled: number = window.pageYOffset
    setScrolled(scrolled)
  }


  // test loader for now
  const loader = () => <div className="loader">loading</div>

  return (
    <div className="wrapper">
      <Nav scrolled={scrolled} />

      {transition.map(
        ({ item, key, props }) => (
          item &&
          <Suspense fallback={() => loader()}>
            <SlideMenu key={key} props={props} />
          </Suspense>
        )
      )}

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


