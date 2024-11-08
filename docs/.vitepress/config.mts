import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "shy的学习笔记",
  description: "一个文档网站",
  head:[
    ['link',{ rel: 'icon', href: '/public/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'md语法', link: '/markdown-examples' },
      { text: "JS",items:[
        {text:"js爬虫",link:"/js-clawler/jsClawler"},
        {text:"js实现拍摄和录屏",link:"/js-video/jsVideo"}
      ]}
    ],

    sidebar: [
      {
        text: 'md语法',
        items: [
          { text: 'Markdown 例子', link: '/markdown-examples' },
          { text: '运行时 API 例子', link: '/api-examples' }
        ],
        collapsed: false
      },
      {
        text: "js爬虫",
        items:[
          { text: "js爬虫", link: "/js-clawler/jsClawler" }
        ],
        collapsed: false
      },
      {
        text: "浏览器API",
        items: [
          { text: "js实现拍摄和录屏功能", link: "/js-video/jsVideo"}
        ],
        collapsed: false
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/I-am-shy/vitepress' }
    ],

    search: {
      provider: 'local'
    }

  }
})
