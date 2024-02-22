import type { ElementLike } from "../types";

export function getFirstChilld(children: ElementLike[]): ElementLike {
  const first = children[0];
  if (Array.isArray(first) && first.length === 1) {
    return getFirstChilld(first);
  }
  return first;
}
