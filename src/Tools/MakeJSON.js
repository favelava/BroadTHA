const fs = require('fs');
const caseCounts = require('./data/json_files/counts.json');
const sequences = require('./data/json_files/sequences.json');

let newJSON = {};
/*
Code for Sequences per 1000 cases:
for (const [country] of Object.entries(caseCounts)) {
  if (sequences[country] === undefined) { continue; }
  let template = {};
  const countObj = caseCounts[country];
  const seqObj = sequences[country];

  for (const [key] of Object.entries(countObj)) {
    if (parseInt(countObj[key]) === 0) { continue; }
    const data = parseInt(seqObj[key]) * 1000 / parseInt(countObj[key]);
    template[key] = data;
  }

  newJSON[country] = Object.assign({}, template);
}
*/

// Code for Elasticity
for (const [country] of Object.entries(caseCounts)) {
  if (sequences[country] === undefined || country.localeCompare('All') === 0) { continue; }
  let template = {};
  const countObj = caseCounts[country];
  const seqObj = sequences[country];

  const keys = Object.keys(countObj);

  let lag = 0;
  let lead = 1;

  console.log(country);

  while (lead < keys.length) {
    const lagKey = keys[lag];
    const leadKey = keys[lead];

    if (seqObj[leadKey] === 0 || countObj[leadKey] === 0 || seqObj[leadKey] === seqObj[lagKey]|| countObj[leadKey] === countObj[lagKey]) {
      lead++;
      continue;
    } else if (seqObj[lagKey] === 0 || countObj[lagKey] === 0) {
      lag = lead++;
      continue;
    }

    const numerator = (parseInt(seqObj[leadKey]) - parseInt(seqObj[lagKey]) / parseInt(seqObj[lagKey]));
    const denominator = (parseInt(countObj[leadKey]) - parseInt( countObj[lagKey]) / parseInt(countObj[lagKey]));

    const elasticity = numerator * 100 / denominator;
    template[leadKey] = elasticity;
    lag = lead++;
  }

  if (Object.keys(template).length > 0) {
    newJSON[country] = Object.assign({}, template);
  }
}

// ========================================
/*
const jsonPath = './data/json_files/sequencesper1000cases.json'
fs.writeFile(jsonPath, JSON.stringify(newJSON, null, 2), (err) => {
  if (err) { throw err; }
  console.log('Wrote to ' + jsonPath);
});
*/

const jsonPath = './data/json_files/elasticity.json'
fs.writeFile(jsonPath, JSON.stringify(newJSON, null, 2), (err) => {
  if (err) { throw err; }
  console.log('Wrote to ' + jsonPath);
});
