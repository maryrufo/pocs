import { expect, it } from "vitest";
import { transformToNumber } from "./numbers";

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
