var fs = require("fs");

module.exports = {
  die: (errorMsg) => {
    throw new Error(errorMsg + "\n");
  },

  validateDirectory: (path) => {
    let valid = { isValid: true, error: null };
    try {
      let stats = fs.lstatSync(path);
      if (!stats.isDirectory()) {
        valid = {
          isValid: false,
          error: `Not a directory: ${path} \n`
        };
      }
    } catch (e) {
      valid = {
        isValid: false,
        error: `Unable to read directory: ${path} \n`
      };
    }

    return valid;
  }
};
