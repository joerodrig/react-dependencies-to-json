#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const textFilesLoader = require('text-files-loader');
const ignored = require('./ignored.js');
const {validateDirectory, die} = require('./helpers.js');
const patterns = require("./patterns.js");


module.exports = class Parser {
  constructor() {
    this.path = this._initializePath();
    this.containers = [];
    this.components = [];
    this._parseComponentDependencies();
    this._parseContainerDependencies();
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

  _parseFiles(path, pattern) {
    const data = [];
    const files = textFilesLoader.loadSync(path);
    for (let fileName in files) {
      let matches = files[fileName].match(pattern.detect);
      // If lines matching the detect pattern were found
      if (matches !== null && matches.length > 0) {
        data[fileName] = [];

        // Extract target pattern from lines
        for (let index in matches) {
          const result = matches[index].match(pattern.extract);
          if (!ignored.MODULES.includes(result[1])) {
            // NOTE: This result thing is super brittle
            // Should probably start writing specs for it
            data[fileName].push(result[1].trim());
          }
        }
      }
    }

    const formattedItems = [];
    for (let key in data) {
      formattedItems.push({[key]: data[key]});
    }

    return formattedItems;
  }

  _parseContainerDependencies() {
    this.containers = this._parseFiles(
      `${this.path}/containers`,
      patterns.MODULE_DEPENDENCY
    )
    return this.containers;
  }

  _parseComponentDependencies() {
    this.containers = this._parseFiles(
      `${this.path}/components`,
      patterns.MODULE_DEPENDENCY
    )
    return this.components;
  }
}
