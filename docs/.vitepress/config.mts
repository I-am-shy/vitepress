import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  base: '/vitepress/',
  title: "shy的学习笔记",
  description: "一个文档网站",
  head:[
    ['link',{ rel: 'icon', href: '/vitepress/public/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'md语法', link: '/markdown-examples' },
      { text: "JS",
        items:[
          {text:"js爬虫",link:"/JS/Clawler"},
          {text:"js实现拍摄和录屏",link:"/JS/Video"},
          {text:"js流",link:"/JS/Stream"},
          {text:"ThreeJS 3D模型",link:"/JS/ThreeJS"},
        ]
      }
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
          { text: "js爬虫", link: "/JS/Clawler" }
        ],
        collapsed: false
      },
      {
        text: "浏览器API",
        items: [
          { text: "js实现拍摄和录屏功能", link: "/JS/Video"}
        ],
        collapsed: false
      },
      {
        text: "js流",
        items:[
          { text: "js流", link: "/JS/Stream"}
        ],
        collapsed: false
      },
      {
        text: "js动画库",
        items: [
          {text: "popmotion", link: "/JS/Animation"}
        ],
        collapsed: false
      },
      {
        text: "ThreeJS 3D模型",
        items:[
          { text: "基本概念", link: "/JS/ThreeJS"},
          { text: "初始化场景模型", link: "/JS/ThreeJS/init"},
          { text: "第一个3D场景模型", link:"/JS/ThreeJS/scene"},
          { text: "几何矩阵" , link:"/JS/ThreeJS/geometry"},
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
