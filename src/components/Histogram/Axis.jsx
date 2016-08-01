import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {min, max} from 'd3-array';
import {axisLeft} from 'd3-axis';
import {scaleLinear} from 'd3-scale';
import {select} from 'd3-selection';

class Axis extends Component {
    constructor(props) {
        super();

        this.yScale = scaleLinear();
        this.axis = axisLeft(this.yScale)
                            .tickFormat((d) => '$'+this.yScale.tickFormat()(d))

        this.update_d3(props);
    }

    componentWillReceiveProps(newProps) {
        this.update_d3(newProps);
    }

    componentDidMount() { this.renderAxis(); }

    componentDidUpdate() { this.renderAxis(); }

    update_d3(props) {
        this.yScale
            .domain([0, max(props.data.map((d) => d.x0 + d.x1))])
            .range([0, props.height - props.topMargin - props.bottomMargin]);

        this.axis.ticks(props.data.length)
                 .tickValues(props.data.map((d) => d.x0)
                                       .concat(props.data[props.data.length - 1].x0
                                               + props.data[props.data.length -1].x1));
    }

    renderAxis() {
        let node = ReactDom.findDOMNode(this);

        select(node).call(this.axis);
    }

    render() {
        let translate = `translate(${this.props.axisMargin-3}, 0)`;

        return (
            <g className="axis" transform={translate}>
            </g>
        );
    }
}

export default Axis
