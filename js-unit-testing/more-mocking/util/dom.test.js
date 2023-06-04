import { beforeEach, expect, it, vi } from "vitest";
import fs from "fs";
import path from "path";
import { Window } from "happy-dom";
import { showError } from "./dom";

const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;
vi.stubGlobal("document", document);

beforeEach(() => {
  //should clear first to achieve clean overwrite of body
  document.body.innerHTML = "";
  document.write(htmlDocContent);
});

it("should add an error paragraph to the id='errors' element", () => {
  showError("error");

  const errorsElement = document.getElementById("errors");
  const errorsParagraph = errorsElement.firstElementChild;

  expect(errorsParagraph).not.toBeNull();
});

it("should not contain an error paragraph initially", () => {
  const errorsElement = document.getElementById("errors");
  const errorsParagraph = errorsElement.firstElementChild;

  expect(errorsParagraph).toBeNull();
});

it("should output the provided message in the error paragraph", () => {
  const errorMessage = "error";
  showError(errorMessage);

  const errorsElement = document.getElementById("errors");
  const errorsParagraph = errorsElement.firstElementChild;

  expect(errorsParagraph.textContent).toBe(errorMessage);
});
