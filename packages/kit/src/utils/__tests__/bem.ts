import { createModule } from "../bem";

describe("bem", () => {
  it("gets block", () => {
    const module = createModule("block");
    expect(module()).toStrictEqual({ block: "block" });
  });
  it("gets block and element", () => {
    const module = createModule("block", "element");
    const expected = {
      block: "block",
      element: "block__element",
    };
    expect(module()).toStrictEqual(expected);
  });
  it("gets block and camelCased element property", () => {
    const module = createModule("block", "one-element");
    const expected = {
      block: "block",
      oneElement: "block__one-element",
    };
    expect(module()).toStrictEqual(expected);
  });
  it("gets block and multiple elements", () => {
    const module = createModule("block", ["element", "second-element"]);
    const expected = {
      block: "block",
      element: "block__element",
      secondElement: "block__second-element",
    };
    expect(module()).toStrictEqual(expected);
  });
  it("gets block and no boolean modifier", () => {
    const module = createModule(["block", "test"]);
    const expected = { block: "block" };
    expect(module()).toStrictEqual(expected);
  });
  it("gets block and boolean modifier", () => {
    const module = createModule<{ test: boolean }>(["block", "test"]);
    const expected = { block: "block block--test" };
    expect(module({ test: true })).toStrictEqual(expected);
  });
  it("gets block and multiple choice modifier classes", () => {
    const module = createModule<{ test: "one" | "two" | "three" }>([
      "block",
      ["test", ["one", "two", "three"]],
    ]);
    const expected = { block: "block block--test-two" };
    expect(module({ test: "two" })).toStrictEqual(expected);
  });
});
