import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import * as INT from '../../helpers/interfaces'
import { Transition } from 'react-spring/renderprops.cjs'

const modalRoot = document.getElementById('modal-root')

interface LocalState { isMounted: boolean }

class Modal extends Component<INT.IModal, LocalState> {
  el: HTMLDivElement
  constructor(props: INT.IModal) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');

    this.state = {
      isMounted: false
    }
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRoot!.appendChild(this.el)
    this.setState(prevState => ({
      isMounted: !prevState.isMounted
    }))
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot!.removeChild(this.el)
    this.setState(prevState => ({
      isMounted: !prevState.isMounted
    }))
  }

  render() {
    const { isMounted } = this.state
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      <Transition
        items={isMounted}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}>
        {isMounted => isMounted && (animVal =>
          <div className="sign-in-wrapper" style={animVal}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum suscipit quaerat similique enim nesciunt, possimus velit natus qui error modi illum facere provident asperiores earum? Aperiam ullam numquam eligendi.
          </div>
        )}
      </Transition>,
      this.el
    )
  }
}

export default Modal