import ColorHash from 'color-hash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import invertColor from 'invert-color';
import { XrayContext } from './XrayProvider';

const colorHash = new ColorHash();

@autobind
export default class Xray extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    height: PropTypes.string,
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    width: PropTypes.string
  };

  static defaultProps = {
    children: null,
    className: '',
    height: '100px',
    style: {},
    width: '100px'
  };

  constructor(props) {
    super(props);
    this.state = {
      color: props.color || colorHash.hex(props.label)
    };
  }

  renderContext(context) {
    const enabled = context?.enabled;
    if (!enabled) {
      return (
        <div className={this.props.className} style={this.props.style}>
          {this.props.children}
        </div>
      );
    }
    const props = { ...this.props };
    delete props.children;
    delete props.color;
    delete props.height;
    delete props.label;
    delete props.width;
    return (
      <div
        {...props}
        style={{
          ...props.style,
          backgroundColor: this.state.color,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomWidth: '0px',
          borderLeftWidth: '0px',
          borderRightWidth: '0px',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderTopWidth: '0px',
          height: this.props.height,
          width: this.props.width,
          color: invertColor(this.state.color, {
            black: '#3a3a3a',
            white: '#fafafa'
          })
        }}
      >
        <h3>{this.props.label}</h3>
      </div>
    );
  }

  render() {
    return (
      <XrayContext.Consumer>
        {context => this.renderContext(context)}
      </XrayContext.Consumer>
    );
  }
}
