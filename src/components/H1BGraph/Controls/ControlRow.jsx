import React, { Component } from 'react';
import _ from 'lodash';

import Toggle from './Toggle';

class ControlRow extends Component {
  componentWillMount() {
    let toggles = this.props.getToggleNames(this.props.data);
    let toggleValues = _.zipObject(toggles, toggles.map(() => false));

    this.setState({toggleValues: toggleValues});  // CNK error in PDF p 66
  }

  _addToggle(name) {
    let key = `toggle-${name}`;
    let label = name;

    if (this.props.capitalize) {
      label = label.toUpperCase();
    }

    return (
      <Toggle label={label}
              name={name}
              key={key}
              value={this.state.toggleValues[name]}
              onClick={this.makePick.bind(this)}
              />
    );
  }

  makePick(picked, newState) {
    let newValues = _.mapValues(this.state.toggleValues, (value, key) => newState && key == picked);

    // if newState is false, we want to reset
    this.props.updateDataFilter(picked, !newState);
    this.setState({toggleValues: newValues});
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          {this.props.getToggleNames(this.props.data)
                     .map((name) => this._addToggle(name))}
        </div>
      </div>
    );
  }
}

export default ControlRow;
