import React, { Component } from 'react'
import Scrollbars from 'react-custom-scrollbars';

export default class CustomScrollbar extends Component {
  render() {
    return (
      <Scrollbars
        renderTrackVertical={props => <div {...props} className="track-vertical" />}
        renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
        renderView={props => <div {...props} className="view" />}>
        {this.props.children}
      </Scrollbars>
    );
  }
}