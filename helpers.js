var fs = require("fs");

export function die(error) {
  throw new Error(error.msg + "\n");
}

export function checkDir(path) {
  try {
    let stats = fs.lstatSync(path);
    if (!stats.isDirectory()) {
      throw new Error(`Not a directory: ${path} \n`);
    }
  } catch (e) {
    throw new Error(`Unable to read directory: ${path} \n`);
  }
}
