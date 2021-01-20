/*
Input:
  fromJSON: String. Imported json to change format
  toPath:   String. The filepath to place the new JSON file

Changes the format of covid_accumulated_sequences.json and covid_case_counts.json. Instead of taking the form of an array of Objects, the jsons are transformed into one object with country names as keys and an object containing the dates and values as their values.
*/
const fs = require('fs');
const seqJSON = require('../data/json_files/covid_accumulated_sequences.json');
const countJSON = require('../data/json_files/covid_case_counts.json');

function ChangeJSONFormat(jsonFile, toPath) {
  let bigObj = {};

  for (let i = 0, len = jsonFile.length; i < len; i++) {
    const country = jsonFile[i]['Country'];
    delete jsonFile[i]['Country'];

    bigObj[country] = Object.assign({}, jsonFile[i]);
  }

  fs.writeFile(toPath, JSON.stringify(bigObj, null, 2), (err) => {
    if (err) { throw err; }
    console.log('Wrote to ' + toPath);
  })
}

// ========================================
/*
const countToPath = '../data/json_files/counts.json';
const seqToPath = '../data/json_files/sequences.json';

ChangeJSONFormat(countJSON, countToPath);
ChangeJSONFormat(seqJSON, seqToPath);
*/
