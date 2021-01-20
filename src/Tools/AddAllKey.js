/*
Adds an 'All' key to an object of the form {key1: {key2: value}}. The 'All' key takes the form {'All': {key1: value}}. The values of the object associated with 'All' is determined by mode. Currently valid modes: 'last' (picks the final value in every object associate with key1), 'average' (averages the values in every object associated with key1).
*/

const fs = require('fs');

function AddAllKey(json, pathTo, mode) {
  let newJSON = Object.assign({}, json);
  newJSON['All'] = {};

  switch (mode) {
    case 'last':
      for (const [country] of Object.entries(json)) {
        const keyArray = Object.keys(json[country]);
        const lastKey = keyArray[keyArray.length - 1];

        newJSON['All'][country] = json[country][lastKey];
      }
      break;

    case 'average':
      for (const [key1] of Object.entries(json)) {
        let accum = 0;
        let average = 0;

        for (const [key2] of Object.entries(json[key1])) {
          accum += parseInt(json[key1][key2]);
        }

        average = accum / Object.keys(json[key1]).length;
        newJSON['All'][key1] = average;
      }
      break;

    default:
      console.log('mode must be specified.');
      return;
  }

  fs.writeFile(pathTo, JSON.stringify(newJSON, null, 2), (err) => {
    if (err) { throw err; }
    console.log('Wrote to ' + pathTo)
  })
}

// ========================================

/*
const sequences = require('./data/json_files/sequences.json');
const seqPath = './data/json_files/sequences.json';
const counts = require('./data/json_files/counts.json');
const countsPath = './data/json_files/counts.json';
const seqPerThou = require('./data/json_files/sequencesper1000cases.json');
const seqPerThouPath = './data/json_files/sequencesper1000cases.json';
const elastic = require('./data/json_files/elasticity.json');
const elasticPath = './data/json_files/elasticity.json';

AddAllKey(sequences, seqPath, 'last');
AddAllKey(counts, countsPath, 'last');
AddAllKey(seqPerThou, seqPerThouPath, 'last');
AddAllKey(elastic, elasticPath, 'average');
*/
