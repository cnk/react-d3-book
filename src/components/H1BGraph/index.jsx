import React, { Component } from 'react';
import {csv} from 'd3-request';

class H1BGraph extends Component {
  constructor() {
    super();
    this.state = {
      rawData: []
    };
  }

  componentWillMount() {
    this.loadRawData();
  }

  loadRawData() {
    console.log(this.props.url);
    csv(this.props.url, (error, rows) => {
      if (error) {
        console.error(error);
        console.error(error.stack);
      } else {
        this.setState({rawData: rows});
      }
    });
  }

  render() {
    return (
      <div>
        <h4>Content from H1BGraph Component</h4>
        <svg>
        </svg>
      </div>
    );
  }
}

export default H1BGraph;
