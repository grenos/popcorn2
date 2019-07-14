import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import { openAuthModal } from '../../redux/actions/uiActions'
import { Transition } from 'react-spring/renderprops.cjs'
import logo from '../../media/img/logo.png'
import close from '../../media/img/close.png'
import isEmail from 'validator/lib/isEmail';

const modalRoot = document.getElementById('modal-root')
type InputVal = React.ChangeEvent<HTMLInputElement>
type PreventDefault = React.FormEvent<HTMLFormElement>
interface LocalState {
  email: string,
  password: string,
  confirmPass: string,
  confirmationCode: string,
  isConfirmModal: boolean,
  name: string
}

class Modal extends Component<INT.IModal, LocalState> {
  el: HTMLDivElement
  constructor(props: INT.IModal) {
    super(props);
    this.el = document.createElement('div');

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPass: '',
      confirmationCode: '',
      isConfirmModal: false
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
  }

  componentDidMount(): void {
    modalRoot!.appendChild(this.el)
  }

  componentWillUnmount(): void {
    modalRoot!.removeChild(this.el)
  }

  handleClose(): void {
    this.props.openAuthModal(false)
  }

  handleName(e: InputVal): void {
    this.setState({ name: e.target.value })
  }

  handleEmail(e: InputVal): void {
    this.setState({ email: e.target.value })
  }

  handlePassword(e: InputVal): void {
    this.setState({ password: e.target.value })
  }

  handleConfirmPassword(e: InputVal): void {
    this.setState({ confirmPass: e.target.value })
  }

  handleSignUp(event: PreventDefault): void {
    event.preventDefault()
    const { email, password, confirmPass } = this.state
    if (isEmail(email)
      && (password.length < 8)
      && (confirmPass !== password)) {
      console.log('submited');
    } else {
      console.log('not email');
    }
  }

  handleLogin() {

  }

  render() {

    let ModalType: JSX.Element
    const { isAuthModalOpen, modalType } = this.props

    if (modalType === 1) {
      ModalType = (
        <div className="modal-inner">
          <img src={close}
            alt="close modal"
            className="close-log-modal"
            onClick={this.handleClose} />
          <div className="logo-title">
            <img src={logo} alt="logo" />
            <h3>Log In</h3>
          </div>
          <form onSubmit={this.handleLogin}>
            <div className="form-group">
              <label>
                Email:
              <input
                  type="text"
                  value={this.state.email}
                  onChange={this.handleEmail} />
              </label>
              <label>
                Password:
              <input
                  type="text"
                  value={this.state.password}
                  onChange={this.handlePassword} />
              </label>
            </div>
            <input type="submit" value="Log In" />
          </form>
        </div>
      )
    } else if (modalType === 2) {
      ModalType = (
        <div className="modal-inner">
          <img src={close}
            alt="close modal"
            className="close-log-modal"
            onClick={this.handleClose} />
          <div className="logo-title">
            <img src={logo} alt="logo" />
            <h3>Sign Up</h3>
          </div>

          <form onSubmit={this.handleSignUp}>
            <div className="form-group">
              <label>
                Name
              <input
                  type="text"
                  value={this.state.name}
                  onChange={this.handleName} />
              </label>
              <label>
                Email
              <input
                  type="text"
                  value={this.state.email}
                  onChange={this.handleEmail} />
              </label>
            </div>
            <div className="form-group">
              <label>
                Password
              <input
                  type="text"
                  value={this.state.password}
                  onChange={this.handlePassword}
                  className="succes"
                />
              </label>
              <label>
                Confirm Password
              <input
                  type="text"
                  value={this.state.confirmPass}
                  onChange={this.handleConfirmPassword}
                  className="error"
                />
              </label>
            </div>
            <input type="submit" value="Sign Up" />
          </form>
        </div>
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