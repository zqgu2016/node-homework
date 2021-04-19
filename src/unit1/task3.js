import path from 'path';
import fs from 'fs';
import readline from 'readline';
import csv from 'csvtojson';

const inputFile = path.join(__dirname, 'csv', 'nodejs-hw1-ex1.csv');
const outputFile = path.join(__dirname, 'csv', 'nodejs-hw1-ex1.txt');

const rs = fs
  .createReadStream(inputFile, {})
  .on('error', (err) => {
    console.log(`Read Line Error: ${  err.message}`);
  })
  .pipe(csv());
const ws = fs.createWriteStream(outputFile).on('error', (err) => {
  console.log(`Write Line Error: ${  err.message}`);
});

const rl = readline.createInterface({
  input: rs
});

rl.on('line', (line) => {
  ws.write(`${line}\n`);
});
