<script setup>
import * as monaco from "monaco-editor"
import { ref, onMounted } from "vue"

const container = ref(null)
const themeColors = [
  "#577b48",
  "#6db3fd",
  "#be8770",
  "#1e1e1e",
  "#d4d4d4",
  "#3c3c3c",
  "#3c3c3c",
  "#d4d4d4",
  "#d4d4d4"
]


function updateThemeColor(colors){
  monaco.editor.defineTheme("update-theme",{
    base:"vs-dark",
    inherit:true,
    rules: [
      { token: "comment", foreground: colors[0], fontStyle: "italic" }, // 注释颜色和字体样式
      { token: "keyword", foreground: colors[1] },// 编程语言关键字颜色
      { token: "string", foreground: colors[2] },// 字符串字面量颜色
    ],
    colors:{
      "editor.background": colors[3],
      "editor.foreground": colors[4],
      "editor.lineHighlightBackground": colors[5],
      "editor.selectionBackground": colors[6],
      "editorCursor.foreground": colors[7],
      "editorLineNumber.foreground": colors[8],
    }
  })
  monaco.editor.setTheme("update-theme") // 设置全局编辑器主题
}


onMounted(async () => {
  const text = await ((await fetch("/vitepress/editor.js")).text())
  // 挂载内容和语言
  const editor = monaco.editor.create(container.value,{
    value: text,
    language:"javascript",
    minimap:{
      enabled:false
    },
    lineNumbersMinChars: 2,
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      verticalScrollbarSize: 12,
      horizontalScrollbarSize: 12,
      arrowSize: 16,
    },
    padding: {
      top: 12,
    }
  })

  // 定义和设置主题
  monaco.editor.defineTheme("default-Theme",{
    base:"vs-dark", // 根主题
    inherit: true, // 是否继承现有主题
    rules: [
      { token: "comment", foreground: "577b48", fontStyle: "italic" }, // 注释颜色和字体样式
      { token: "keyword", foreground: "6db3fd" },// 编程语言关键字颜色
      { token: "string", foreground: "be8770" },// 字符串字面量颜色
    ],
    colors: {
      // 编辑器主体
      "editor.background": "#1e1e1e",
      "editor.foreground": "#d4d4d4",
      "editor.lineHighlightBackground": "#3c3c3c",
      "editor.selectionBackground": "#3c3c3c",

      "editorCursor.foreground": "#d4d4d4",
      "editorLineNumber.foreground": "#d4d4d4",
    },
  })

  editor.updateOptions({ theme: "default-Theme" }); // 设置单个编辑器主题

  const colorInput = document.querySelectorAll("input[type=color]")

  colorInput.forEach((item,index)=>{
    item.value = themeColors[index]
    console.log(item.value)
    item.addEventListener("input",(e)=>{
      console.log(e.target.value)
      themeColors[index] = e.target.value
      updateThemeColor(themeColors)
    })
  })

  // 屏蔽编辑器右键菜单
  editor.getDomNode().addEventListener('contextmenu', function(e) {
    // 阻止 Monaco Editor 默认的右键菜单
    e.stopPropagation();
    // 允许浏览器原生菜单
    return true;
  }, true);

  // 页面大小变化时编辑器一同变化
  const resizeObserver = new ResizeObserver(() => {
    editor.layout(); // 通知编辑器更新布局
  });

  resizeObserver.observe(container.value);

  console.log(monaco.languages.getLanguages())
})


</script>

<template>
  <div id="body">
    <div id="container" ref="container"></div>
    <div id="control">
      <label for=""><input type="color" name="" id=""> 注释颜色 </label>
      <label for=""><input type="color" name="" id=""> 编程语言关键字颜色 </label>
      <label for=""><input type="color" name="" id=""> 字符串字面量颜色 </label>
      <label for=""><input type="color" name="" id=""> 编辑器背景色 </label>
      <label for=""><input type="color" name="" id=""> 文本前景色 </label>
      <label for=""><input type="color" name="" id=""> 当前行高亮背景色 </label>
      <label for=""><input type="color" name="" id=""> 选中文本背景色 </label>
      <label for=""><input type="color" name="" id=""> 光标颜色 </label>
      <label for=""><input type="color" name="" id=""> 行号前景色 </label>
    </div>
  </div>
</template>

<style scoped>
    #body{
      width: 100%;
      height: 100%;
      display: flex;
      gap: 1em ;
    }
    #container{
      width: 70%;
      height: calc(100% - 2em);
      margin: 1em 0em 1em 1em;
      border-color: rgb(255, 255, 255);
      background-color: rgb(86, 86, 86);
    }
    #control{
      display: flex;
      flex-direction: column;
      gap: 1em ;
      margin-top: 1em;
      font-size: 0.8em;
    }
</style>