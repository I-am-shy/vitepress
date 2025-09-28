import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  base: '/vitepress/',
  title: "shy的学习笔记",
  description: "一个文档网站",
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/vitepress/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      {
        text: '页面配置', items: [
          { text: 'md语法', link: '/markdown-examples' },
          { text: '页面配置参考', link: '/api-examples' },
        ]
      },
    ],

    sidebar: [
      {
        text: '前端开发能力',
        link: '/target'
      },
      {
        text: "JS",
        items: [
          {
            text: "js native",
            items: [
              {
                text: "Samples",
                items: [
                  { text: "实现拍摄和录屏功能", link: "/JS/native/Video/" },
                  { text: "Stream 流", link: "/JS/native/Stream/" },
                  { text: "执行终端命令", link: "/JS/native/exec/" },
                  { text: "实现终端流式输出", link: "/JS/native/console/" },
                  { text: "自定义事件", link: "/JS/native/event/" },
                  { text: "长轮询 和 SSE", link: "/JS/native/sse/" },
                ],
                collapsed: true
              },
              { text: "JS(TS) 代码片段", link: "/JS/native/script/" },
            ],
            collapsed: false
          },
          {
            text: "js lib",
            items: [
              {
                text: "js动画库",
                items: [
                  { text: "popmotion", link: "/JS/lib/Animation/" }
                ],
                collapsed: true
              },
              {
                text: "ThreeJS 3D模型",
                items: [
                  { text: "基本概念", link: "/JS/lib/ThreeJS/" },
                  { text: "初始化场景模型", link: "/JS/lib/ThreeJS/init" },
                  { text: "第一个3D场景模型", link: "/JS/lib/ThreeJS/scene" },
                  { text: "几何矩阵", link: "/JS/lib/ThreeJS/geometry" },
                  { text: "ThreeJS 示例", link: "/JS/lib/ThreeJS/example" },
                ],
                collapsed: true
              },
              {
                text: "Express",
                items: [
                  { text: "express 框架", link: "/JS/lib/Express/" },
                  { text: "express 命令行工具", link: "/JS/lib/Express/express-server" },
                ],
                collapsed: true
              },
              {
                text: "js爬虫", items: [
                  { text: "爬虫示例", link: "/JS/lib/Clawler/" },
                  { text: "puppeteer", link: "/JS/lib/Clawler/puppeteer" },
                  { text: "puppeteer 和浏览器自动化", link: "/JS/lib/Clawler/auto-page" },
                ],
                collapsed: true
              },
              { text: "http-server", link: "/JS/lib/http-server/" },
              { text: "html转markdown", link: "/JS/lib/Turndown/" },
              { text: "2d物理引擎", link: "/JS/lib/Matter/" },
              { text: "robotjs", link: "/JS/lib/Robotjs/" },
              { text: "Monaco Editor", link: "/JS/lib/Monaco/" },
              { text: "highlight.js", link: "/JS/lib/hljs/" },
            ],
            collapsed: false
          },
          { text: "Deno", link: "/JS/Deno/" },
        ],
        collapsed: false
      },
      {
        text: "TS",
        items: [
          { text: "在任意位置运行ts", link: "/TS/run-TS/" },
          { text: "TS 类型工具", link: "/TS/type-tools/" },
        ],
        collapsed: false
      },
      {
        text: "npm",
        items: [
          { text: "npm", link: "/npm/" },
          { text: "npm发布包", link: "/npm/publish" },
        ],
        collapsed: false
      },
      {
        text: "vscode插件",
        items: [
          { text: "vscode插件开发", link: "/vscodeExtensions/" },
          { text: "vscode文本编辑API", link: "/vscodeExtensions/textEditor" },
          { text: "vscode用户代码片段", link: "/vscodeExtensions/userCode" }
        ],
        collapsed: false
      },
      {
        text: "docker",
        items: [
          { text: "docker安装", link: "/docker/" },
          { text: "docker基本命令", link: "/docker/command" },
          { text: "docker打包网页", link: "/docker/build" },
        ],
        collapsed: false
      },
      {
        text: "其他",
        items: [
          { text: "YAML", link: "/other/yaml/" },
          { text: "常用的git命令", link: "/other/git/" },
          { text: "git修改pr", link: "/other/git/pr" },
          { text: "git配置", link: "/other/git/config" },
          { text: "常用的unix命令", link: "/other/unix/" },
          { text: "XPath", link: "/other/xPath/" },
          { text: "wireguard", link:"/other/wireguard/"},
          { text: "clash", link: "/other/clash/" },
          { text: "更多", link: "/other/more/" }
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

    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    outline: {
      level: [2, 4],
      label: "此页面"
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },
  vite: {
    assetsInclude: ['**/*.PNG', '**/*.png'],
    resolve: {
      // alias: {
      //   'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api'
      // }
    },
    ssr: {
      noExternal: ['monaco-editor']
    }
  },
  sitemap: {
    hostname: "https://i-am-shy.github.io/vitepress/"
  }
})
