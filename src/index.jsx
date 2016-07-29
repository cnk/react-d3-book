import React from 'react';
import ReactDom from 'react-dom';

import H1BGraph from './components/H1BGraph';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.decapitalize = function() {
  return this.charAt(0).toLowerCase() + this.slice(1);
}

ReactDom.render(
  <H1BGraph url="data/h1bs.csv" />,
  document.querySelectorAll('.h1bgraph')[0]
);
