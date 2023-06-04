import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
} from "vitest";

import { User } from "./hooks";

const testEmail = "test@test.com";
let user = new User(testEmail);

beforeAll(() => {
  console.log("before all");
});

beforeEach(() => {
  console.log("before Each");
});

afterAll(() => {
  console.log("after all");
});

afterEach(() => {
  user = new User(testEmail);
  console.log("after each");
});

// describe.concurrent("", () => {});
// it.concurrent("", () => {});

it("should update the email", () => {
  const newTestEmail = "test2@test.com";

  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it("should have an email property", () => {
  expect(user).toHaveProperty("email");
});

it("should store the provided email value", () => {
  expect(user.email).toBe(testEmail);
});

it("should clear the email", () => {
  user.clearEmail();

  expect(user.email).toBe("");
});

it("should still have an email property after clearing the email", () => {
  user.clearEmail();

  expect(user).toHaveProperty("email");
});
