import React from 'react';
import Button from './Button.js';

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

export default CountryList;
