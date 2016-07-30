import React, { Component } from 'react';
import {csv} from 'd3-request';
import {timeParse} from 'd3-time-format';

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
    let rowCleanup = function(d) {
      let dateFormat = timeParse("%m/%d/%Y");

      if (!d['base salary']) {
        return null;
      }

      return {
        employer: d.employer,
        submit_date: dateFormat(d['submit date']),
        start_date: dateFormat(d['start date']),
        case_status: d['case status'],
        job_title: d['job title'],
        // clean_job_title: this.cleanJobs(d['job title']),
        base_salary: Number(d['base salary']),
        salary_to: d['salary to'] ? Number(d['salary to']) : null,
        city: d.city,
        state: d.state
      };
    };

    csv(this.props.url, rowCleanup, (error, rows) => {
      if (error) {
        console.error(error);
        console.error(error.stack);
      } else {
        this.setState({rawData: rows});
      }
    });
  }

  render() {
    if (!this.state.rawData.length) {
      return (
        <h4>Loading data about 81,000 H1B software industry visas</h4>
      )
    } else {
      return (
        <div>
          <h4>Content from H1BGraph Component</h4>
          <svg>
          </svg>
        </div>
      );
    }
  }
}

export default H1BGraph;
