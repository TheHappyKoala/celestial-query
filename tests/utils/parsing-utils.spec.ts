import { sliceByLines } from "src/utils/parsing-utils";

describe("sliceByLines", () => {
  it("should slice a string correctly given start and end line numbers", () => {
    const input = "bob\nskips\nto\nthe\nnext\nline";

    expect(sliceByLines(input, 1, 1)).toBe("skips\nto\nthe\nnext");
  });
});
