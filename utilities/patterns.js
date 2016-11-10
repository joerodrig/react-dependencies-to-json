// Detection and extraction patterns
module.exports = {
  MODULE_DEPENDENCY: {
    detect: new RegExp(/import\s+.*\s+from\s.*/g),
    extract: new RegExp(/import\s+(.*)\s+from/),
  },
};
