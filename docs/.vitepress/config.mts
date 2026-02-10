import { defineConfig } from 'vitepress'
import { MermaidMarkdown, MermaidPlugin } from "vitepress-plugin-mermaid";

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
                  { text: "实现拍摄和录屏功能", link: "/js/native/video/" },
                  { text: "Stream 流", link: "/js/native/stream/" },
                  { text: "执行终端命令", link: "/js/native/exec/" },
                  { text: "实现终端流式输出", link: "/js/native/console/" },
                  { text: "自定义事件", link: "/js/native/event/" },
                  { text: "长轮询 和 SSE", link: "/js/native/sse/" },
                ],
                collapsed: true
              },
              { text: "JS(TS) 代码片段", link: "/js/native/script/" },
            ],
            collapsed: false
          },
          {
            text: "js lib",
            items: [
              {
                text: "js 动画库",
                items: [
                  { text: "popmotion", link: "/js/lib/animation/" }
                ],
                collapsed: true
              },
              {
                text: "ThreeJS 3D 模型",
                items: [
                  { text: "基本概念", link: "/js/lib/threejs/" },
                  { text: "初始化场景模型", link: "/js/lib/threejs/init" },
                  { text: "第一个 3D 场景模型", link: "/js/lib/threejs/scene" },
                  { text: "几何矩阵", link: "/js/lib/threejs/geometry" },
                  { text: "ThreeJS 示例", link: "/js/lib/threejs/example" },
                ],
                collapsed: true
              },
              {
                text: "Express",
                items: [
                  { text: "express 框架", link: "/js/lib/express/" },
                  { text: "express 命令行工具", link: "/js/lib/express/express-server" },
                ],
                collapsed: true
              },
              {
                text: "js爬虫", items: [
                  { text: "爬虫示例", link: "/js/lib/clawler/" },
                  { text: "puppeteer", link: "/js/lib/clawler/puppeteer" },
                  { text: "puppeteer 和浏览器自动化", link: "/js/lib/clawler/auto-page" },
                ],
                collapsed: true
              },
              { text: "http-server", link: "/js/lib/http-server/" },
              { text: "html转markdown", link: "/js/lib/turndown/" },
              { text: "2d 物理引擎", link: "/js/lib/matter/" },
              { text: "robotjs", link: "/js/lib/robotjs/" },
              { text: "Monaco Editor", link: "/js/lib/monaco/" },
              { text: "highlight.js", link: "/js/lib/hljs/" },
              { text: "redis", link: "/js/lib/redis/" },
              { text: "socket.io", link: "/js/lib/socketio/" },
              { text: "ora", link: "/js/lib/ora/" },
              { text: "chalk", link: "/js/lib/chalk/" },
              { text: "inquirer", link: "/js/lib/inquirer/" },
            ],
            collapsed: false
          },
          { text: "Deno", link: "/js/deno/" },
        ],
        collapsed: false
      },
      {
        text: "TS",
        items: [
          { text: "在任意位置运行 ts", link: "/ts/run-ts/" },
          { text: "TS 类型工具", link: "/ts/type-tools/" },
        ],
        collapsed: false
      },
      {
        text: "npm",
        items: [
          { text: "npm", link: "/npm/" },
          { text: "npm 发布包", link: "/npm/publish" },
        ],
        collapsed: false
      },
      {
        text: "vscode插件",
        items: [
          { text: "vscode 插件开发", link: "/vscode-extensions/" },
          { text: "vscode 文本编辑 API", link: "/vscode-extensions/text-editor" },
          { text: "vscode 用户代码片段", link: "/vscode-extensions/user-code" }
        ],
        collapsed: false
      },
      {
        text: "浏览器扩展",
        items: [
          { text: "chrome 浏览器扩展", link: "/chrome-extensions/" },
        ],
        collapsed: false
      },
      {
        text: "git",
        items: [
          { text: "常用的 git 命令", link: "/git/" },
          { text: "git 修改 pr", link: "/git/pr" },
          { text: "git 配置", link: "/git/config" },
          { text: "git 恢复已删除的分支（文件变更）", link: "/git/reflog" },
          { text: "git 提交指定 commit", link: "/git/cherry-pick" },
          { text: "git hooks", link: "/git/githooks" },
          { text: "git 大小写更改的提交问题", link: "/git/case" },
        ],
        collapsed: false
      },
      {
        text: "Terminal",
        items: [
          { text: "unix 命令", link: "/terminal/unix/" },
          { text: "vim 编辑器", link: "/terminal/vim/" },
          { text: "shell 脚本", link: "/terminal/shell/" },
        ],
        collapsed: false
      },
      {
        text: "docker",
        items: [
          { text: "docker 安装", link: "/docker/" },
          { text: "docker 基本命令", link: "/docker/command" },
          { text: "docker 打包网页", link: "/docker/build" },
        ],
        collapsed: false
      },
      {
        text: "AI",
        items: [
          { text: "AI 相关概念", link: "/ai/" },
          { text: "函数（工具）调用", link: "/ai/function-calling" },
          { text: "MCP 工具", link: "/ai/mcp-server" },
        ],
        collapsed: false
      },
      {
        text: "其他",
        items: [
          { text: "YAML", link: "/other/yaml/" },
          { text: "XML", link: "/other/xml/" },
          { text: "XPath", link: "/other/x-path/" },
          { text: "wireguard", link: "/other/wireguard/" },
          { text: "clash", link: "/other/clash/" },
          { text: "vercel", link: "/other/vercel/" },
          { text: "正则表达式", link: "/other/regular/" },
          { text: "更多", link: "/other/more/" }
        ],
        collapsed: false
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/i-am-shy/vitepress' }
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
    plugins: [MermaidPlugin()], // 添加插件
    assetsInclude: ['**/*.PNG', '**/*.png'],
    resolve: {
      // alias: {
      //   'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api'
      // }
    },
    optimizeDeps: {
      include: ['monaco-editor', "mermaid"], // 优化依赖
    },
    ssr: {
      // noExternal: ['monaco-editor',"mermaid"]
    }
  },
  sitemap: {
    hostname: "https://i-am-shy.github.io/vitepress/"
  },
  markdown: {
    config: (md) => {
      md.use(MermaidMarkdown); // 添加 Mermaid 支持
    },
    // lineNumbers: true // 代码块显示行号
  }
});
