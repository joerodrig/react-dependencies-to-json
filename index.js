#!/usr/bin/env node
const Parser = require('./utilities/parser.js');
const {writeToFileAsJSON} = require('./utilities/helpers.js');

const reactParser = new Parser();
writeToFileAsJSON(
  './dependencies.json',
  reactParser,
  'Formatted and saved the projects Component/Container dependencies to dependencies.json!'
);
