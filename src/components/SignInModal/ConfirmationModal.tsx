import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import logo from '../../media/img/logo.png'
import { Transition } from 'react-spring/renderprops.cjs'

type InputVal = React.ChangeEvent<HTMLInputElement>
type PreventDefault = React.FormEvent<HTMLFormElement>
interface LocalState {
  confirmationCode: string,
}

class ConfirmationModal extends Component<INT.IConfirmSignUp, LocalState> {
  constructor(props: INT.IConfirmSignUp) {
    super(props)

    this.state = {
      confirmationCode: '',
    }

    this.handleConfirm = this.handleConfirm.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }


  handlePassword(e: InputVal): void {
    this.setState({ confirmationCode: e.target.value })
  }

  handleConfirm(event: PreventDefault): void {
    event.preventDefault()
    alert('ok')
  }

  render() {
    const { isConfirmModalOpen } = this.props
    return (
      <Transition
        delay={2000}
        items={isConfirmModalOpen}
        from={{ transform: 'translate3d(0, 100%, 0)', opacity: 0, display: 'none' }}
        enter={{ transform: 'translate3d(0, 0%, 0)', opacity: 1, display: 'block' }}
        leave={{ transform: 'translate3d(0, 0%, 0)', opacity: 0 }}>
        {isConfirmModalOpen => isConfirmModalOpen && (animVal =>
          <div className="modal-inner" style={{ ...animVal }}>
            <div className="logo-title">
              <img src={logo} alt="logo" />
              <h3>Confirm Account</h3>
            </div>
            <form onSubmit={this.handleConfirm}>
              <div className="form-group">
                <label>
                  Confirmation Code
              <input
                    type="text"
                    value={this.state.confirmationCode}
                    onChange={this.handlePassword}
                  />
                </label>
              </div>
              <input type="submit" value="Confirm" />
            </form>
          </div>
        )}
      </Transition>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    isConfirmModalOpen: state.uiReducer.isConfirmModalOpen,
  }
}


export default connect(mapStateToProps, {})(ConfirmationModal)