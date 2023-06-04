import { beforeEach, describe, expect, it } from "vitest";
import { extractPostData } from "./posts";

const title = "Title";
const content = "Content";
let testFormData;

describe("extractPostData()", () => {
  beforeEach(() => {
    testFormData = {
      title,
      content,
      get(identifier) {
        return this[identifier];
      },
    };
  });

  it("should extract title and content from the provided form data", () => {
    const data = extractPostData(testFormData);

    expect(data.title).toBe(title);
    expect(data.content).toBe(content);
  });
});

describe("savePost()", () => {
  it();
});
