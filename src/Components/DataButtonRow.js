import React from 'react';
import Button from './Button.js';

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

export default DataButtonRow;
