import { expect } from "chai";
import logger from "../../src/utils/logger";

describe("logger.ts", () => {
  it("create a logger", () => {
    // tslint:disable-next-line: no-unused-expression
    expect(logger).to.not.be.null;
  });
});
