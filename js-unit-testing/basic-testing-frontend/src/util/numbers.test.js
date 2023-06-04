import { expect, it, describe } from "vitest";
import { cleanNumbers, transformToNumber } from "./numbers";

describe("transformToNumber()", () => {
  it("should return number if numeric string is passed", () => {
    const input = "1";

    const result = transformToNumber(input);

    expect(result).toStrictEqual(1);
  });

  it("should transform a string number to a type number", () => {
    const input = "1";

    const result = transformToNumber(input);

    expect(result).toBeTypeOf("number");
  });

  it("should yield NaN for undefined value", () => {
    const input = undefined;

    const result = transformToNumber(input);

    expect(result).toBeNaN();
  });

  it("should yield NaN for alpha", () => {
    const input = "a";

    const result = transformToNumber(input);

    expect(result).toBeNaN();
  });
});

describe("cleanNumbers()", () => {
  it("should return an array of number values if an array of string number values is provided", () => {
    const inputs = ["1", "2"];

    const result = cleanNumbers(inputs);

    // expect(result[0]).toBeTypeOf("number");

    // result.forEach((number) => {
    //   expect(number).toBeTypeOf("number");
    // });

    expect(result).toEqual([1, 2]); // toBe() vs toEqual()
  });

  it("should throw an error if a number is provided", () => {
    const inputs = ["1", 2];

    const cleanFn = () => cleanNumbers(inputs);

    expect(cleanFn).toThrow();
  });

  it("should throw an error if empty string is provided", () => {
    const inputs = ["1", ""];

    const cleanFn = () => cleanNumbers(inputs);

    expect(cleanFn).toThrow(/must not be empty/);
  });
});
