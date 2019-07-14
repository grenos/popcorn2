import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openAuthModal } from '../../redux/actions/uiActions'
import * as INT from '../../helpers/interfaces'
import logo from '../../media/img/logo.png'
import close from '../../media/img/close.png'
import isEmail from 'validator/lib/isEmail';


type InputVal = React.ChangeEvent<HTMLInputElement>
type PreventDefault = React.FormEvent<HTMLFormElement>
interface LocalState {
  email: string,
  password: string,
}

class Login extends Component<INT.ILogin, LocalState> {
  el: HTMLDivElement
  constructor(props: INT.ILogin) {
    super(props);
    this.el = document.createElement('div');

    this.state = {
      email: '',
      password: ''
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)

  }


  handleClose(): void {
    this.props.openAuthModal(false)
  }

  handleEmail(e: InputVal): void {
    this.setState({ email: e.target.value })
  }

  handlePassword(e: InputVal): void {
    this.setState({ password: e.target.value })
  }


  handleLogin(event: PreventDefault): void {
    event.preventDefault()
    const { email, password } = this.state

    // success
    if (isEmail(email)
      && (password.length < 8)) {
      alert('ok')
    }
  }

  render() {

    return (
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
                onChange={this.handleEmail}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                value={this.state.password}
                onChange={this.handlePassword}
              />
            </label>
          </div>
          <input type="submit" value="Log In" />
        </form>
      </div>
    )
  }
}


export default connect(null, { openAuthModal })(Login)