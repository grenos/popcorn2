import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import { openAuthModal } from '../../redux/actions/uiActions'
import logo from '../../media/img/logo.png'
import close from '../../media/img/close.png'
import isEmail from 'validator/lib/isEmail';

type InputVal = React.ChangeEvent<HTMLInputElement>
type PreventDefault = React.FormEvent<HTMLFormElement>

interface LocalState {
  email: string,
  password: string,
  confirmPass: string,
  confirmationCode: string,
  isConfirmModal: boolean,
  name: string,
  nameError: boolean,
  emailError: boolean,
  passError: boolean,
  confirmPassError: boolean,
  show: boolean
}

class SignUp extends Component<INT.ILogin, LocalState> {
  el: HTMLDivElement
  constructor(props: INT.ILogin) {
    super(props);
    this.el = document.createElement('div');

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPass: '',
      confirmationCode: '',
      isConfirmModal: false,
      nameError: false,
      emailError: false,
      passError: false,
      confirmPassError: false,
      show: false
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
      alert('ok')
    }
  }

  render() {
    const { nameError, emailError, passError, confirmPassError, show } = this.state
    return (
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
                type="text"
                value={this.state.password}
                onChange={this.handlePassword}
                className={passError ? 'error' : ''}
              />
              <p className={passError && show ? 'show' : ''} >At least 8 characters long</p>
            </label>
            <label>
              Confirm Password*
          <input
                type="text"
                value={this.state.confirmPass}
                onChange={this.handleConfirmPassword}
                className={confirmPassError ? 'error' : ''}
              />
              <p className={confirmPassError && show ? 'show' : ''} >Password doesn't match</p>
            </label>
          </div>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}


export default connect(null, { openAuthModal })(SignUp)