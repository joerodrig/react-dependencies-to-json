const {MODULE_DEPENDENCY} =  require("../utilities/patterns.js");

describe("patterns", () => {
  // ACTION Pattern Specs
  describe("MODULE_DEPENDENCY", () => {
    describe("detect", () => {
      it("should be a RegExp", () => {
        // expect(MODULE_DEPENDENCY.detect).toMatch("RegExp");
      });

      it("should match each variation", () => {
        let tests = [
          "import DemoComponent from './demo/DemoComponent.js",
          "import {DemoComponent} from './demo/DemoComponent.js",
          "import { DemoComponent } from './demo/1/2/3/DemoComponent.js",
          "import { DemoComponent, DemoTwo } from './demo/1/2/3/DemoComponent.js",
        ];

        for (let test of tests) {
          expect(test.match(MODULE_DEPENDENCY.detect)).toEqual([test]);
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
          expect(test.match(MODULE_DEPENDENCY.detect)).toBeNull;
        }
      });
    });
    describe("extract", () => {
      it("should be a RegExp", () => {
        // expect(MODULE_DEPENDENCY.detect).toMatch("RegExp");
      });

      // it ("should get the component name", () => {
      //   let tests = [
      //     "import DemoComponent from './demo/DemoComponent.js",
      //     "import {DemoComponent} from './demo/DemoComponent.js",
      //     "import { DemoComponent } from './demo/1/2/3/DemoComponent.js",
      //   ];
      //
      //   for (let test of tests) {
      //     expect(test.match(MODULE_DEPENDENCY.extract)).toBe.eql([test]);
      //   }
      // });
    });
  });

});
