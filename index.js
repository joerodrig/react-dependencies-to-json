#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');


class Parser {
  constructor() {
    this.path = this._initializePath();
  }

  _initializePath() {
    program
      .arguments('<path/to/components')
      .action( (path) => {
        console.log(`path: ${path}`)
      })
      .parse(process.argv);
  }
}

const ReactParser = new Parser();
