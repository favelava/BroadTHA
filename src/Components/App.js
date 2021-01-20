import React from 'react';
import Plot from 'react-plotly.js';
import '../index.css';

/*
 To add more json files, require the json as below. In the App React Component's constructor, add the variable name to this.state.jsonFiles, a label to this.state.jsonLabels, and an initial index to this.state.countryIndex
*/

const caseCounts = require('../data/json_files/counts.json');
const sequences = require('../data/json_files/sequences.json');
const seqPerThou = require('../data/json_files/sequencesper1000cases.json');
const elasticity = require('../data/json_files/elasticity.json');

function Button(props) {
  return (
    <button className={props.name} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class DataButtonRow extends React.Component {
  // Renders 'data buttons' representing the json files loaded into the App
  render() {
    let numarray = [];
    for (let i=0, len=this.props.jsonLabels.length; i < len; i++){
      numarray.push(i);
    }

    return (
      numarray.map(num => {
        return (
          <Button
            value={this.props.jsonLabels[num]}
            onClick={()=>this.props.onClick(num)}
            name={'data-button'}
          />
        );
      })
    );
  }
}

class CountryList extends React.Component {
  makeButtons() {
    // Automatically makes buttons for every country in current json file
    let numarray = [];
    for (let i=0, len=this.props.countries.length; i < len; i++){
      numarray.push(i);
    }

    return (
      <ul>
      {
        numarray.map(num => {
          return(<li key={num}>
            <Button
            value={this.props.countries[num]}
            onClick={()=>this.props.onClick(num)}
            name={'country-button'}
            />
            </li>
          );
        })
      }
      </ul>
    );
  }

  render() {
    return (
      <div>
          {this.makeButtons()};
      </div>
    );
  }
}

class Choropleth extends React.Component {
  render() {
    let locations = Object.keys(this.props.json['All']);
    let zarray = [];

    Object.values(this.props.json['All']).forEach((value) => {
      zarray.push(parseInt(value));
    });


    console.log(zarray);

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

class Graph extends React.Component {
  // Plotly React Component plots the current jsonFile/country pair
  render() {
    let yarray = [];
    let data = this.props.json[this.props.country];
    let xarray = Object.keys(data);

    Object.values(data).forEach(value => {
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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonFiles: [caseCounts, sequences, seqPerThou, elasticity],
      jsonLabels: ['Number of Covid Cases', 'Number of Sequences', 'Sequences per 1000 Cases', 'Elasticity'],
      jsonIndex: 0,
      countryIndex: [0, 0, 0, 0],
      countries: Object.keys(caseCounts)
    };
  }

  handleClick(i) {
    this.setState({
      jsonIndex: i,
      countries: Object.keys(this.state.jsonFiles[i])
    })
  }

  changeCountry(i) {
    let index = this.state.countryIndex;
    index[this.state.jsonIndex] = i;

    this.setState({
      countryIndex: index
    })
  }

  render() {
    return (
      <div className='app'>
        <div className='column left'>
            <div className='dropdown-content'>
              <CountryList
                countries={this.state.countries}
                onClick={(i) => this.changeCountry(i)}
              />
            </div>
        </div>

        <div className='column right'>
          <div className='data-button-row'>
            <DataButtonRow
              jsonLabels={this.state.jsonLabels}
              onClick={(i) => this.handleClick(i)}
            />
          </div>

          <div className='graph'>
            <Graph
              json={this.state.jsonFiles[this.state.jsonIndex]}
              country={this.state.countries[this.state.countryIndex[this.state.jsonIndex]]}
            />
          </div>

          <div className='choropleth'>
            <Choropleth
              json={this.state.jsonFiles[this.state.jsonIndex]}
              country={this.state.countries[this.state.countryIndex[this.state.jsonIndex]]}
              jsonLabel={this.state.jsonLabels[this.state.jsonIndex]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
