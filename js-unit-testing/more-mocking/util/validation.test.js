import { it, expect } from "vitest";
import { validateNotEmpty } from "./validation";

it("should not throw an error if the string provided has a value", () => {
  const inputText = "sample";

  const resultFn = () => validateNotEmpty(inputText);

  expect(resultFn).not.toThrow();
});

it("should throw an error if an empty string is provided as a value", () => {
  const inputText = "";

  const resultFn = () => validateNotEmpty(inputText);

  expect(resultFn).toThrow();
});

it("should throw an error if a blank string is provided as a value", () => {
  const inputText = "   ";

  const resultFn = () => validateNotEmpty(inputText);

  expect(resultFn).toThrow();
});

it("should throw an error with the provided error message", () => {
  const inputText = "";
  const errorMessage = "Error";

  const resultFn = () => validateNotEmpty(inputText, errorMessage);

  expect(resultFn).toThrow(errorMessage);
});
