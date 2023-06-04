import { it, expect, describe } from "vitest";
import { HttpError, ValidationError } from "./errors";

describe("class HttpError", () => {
  it("should contain the provided properties values", () => {
    const statusCode = "404";
    const message = "Not Found";
    const data = { key: "test" };

    const result = new HttpError(statusCode, message, data);

    expect(result.statusCode).toBe(statusCode);
    expect(result.message).toBe(message);
    expect(result.data).toBe(data);
  });

  it("should contain undefined as data if no data is provided", () => {
    const statusCode = "404";
    const message = "Not Found";

    const result = new HttpError(statusCode, message);

    expect(result.statusCode).toBe(statusCode);
    expect(result.message).toBe(message);
    expect(result.data).toBeUndefined();
  });
});

describe("ValidationError", () => {
  it("should contain the provided message", () => {
    const errorMsg = "Invalid";

    const result = new ValidationError(errorMsg);

    expect(result.message).toBe(errorMsg);
  });

  it("should contain undefined message if no message is provided", () => {
    const result = new ValidationError();

    expect(result.message).toBeUndefined();
  });
});
