import React from 'react';
import Plot from 'react-plotly.js';

class Choropleth extends React.Component {
  render() {
    let locations = [];
    let zarray = [];

    locations = Object.keys(this.props.json['All']);
    Object.values(this.props.json['All']).forEach(value => {
      zarray.push(parseInt(value));
    })

    return (
      <Plot data={[
        {
          type: 'choropleth',
          locationmode: 'country names',
          locations: locations,
          z: zarray,
          automargin: true,
          colorbar: {
            x: -0.2,
          }
        }
      ]}
      layout = {
        {
          title: 'Choropleth Map: ' + this.props.jsonLabel,
          height: 550,
          geo: {
            projection: {
              type: 'robinson',
              landcolor: 'black'
            }
          }
        }
      }
      />
    );
  }
}

export default Choropleth;
