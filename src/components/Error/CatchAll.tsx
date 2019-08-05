import React, { Component } from 'react'

interface LocalState {
  error: any,
  info: any
}

/**
 * CatchAll component use componentDidCatch for individual module errors
 * @class
 * @returns {JSX.Element} - Rendered Component 
 */
class CatchAll extends Component<{}, LocalState> {
  constructor(props: any) {
    super(props)
    this.state = {
      error: null,
      info: null
    }
  }

  componentDidCatch(error: any, info: any) {
    // Something happened to one of my children.
    // Add error to state
    this.setState({
      error: error,
      info: info,
    });
  }

  render() {
    if (this.state.error) {
      return <h1>Ops! Something went wrong.</h1>
    }
    return this.props.children
  }
}

export default CatchAll