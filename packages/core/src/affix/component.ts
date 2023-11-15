import { defineComponent } from "vue-demi";
import { renderSlot } from "tslx";
import { affixProps, useAffix } from "@hoci/core";
import { h } from "@hoci/shared";

export const HiAffix = /* #__PURE__ */defineComponent({
  name: "HiAffix",
  props: {
    ...affixProps,
    as: {
      type: String,
      default: "div"
    }
  },
  setup(props, context) {
    const { className, wrapperRef, isFixed, placeholderStyle, fixedStyle } = useAffix(props, context);

    return () => h(props.as, { ref: wrapperRef },
      [
        isFixed.value && h("div", { style: placeholderStyle.value }),
        h("div", { class: className.value, style: fixedStyle.value }, renderSlot(context.slots, "default"))
      ]
    );
  }
});
