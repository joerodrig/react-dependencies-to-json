#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const textFilesLoader = require('text-files-loader');
const ignored = require('./utilities/ignored.js');
const {validateDirectory, die} = require('./utilities/helpers.js');
const patterns = require("./utilities/patterns.js");

class Parser {
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

  _parseContainerDependencies() {
    const data = [];
    const files = textFilesLoader.loadSync(`${this.path}/containers`);
    for (let fileName in files) {
      let matches = files[fileName].match(patterns.MODULE_DEPENDENCY.detect);
      // If lines matching the detect pattern were found
      if (matches !== null && matches.length > 0) {
        data[fileName] = [];

        // Extract target pattern from lines
        for (let index in matches) {
          const result = matches[index].match(patterns.MODULE_DEPENDENCY.extract);
          if (!ignored.MODULES.includes(result[1])) {
            // NOTE: This result thing is super brittle
            // Should probably start writing specs for it
            data[fileName].push(result[1].trim());
          }
        }
      }
    }

    const formattedContainers = [];
    for (let key in data) {
      formattedContainers.push({[key]: data[key]});
    }
    this.containers = formattedContainers;
    return formattedContainers;
  }

  _parseComponentDependencies() {
    const data = [];
    const files = textFilesLoader.loadSync(`${this.path}/components`);
    for (let fileName in files) {
      let matches = files[fileName].match(patterns.MODULE_DEPENDENCY.detect);
      // If lines matching the detect pattern were found
      if (matches !== null && matches.length > 0) {
        data[fileName] = [];

        // Extract target pattern from lines
        for (let index in matches) {
          const result = matches[index].match(patterns.MODULE_DEPENDENCY.extract);
          if (!ignored.MODULES.includes(result[1])) {
            // NOTE: This result thing is super brittle
            // Should probably start writing specs for it
            data[fileName].push(result[1].trim());
          }
        }
      }
    }

    const formattedComponents = [];
    for (let key in data) {
      formattedComponents.push({[key]: data[key]});
    }
    this.components = formattedComponents;
    return formattedComponents;
  }
}

const ReactParser = new Parser();

fs.writeFile('./dependencies.json', JSON.stringify(ReactParser), (err) => {
  if (err) throw err;
  console.log('Formatted and saved the projects Component/Container dependencies to dependencies.json!');
});
