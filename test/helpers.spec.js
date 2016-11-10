const chai = require('chai');
const {die, validateDirectory} = require('../utilities/helpers.js');
chai.expect();
const expect = chai.expect;

describe("helpers", () => {
  describe("die", () => {
    it("should throw an error with the given errorMsg", () => {
      const errorMsg = "I'm dying!";
      expect(() => {die(errorMsg)}).to.throw(Error, `${errorMsg}\n`);
    });
  });

  describe("validateDirectory", () => {
    // TODO: Install mock-fs to test this
  });
});
