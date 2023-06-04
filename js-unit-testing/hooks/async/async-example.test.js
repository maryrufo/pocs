import { it, expect } from "vitest";
import { generateToken, generateTokenPromise } from "./async-example";

it("should generate a token value", (done) => {
  const testUserEmail = "email@mail.com";

  generateToken(testUserEmail, (err, token) => {
    // expect(token).toBeDefined();
    // done();

    // expect(token).toBe(2);
    // done();

    try {
      expect(token).toBeDefined();
      // expect(token).toBe(2);
      done();
    } catch (err) {
      done(err);
    }
  });
});

it("should generate a token value", () => {
  const testUserEmail = "email@mail.com";

  return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
  // return expect(generateTokenPromise(testUserEmail)).resolves.toBe(2);
});

it("should generate a token value", async () => {
  const testUserEmail = "email@mail.com";

  const token = await generateTokenPromise(testUserEmail);

  expect(token).toBeDefined();
  // expect(token).toBe(2);
});
