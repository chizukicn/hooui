import {expect, test} from "vitest";
import {isFunction} from "@hoci/shared"

test("is-function",()=>{
  expect(isFunction(()=>{})).toBe(true)
})
