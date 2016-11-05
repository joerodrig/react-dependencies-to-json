#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const textFilesLoader = require('text-files-loader');
const {validateDirectory, die} = require('./helpers.js');
const patterns = require("./patterns.js");

class Parser {
  constructor() {
    this.path = this._initializePath();
    this.containers = [];
    this._setContainerDependencies();
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

  _setContainerDependencies() {
    const data = [];
    const loadContainersPromise = new Promise((resolve, reject) => {
      textFilesLoader.load(`${this.path}/containers`, (err, files) => {
        if (err) { die({ msg: err }) };
        const ignore = [
          null,
          "React, {Component, PropTypes}",
          "React, {PropTypes}",
          "{Component, PropTypes}",
          "humps",
          "sync",
          "{connect}",
          "actions",
          "* as contacts",
          "{Provider}",
          "store",
        ];

        for (let fileName in files) {
          let matches = files[fileName].match(patterns.MODULE_DEPENDENCY.detect);
          // If lines matching the detect pattern were found
          if (matches !== null && matches.length > 0) {
            data[fileName] = [];

            // Extract target pattern from lines
            for (let index in matches) {
              const result = matches[index].match(patterns.MODULE_DEPENDENCY.extract);
              if (!ignore.includes(result[1])) {
                // NOTE: This result thing is super brittle
                // Should probably start writing specs for it
                data[fileName].push(result[1].trim());
              }
            }
          }
        }
        setTimeout(resolve, 100, data);
      });
    })

    Promise.all([loadContainersPromise]).then(containersWithDependencies => {
      this.containers = containersWithDependencies;
    });
  }
}

const ReactParser = new Parser();
