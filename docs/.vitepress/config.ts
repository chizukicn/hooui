import { defineConfig } from "vitepress";
import type { DefaultTheme } from "vitepress/types/default-theme";
import { demoBlockPlugin, demoblockVitePlugin } from "vitepress-theme-demoblock";

const guideSidebar = (): DefaultTheme.SidebarItem[] => {
  return [
    {
      text: "快速开始",
      link: "quickstart"
    }
  ];
};

const componentSidebar = (): DefaultTheme.SidebarItem[] => {
  return [
    {
      text: "Selection (选择器)",
      link: "selection"
    }
  ];
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "hoci",
  description: "a headless components library for vue3",
  markdown: {
    config: (md) => {
      md.use(demoBlockPlugin);
    }
  },
  vite: {
    plugins: [
      demoblockVitePlugin()
    ]
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "指南", link: "/guide/quickstart" },
      { text: "组件", link: "/component/selection" }
    ],

    sidebar: {
      "/guide/": {
        base: "/guide/",
        items: guideSidebar()
      },
      "/component/": {
        base: "/component/",
        items: componentSidebar()
      }
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/chizukicn/hoci" }
    ]
  }
});
