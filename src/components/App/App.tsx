import React, { useState, useEffect, } from 'react';
import Nav from '../Nav/Nav'

function App(): JSX.Element {

  const [scrolled, setScrolled] = useState<number>(0);

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
    <>
      <Nav scrolled={scrolled} />
    </>
  );
}

export default App;
