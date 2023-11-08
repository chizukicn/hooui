import type { ExtractPropTypes } from "vue";

export const demoProps = {
  github: {
    type: String,
    default: "https://github.com/chizukicn/hoci"
  },
  codeSandBox: {
    type: String,
    default: "https://codesandbox.io/"
  },
  highlightedCode: {
    type: String,
    default: ""
  },
  code: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  desc: {
    type: String,
    default: ""
  },
  lang: {
    type: String,
    default: "vue"
  },
  expand: {
    type: Boolean,
    default: false
  },
  src: {
    type: String,
    default: ""
  }
} as const;

export type ODemoProps = ExtractPropTypes<typeof demoProps>;
