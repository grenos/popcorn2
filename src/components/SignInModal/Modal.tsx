import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import { openAuthModal } from '../../redux/actions/uiActions'
import { Transition } from 'react-spring/renderprops.cjs'

import Login from './LoginModal'
import SignUp from './SignupModal'
import ForgotPass from './ForgotPass'
import SuccessModal from './SuccessModal'
import PassRquest from './PassRquest'


const modalRoot = document.getElementById('modal-root')

class Modal extends Component<INT.IModal> {
  el: HTMLDivElement
  constructor(props: INT.IModal) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount(): void {
    modalRoot!.appendChild(this.el)
  }

  componentWillUnmount(): void {
    modalRoot!.removeChild(this.el)
  }



  render() {

    let ModalType: JSX.Element
    const { isAuthModalOpen, modalType } = this.props

    if (modalType === 1) {
      ModalType = (
        <Login />
      )
    } else if (modalType === 2) {
      ModalType = (
        <SignUp />
      )
    }
    else if (modalType === 3) {
      ModalType = (
        <ForgotPass />
      )
    } else if (modalType === 4) {
      ModalType = (
        <SuccessModal />
      )
    } else if (modalType === 5) {
      ModalType = (
        <PassRquest />
      )
    }

    return ReactDOM.createPortal(
      <Transition
        items={isAuthModalOpen}
        from={{ transform: 'translate3d(100%, 0, 0)', opacity: 0 }}
        enter={{ transform: 'translate3d(0%, 0, 0)', opacity: 1 }}
        leave={{ transform: 'translate3d(100%, 0, 0)', opacity: 0 }}>
        {isAuthModalOpen => isAuthModalOpen && (animVal =>
          <div className="modal-wrapper" style={animVal}>
            {ModalType}
          </div>
        )}
      </Transition>,
      this.el
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthModalOpen: state.uiReducer.isAuthModalOpen,
  }
}

export default connect(mapStateToProps, { openAuthModal })(Modal)