import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "shy的学习笔记",
  description: "一个文档网站",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'md语法',
        items: [
          { text: 'Markdown 例子', link: '/markdown-examples' },
          { text: '运行时 API 例子', link: '/api-examples' }
        ]
      },
      {
        text: "js爬虫",
        items:[
          { text: "js爬虫", link: "/jsClawler" }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
