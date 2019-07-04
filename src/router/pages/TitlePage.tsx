import React, { useEffect, useState } from 'react'
import TitleModal from '../../components/TitleModal/TitleModal'
import { Transition } from 'react-spring/renderprops.cjs'
import close from '../../media/img/close.png'

const TitlePage = (): JSX.Element => {

  const [show, set] = useState(false)

  useEffect(() => {
    set(show => !show)
    // return () => set(show => !show)
  })

  const handleClose = () => {
    set(show => !show)
  }

  return (
    <Transition
      items={show}
      from={{ opacity: 0, transform: 'translate3d(0, 200%, 0)' }}
      enter={{ opacity: 1, transform: 'translate3d(0, 0%, 0)' }}
      leave={{ opacity: 0, transform: 'translate3d(0, 200%, 0)' }}>
      {show => show && (props =>
        <div style={props}>
          <TitleModal />
          {/* <div className="close" onClick={handleClose}>
            <img src={close} alt="close modal" />
          </div> */}
        </div>
      )}
    </Transition>
  )
}

export default TitlePage


