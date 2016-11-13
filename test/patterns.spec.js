
const chai = require('chai');
const {MODULE_DEPENDENCY} =  require("../utilities/patterns.js");
chai.expect();
const expect = chai.expect;


describe("patterns", () => {
  // ACTION Pattern Specs
  describe("MODULE_DEPENDENCY", () => {
    describe("detect", () => {
      it("should be a RegExp", () => {
        expect(MODULE_DEPENDENCY.detect).to.be.a("RegExp");
      });

      it("should match each variation", () => {
        let tests = [
          "import DemoComponent from './demo/DemoComponent.js",
          "import {DemoComponent} from './demo/DemoComponent.js",
          "import { DemoComponent } from './demo/1/2/3/DemoComponent.js",
          "import { DemoComponent, DemoTwo } from './demo/1/2/3/DemoComponent.js",
        ];

        for (let test of tests) {
          expect(test.match(MODULE_DEPENDENCY.detect)).to.be.eql([test]);
        }
      });

      it("should be null for each variation", () => {
        let tests = [
          "export defaul function test()",
          "export cons TEST_ACTION",
          "export completely wrong syntax",
          "expot const TEST_ACTION",
        ];

        for (let test of tests) {
          expect(test.match(MODULE_DEPENDENCY.detect)).to.be.null;
        }
      });
    });
    describe("extract", () => {
      it("should be a RegExp", () => {
        expect(MODULE_DEPENDENCY.detect).to.be.a("RegExp");
      });

      // it ("should get the component name", () => {
      //   let tests = [
      //     "import DemoComponent from './demo/DemoComponent.js",
      //     "import {DemoComponent} from './demo/DemoComponent.js",
      //     "import { DemoComponent } from './demo/1/2/3/DemoComponent.js",
      //   ];
      //
      //   for (let test of tests) {
      //     expect(test.match(MODULE_DEPENDENCY.extract)).to.be.eql([test]);
      //   }
      // });
    });
  });

});
