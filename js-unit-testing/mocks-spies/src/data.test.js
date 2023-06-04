import { describe, expect, it, vi } from "vitest";
import { generateReportData } from "./data";

describe("generateReportData", () => {
  it("should execute logFn if provided", () => {
    // spies
    const loggger = vi.fn();

    generateReportData(loggger);

    expect(loggger).toBeCalled();
  });
});
