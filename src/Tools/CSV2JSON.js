/*
Converts .csv files to .json files
*/

const csv = require('csv-parser');
const fs = require('fs');

function CSV2JSON(csvPath, jsonPath) {
  let data = [];

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      fs.writeFile(jsonPath, JSON.stringify(data, null, 2), (err) => {
        if (err) { throw err; }
        console.log('Wrote to ' + jsonPath);
      });
    });
}

//-----------------------------------------------------------
/*
const ccPath = '../data/csv_files/covid_case_counts2.csv';
const ccjPath = '../data/json_files/covid_case_counts.json';
const seqPath = '../data/csv_files/covid_new_sequences.csv';
const seqjPath = '../data/json_files/covid_new_sequences.json';

CSV2JSON(ccPath, ccjPath);
CSV2JSON(seqPath, seqjPath);
*/
