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
  error: boolean
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
      error: false
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
    const { email, password, confirmPass, name } = this.state

    if (!name) {
      this.setState({ error: true })
    }

    // email
    if (!isEmail(email)) {
      this.setState({ error: true })
    }

    // small password
    if (password.length < 8) {
      this.setState({ error: true })
    }

    if (confirmPass !== password) {
      this.setState({ error: true })
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
    const { error } = this.state
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
              Name
          <input
                type="text"
                value={this.state.name}
                onChange={this.handleName}
                className={error ? 'error' : ''}
              />
            </label>
            <label>
              Email
          <input
                type="text"
                value={this.state.email}
                onChange={this.handleEmail}
                className={error ? 'error' : ''}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password
          <input
                type="text"
                value={this.state.password}
                onChange={this.handlePassword}
                className={error ? 'error' : ''}
              />
            </label>
            <label>
              Confirm Password
          <input
                type="text"
                value={this.state.confirmPass}
                onChange={this.handleConfirmPassword}
                className={error ? 'error' : ''}
              />
            </label>
          </div>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}


export default connect(null, { openAuthModal })(SignUp)