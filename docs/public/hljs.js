import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

const code = document.getElementById('code');

code.textContent = (await (await fetch("vitepress/index.js")).text()).split("\n").slice(0,-1).join("\n");

hljs.registerLanguage('javascript', javascript);
hljs.highlightElement(code, { language: "javascript" });