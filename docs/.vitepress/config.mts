import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  base: '/vitepress/',
  title: "shy的学习笔记",
  description: "一个文档网站",
  lastUpdated: true,
  head:[
    ['link',{ rel: 'icon', href: '/vitepress/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'md语法', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'md语法',
        items: [
          { text: 'Markdown语法参考', link: '/markdown-examples' },
          { text: '页面配置参考', link: '/api-examples' }
        ],
        collapsed: false
      },
      {
        text: "JS",
        items:[
          {
            text: "浏览器API",
            items: [
              { text: "js实现拍摄和录屏功能", link: "/JS/Video/"}
            ],
            collapsed: true
          }, 
          {
            text: "js动画库",
            items: [
              {text: "popmotion", link: "/JS/Animation/"}
            ],
            collapsed: true
          },
          {
            text: "ThreeJS 3D模型",
            items:[
              { text: "基本概念", link: "/JS/ThreeJS/"},
              { text: "初始化场景模型", link: "/JS/ThreeJS/init"},
              { text: "第一个3D场景模型", link:"/JS/ThreeJS/scene"},
              { text: "几何矩阵" , link:"/JS/ThreeJS/geometry"},
            ],
            collapsed: true
          },
          { text: "Deno",link: "/JS/Deno/"},
          { text: "js爬虫", link: "/JS/Clawler/" },
          { text: "js流", link: "/JS/Stream/"},
          { text: "http-server",link: "/JS/http-server/"},
          { text: "html转markdown", link: "/JS/Turndown/"},
          { text: "2d物理引擎", link: "/JS/Matter/"},
        ],
        collapsed: false
      },
      {
        text: "TS",
        items:[
          {text: "在任意位置运行ts", link: "/TS/run-TS/"}
        ],
        collapsed: false
      },
      {
        text: "vscode插件",
        items:[
          {text: "vscode插件开发", link: "/vscodeExtensions/"},
          {text: "vscode文本编辑API", link: "/vscodeExtensions/textEditor"},
          {text: "vscode用户代码片段", link: "/vscodeExtensions/userCode"}
        ],
        collapsed: false
      },
      {
        text: "docker",
        items:[
          {text: "docker安装", link: "/docker/"},
        ],
        collapsed: false
      },
      {
        text: "其他",
        items:[
          {text: "YAML", link: "/other/yaml/"},
          {text: "常用的git命令", link: "/other/git/"},
          {text: "git修改pr", link: "/other/git/pr"},
          {text: "git配置", link: "/other/git/config"},
          {text: "常用的unix命令", link: "/other/unix/"},
          {text: "XPath", link: "/other/xPath/"},
          {text: "更多", link: "/other/more/"}
        ],
        collapsed: false
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/I-am-shy/vitepress' }
    ],

    search: {
      provider: 'local'
    },

    lastUpdated:{
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    outline:{
      level: [2, 4],
      label: "此页面"
    },

    docFooter:{
      prev: '上一页',
      next: '下一页'
    }
  },
  vite: {
    assetsInclude: ['**/*.PNG', '**/*.png']
  }
})
