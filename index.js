#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const textFilesLoader = require('text-files-loader');
const {validateDirectory, die} = require('./helpers.js');

class Parser {
  constructor() {
    this.path = this._initializePath();
    this.containerDeps = this._containerDependencies();
  }

  // Validate and return the path passed into the script
  _initializePath() {
    let argPath = "";
    program
     .arguments('<path/to/components')
     .action((basePath) => {
       const validatedDirectory = validateDirectory(basePath);
       if (validatedDirectory.isValid ) {
        argPath = basePath;
       } else {
        die(validatedDirectory.error);
       }
     })
     .parse(process.argv);

    return argPath;
  }

  _containerDependencies() {
    textFilesLoader.load(`${this.path}/containers`, (err, files) => {
      if (err) { die({ msg: err }) };

      // console.log(files);
    });
  }
}



const ReactParser = new Parser();
