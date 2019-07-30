import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import { openAuthModal, openConfirmModal, isFetchingRquest } from '../../redux/actions/uiActions'
import { makeSignUpGlobal } from '../../redux/actions/awsActions'
import { Transition } from 'react-spring/renderprops.cjs'
import logo from '../../media/img/logo.png'
import close from '../../media/img/close.png'
import isEmail from 'validator/lib/isEmail';
import { Auth } from 'aws-amplify';
import ConfirmationModal from './ConfirmationModal'
import Loader from '../Loader/Loader'

type InputVal = React.ChangeEvent<HTMLInputElement>
type PreventDefault = React.FormEvent<HTMLFormElement>

interface LocalState {
  email: string,
  password: string,
  confirmPass: string,
  name: string,
  nameError: boolean,
  emailError: boolean,
  passError: boolean,
  confirmPassError: boolean,
  show: boolean,
  serverError: string
}

class SignUp extends Component<INT.ISignUp, LocalState> {
  constructor(props: INT.ISignUp) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPass: '',
      nameError: false,
      emailError: false,
      passError: false,
      confirmPassError: false,
      show: false,
      serverError: '',
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
  }

  handleClose(): void {
    this.props.openAuthModal(false)
  }

  handleName(e: InputVal): void {
    this.setState({
      name: e.target.value,
      nameError: false,
      show: false
    })
  }

  handleEmail(e: InputVal): void {
    this.setState({
      email: e.target.value,
      emailError: false,
      show: false
    })
  }

  handlePassword(e: InputVal): void {
    this.setState({
      password: e.target.value,
      passError: false,
      show: false
    })
  }

  handleConfirmPassword(e: InputVal): void {
    this.setState({
      confirmPass: e.target.value,
      confirmPassError: false,
      show: false
    })
  }

  handleSignUp(event: PreventDefault): void {
    event.preventDefault()
    const { email, password, confirmPass, name } = this.state
    const { isFetchingRquest, openConfirmModal } = this.props

    if (!name) {
      this.setState({ nameError: true, show: true })
    }

    // email
    if (!isEmail(email)) {
      this.setState({ emailError: true, show: true })
    }

    // small password
    if (password.length < 8) {
      this.setState({ passError: true, show: true })
    }

    if (confirmPass !== password) {
      this.setState({ confirmPassError: true, show: true })
    }

    // success
    if (isEmail(email)
      && (password.length >= 8)
      && (confirmPass === password)
      && (name !== '')) {
      this.props.makeSignUpGlobal({
        email,
        password,
        name
      })
      isFetchingRquest(true)
      Auth.signUp({
        username: email,
        password,
        attributes: { email, name, }
      }).then(() => {
        isFetchingRquest(false)
        openConfirmModal(true)
      }).catch(err => {
        isFetchingRquest(false)
        this.setState({ serverError: err.message })
        console.log(this.state.serverError);
      })
    }
  }

  render() {
    const { nameError, emailError, passError, confirmPassError, show, serverError, password } = this.state
    const { isConfirmModalOpen, isFetching } = this.props

    return (
      <>
        <Transition
          items={!isConfirmModalOpen}
          from={{ transform: 'translate3d(0, 0%, 0)', opacity: 0 }}
          enter={{ transform: 'translate3d(0, 0%, 0)', opacity: 1 }}
          leave={{ transform: 'translate3d(0, -100%, 0)', opacity: 0 }}
        >
          {isConfirmModalOpen => isConfirmModalOpen && (animVal =>
            <div className="modal-inner" style={animVal}>
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
                    Name*
                    <input
                      type="text"
                      value={this.state.name}
                      onChange={this.handleName}
                      className={nameError ? 'error' : ''}
                    />
                    <p className={nameError && show ? 'show' : ''} >Please fill in your name</p>
                  </label>
                  <label>
                    Email*
                    <input
                      type="text"
                      value={this.state.email}
                      onChange={this.handleEmail}
                      className={emailError ? 'error' : ''}
                    />
                    <p className={emailError && show ? 'show' : ''} >Please fill in your email</p>
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Password*
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePassword}
                      className={passError ? 'error' : ''}
                    />
                    <p className={passError && show ? 'show' : ''} >At least 8 characters long</p>
                  </label>
                  <label>
                    Confirm Password*
                    <input
                      type="password"
                      value={this.state.confirmPass}
                      onChange={this.handleConfirmPassword}
                      className={confirmPassError ? 'error' : ''}
                    />
                    <p className={confirmPassError && show ? 'show' : ''} >Password doesn't match</p>
                  </label>
                </div>
                {isFetching && <Loader />}
                <input type="submit" value="Sign Up" />
                {serverError && <div className="login-error"> <p>{serverError}</p> </div>}
              </form>
            </div>
          )}
        </Transition>
        <ConfirmationModal password={password} />
      </>
    )
  }
}


const mapStateToProps = (state: any) => {
  return {
    isAuthModalOpen: state.uiReducer.isAuthModalOpen,
    isConfirmModalOpen: state.uiReducer.isConfirmModalOpen,
    isFetching: state.uiReducer.isFetching,
  }
}

export default connect(mapStateToProps, {
  openAuthModal,
  makeSignUpGlobal,
  openConfirmModal,
  isFetchingRquest
})(SignUp)