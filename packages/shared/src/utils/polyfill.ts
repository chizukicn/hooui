import { h as createElement, isVue3 } from "vue-demi";

const keywords = ["on", "nativeOn", "class", "style", "ref", "refInFor", "staticClass", "staticStyle", "key", "slot", "scopedSlots"];

const filterByKeywords = (obj: Record<string, any>) => {
  const entries = Object.entries(obj);
  return Object.fromEntries(entries.filter(([key]) => !keywords.includes(key) && !key.startsWith("on")));
};

const transfromOn = (eventName: string) => {
  if (eventName.startsWith("on")) {
    eventName = eventName.slice(2);
    eventName = eventName[0].toLowerCase() + eventName.slice(1);
  }
  return eventName;
};


export const h: typeof createElement = isVue3
  ? createElement
  : (tag: any, props: any, children?: any) => {
      const on = Object.fromEntries(Object.entries(props).filter(([key]) => key.startsWith("on")).map(([key, value]) => [transfromOn(key), value])) as Record<string, Function>;
      const renderProps = Object.fromEntries(Object.entries(props).filter(([key]) => keywords.includes(key)));
      const componentProps = filterByKeywords(props);
      return createElement(tag, {
        props: componentProps,
        ...renderProps,
        on
      }, children);
    };

