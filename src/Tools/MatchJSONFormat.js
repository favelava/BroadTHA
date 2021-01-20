/*
Matches the format of covid_new_sequences.csv and covid_case_counts.json. In addition, accumulates the new sequences to show the total number of sequences a country had created by a given date.
*/

const fs = require('fs');
const newSequences = require('../data/json_files/covid_new_sequences.json');
const caseCounts = require('../data/json_files/covid_case_counts.json');

let template = {};
let newJSON = [];
let seq = 0;
let country = newSequences[0]['country'];

Object.keys(caseCounts[0]).forEach(key => {
  template[key] = 0;
})

template['Country'] = country;

let i = 0;

while (i < newSequences.length) {
  for (const [key] of Object.entries(template)) {
    if (key.localeCompare('Country') === 0) { continue; }
    if (i < newSequences.length && country.localeCompare(newSequences[i]['country']) === 0) {
      const currDate = new Date(key);
      const nextDate = new Date(newSequences[i]['date']);

      if (currDate.getTime() >= nextDate.getTime()){
        seq += parseInt(newSequences[i]['new_sequences']);
        i++;
      }
    }
    template[key] = seq;
  }
  seq = 0;
  newJSON.push(Object.assign({}, template));
  if (i < newSequences.length) {
    country = newSequences[i]['country'];
    template['Country'] = country;
  }
}

//-----------------------------------------------------------
/*
const jsonPath = '../data/json_files/covid_accumulated_sequences.json';

fs.writeFile(jsonPath, JSON.stringify(newJSON, null, 2), (err) => {
  if (err) {throw err;}
  console.log('Added JSON to ' + jsonPath);
})
*/
