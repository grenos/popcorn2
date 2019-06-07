import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ColoredScrollbars extends Component {

  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = { top: 0 };
    this.renderThumb = this.renderThumb.bind(this);
  }

  renderThumb({ style, ...props }) {
    // const { top } = this.state;
    const thumbStyle = {
      backgroundColor: '#fff',
      border: '1px solid #fff',
      width: '3px',
      borderRadius: '6px'
    };
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props} />
    );
  }

  render() {
    return (
      <Scrollbars
        renderThumbVertical={this.renderThumb}
        {...this.props} />
    );
  }
}