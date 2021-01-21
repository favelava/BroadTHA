import React from 'react';
import CountryList from './CountryList.js';
import DataButtonRow from './DataButtonRow.js';
import Graph from './Graph.js';
import Choropleth from './Choropleth.js';
import '../index.css';

/*
 To add more json files, list the path to the json file as below. In the App React Component's constructor, add the variable name to this.state.jsonFiles, a label to this.state.jsonLabels, and an initial index to this.state.countryIndex
*/

const caseCounts = require('../data/json_files/counts.json');
const sequences = require('../data/json_files/sequences.json');
const seqPerThou = require('../data/json_files/sequencesper1000cases.json');
const elasticity = require('../data/json_files/elasticity.json');

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
      countryIndex: index,
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
