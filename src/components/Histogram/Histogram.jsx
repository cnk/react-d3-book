import React, {Component} from 'react';
import {histogram, min, max} from 'd3-array';
import {scaleLinear} from 'd3-scale';


class HistogramBar extends Component {
  render() {
    let translate = `translate(${this.props.x}, ${this.props.y})`,
        label = this.props.percent.toFixed(0) + '%';

    if (this.props.percent < 1) {
      label = this.props.percent.toFixed(2) + '%';
    }

    // Adjust label if bar is too small to hold it
    if (this.props.width < 20) {
      label = label.replace('%', '');
    }

    if (this.props.width < 10) {
      label = '';
    }

    return (
        <g transform={translate} className="bar">
          <rect width={this.props.width}
                height={this.props.height-2}
                transform="translate(0,1)">
          </rect>
          <text textAnchor="end"
                x={this.props.width - 5}
                y={this.props.height/2 + 3}>
            {label}
          </text>
        </g>
    )
  }
}

class Histogram extends Component {
  constructor(props) {
    super();

    this.histogram = histogram();
    this.widthScale = scaleLinear();
    this.yScale = scaleLinear();

    this.update_d3(props);
  }

  componentWillReceiveProps(newProps) {
    this.update_d3(newProps);
  }

  update_d3(props){
    this.histogram
      .thresholds(props.bins)
      .value(props.value);

    let bars = this.histogram(props.data);
    let counts = bars.map((d) => d.length);

    this.widthScale
      .domain([min(counts), max(counts)])
      .range([9, props.width-props.axisMargin]);

    this.yScale
      .domain([0, max(bars.map((d) => d.x0+d.x1))])
      .range([0, props.height-props.topMargin-props.bottomMargin]);
  }

  makeBar(bar) {
    let percent = bar.length / this.props.data.length * 100;
    let props = {percent: percent,
                 x: this.props.axisMargin,
                 y: this.yScale(bar.x0),
                 width: this.widthScale((bar.length)),
                 height: this.yScale(bar.x1 - bar.x0),
                 key: "histogram-bar-"+bar.x0+"-"+bar.length
                }

    return (<HistogramBar {...props} />);
  }

  render() {
    let translate = `translate(0, ${this.props.topMargin})`;
    let bars = this.histogram(this.props.data);

    return (
        <g className="histogram" transform={translate}>
          <g className="bars">
        {bars.map(this.makeBar, this)}
          </g>
        </g>
    );
  }
}

export default Histogram;
