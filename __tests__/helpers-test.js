const {die, validateDirectory} = require('../utilities/helpers.js');

describe("helpers", () => {
  describe("die", () => {
    it("should throw an error with the given errorMsg", () => {
      const errorMsg = "I'm dying!";
      expect(() => {die(errorMsg)}).toThrow(Error, `${errorMsg}\n`);
    });
  });

  describe("validateDirectory", () => {
    // TODO: Install mock-fs to test this
  });
});
