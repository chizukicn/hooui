import { expect, it } from "vitest";
import { isFunction } from "@hoci/shared";

it("is-function", () => {
  expect(isFunction(() => {})).toBe(true);
});
