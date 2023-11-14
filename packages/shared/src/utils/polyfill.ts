import { createVNode, isVUe3 } from "vue-demi";

export const h = isVUe3
  ? createVNode
  : (tag: any, props: any, children: any) => {
      return h(tag, props, children);
    };

