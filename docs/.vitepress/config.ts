import { defineConfig } from "vitepress";


import type { DefaultTheme } from "vitepress/types/default-theme";
const guideSidebar = (): DefaultTheme.SidebarItem[] => {
  return [
    {
      text: "快速开始",
      link: "/quickstart"
    }
  ];
};
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "hoci",
  description: "a headless components library for vue3",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "指南", link: "/guide/quickstart" }
    ],

    sidebar: {
      "/guide/": {
        base: "/guide/",
        items: guideSidebar()
      }
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/chizukicn/hoci" }
    ]
  }
});
