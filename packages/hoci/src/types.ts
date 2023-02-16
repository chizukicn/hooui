export type ClassType = string | string[] | Record<string, any>;

export type ActivateEvent =
  | "click"
  | "mouseenter"
  | "mousedown"
  | "mouseup"
  | "dblclick"
  | "contextmenu"
  | "touchstart"
  | "touchend";

export type ElementLike = JSX.Element | string | ElementLike[];
