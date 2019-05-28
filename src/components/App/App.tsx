import React, { useState, useEffect, } from 'react';
import Nav from '../Nav/Nav'
import SlideMenu from 'components/SlideMenu/SlideMenu';
import { useSpring, animated as a } from 'react-spring';


function App(): JSX.Element {

  const [scrolled, setScrolled] = useState<number>(0);
  const [isNavOpen, setNavOpen] = useState(false);

  const btnAnimation = useSpring({
    transform: isNavOpen
      ? `translate3d(300px,0,0)`
      : `translate3d(0px,0,0)`
  });

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return function cleanup(): void {
      window.removeEventListener('scroll', listenToScroll)
    };
  }, []);

  const listenToScroll = (): void => {
    const scrolled: number = window.pageYOffset
    setScrolled(scrolled)
  }

  return (
    <div className="wrapper">
      <Nav scrolled={scrolled} />
      <a.button className="menu-button" onClick={() => setNavOpen(isNavOpen => !isNavOpen)}
        style={btnAnimation}>
        Menu
      </a.button>
      <SlideMenu isNavOpen={isNavOpen} />
    </div>
  );
}

export default App;
