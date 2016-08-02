import React, { Component } from 'react';
import _ from 'lodash';

class Toggle extends Component {
  // CNK got errors when I used setState in the constructor() so replaced it with componentWillMount  p 69
  componentWillMount() {
    this.setState({value: false});
  }

  componentWillReceiveProps(newProps) {
    this.setState({value: newProps.value});
  }

  handleClick() {
    let newValue = !this.state.value;

    this.setState({value: newValue});
    this.props.onClick(this.props.name, newValue);
  }

  render() {
    let className = 'btn btn-default';

    if (this.props.value) {
      className += ' btn-primary';
    }

    return (
      <button className={className} onClick={this.handleClick.bind(this)}>
        {this.props.label}
      </button>
    );
  }
}

export default Toggle;
