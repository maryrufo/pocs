import { it, expect } from "vitest";
import { add } from "./math";

it("should summarize all number values in an array", () => {
  // Arrange
  const numbersToAdd = [1, 2, 3];

  // Act
  const result = add(numbersToAdd);

  // Assert
  const expectedResult = numbersToAdd.reduce((prev, curr) => prev + curr, 0);
  expect(result).toBe(expectedResult);
});

it("should yield NaN if at least one provided value is undefined", () => {
  const invalidNumber = undefined;
  const numbersToAdd = [1, 2, invalidNumber];

  const result = add(numbersToAdd);

  expect(result).toBeNaN();
});

it("should yield NaN if provided value is alpha", () => {
  const invalidNumber = "a";
  const numbersToAdd = [1, 2, invalidNumber];

  const result = add(numbersToAdd);

  expect(result).toBeNaN();
});

it("should yield a correct sum if an array of numeric string values is provided", () => {
  const inputs = ["1", "2", "3"];

  const result = add(inputs);

  const expectedResult = inputs.reduce((prev, curr) => +prev + +curr, 0);
  expect(result).toBe(expectedResult);
});

it("should yield 0 if empty array is provided", () => {
  const emptyArray = [];

  const result = add(emptyArray);

  expect(result).toBe(0);
});

it("should throw an error if no value is passed into the function", () => {
  // try {
  //   add();
  // } catch (error) {
  //   expect(error).toBeDefined();
  // }

  const resultFn = () => {
    add();
  };

  expect(resultFn).toThrow();
});

it("should throw an error if provided with multiple arguments instead of an array", () => {
  const resultFn = () => {
    add(1, 2);
  };

  expect(resultFn).toThrow(/is not iterable/);
});
