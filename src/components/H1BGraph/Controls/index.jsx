import React, { Component } from 'react';
import _ from 'lodash';
import ControlRow from './ControlRow';

class Controls extends Component {
  componentWillMount () {
      this.setState({yearFilter: () => true,
                     year: '*'});
  }

  componentDidUpdate() {
    this.props.updateDataFilter(
      ((filters) => {
        return (d) => filters.yearFilter(d);
      })(this.state)
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state, nextState);
  }

  updateYearFilter(year, reset) {
    let filter = (d) => d.submit_date.getFullYear() == year;

    if (reset || !year) {
      filter = () => true;
      year = '*';
    }

    this.setState({yearFilter: filter,
                   year: year });
  }

  render() {
    let getYears = (data) => {
      return _.keys(_.groupBy(data, (d) => d.submit_date.getFullYear())).map(Number);
    }

    return (
      <div className="control-row">
        <ControlRow data={this.props.data}
                    getToggleNames={getYears}
                    updateDataFilter={this.updateYearFilter.bind(this)} />
      </div>
    )
  }
}

export default Controls;
