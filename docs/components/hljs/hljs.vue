<script setup>
import { ref, onMounted } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import  './index.css'

const code = ref(null)

hljs.registerLanguage('javascript', javascript)

onMounted(async () => {
  if (code.value) {
    code.value.textContent = (await (await fetch("/vitepress/hljs.js")).text()).split("\n").slice(0, -1).join("\n");
    hljs.highlightElement(code.value)
  }
})

</script>

<template>
<div class="container theme-atom-one-dark">
    <pre>
      <code ref="code" class="language-javascript" ></code>
    </pre>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 0;
  padding-bottom: 0;
  height: fit-content;
  background-color: #1e1e2f;
}
.container code::-webkit-scrollbar{
  background-color: #6a6a6a;
  height: 0.4em;
  border-radius: 0.4em;
}
.container code::-webkit-scrollbar-thumb{
  background-color: #b5b5b5;
  border-radius: 0.4em;
}
</style>