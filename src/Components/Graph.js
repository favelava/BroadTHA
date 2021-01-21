import React from 'react';
import Plot from 'react-plotly.js';

class Graph extends React.Component {
  // Plotly React Component plots the current jsonFile/country pair
  render() {
    let yarray = [];
    let xarray = [];

    xarray = Object.keys(this.props.json[this.props.country]);

    Object.values(this.props.json[this.props.country]).forEach(value => {
      yarray.push(parseInt(value));
    })

    if (this.props.country.localeCompare('All') === 0) {
      return (
        <Plot data = {[
          {
            x: xarray,
            y: yarray,
            type: 'bar',
          }
        ]}
        layout = {
          {title: 'All',
          automargin: true
          }
        }
        />
      );
    } else {
      return (
        <Plot data={[
            {
              x: xarray,
              y: yarray,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'}
            }
          ]}
          layout = {
            {title: this.props.country,
            }
          }
        />
      );
    }
  }
}

export default Graph;
