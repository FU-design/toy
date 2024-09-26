<template>
  <div v-upgradeCodeBlock v-dompurify-html="markdownContent" class="markdown-body">
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, nextTick } from 'vue'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { copyText } from '@/utils/tool'
import { message } from 'ant-design-vue'
import hljs from "highlight.js";

type Props = {
  markRaw: string
}

const props = withDefaults(defineProps<Props>(), {
  markRaw: ''
})

const { markRaw } = toRefs(props)
const markdownContent = computed(() => parseMDByHighlight(markRaw.value))

const copyCode = (code: string) => {
  copyText(code)
    .then(() => {
      message.success('copy success')
    })
    .catch((err: Error) => {
      message.error('copy fail')
      console.log('err :>> ', err)
    })
}

const upgradeCodeBlock = async (el: HTMLElement) => {
  await nextTick() // 静态 markdown 文件解析时需要添加
  const pres = el.querySelectorAll('pre')
  pres.forEach((pre) => {
    const code = pre.querySelector('code')
    const langTag = pre.querySelector('#language')
    const copyTag = pre.querySelector('#copy')

    langTag!.textContent = (code?.classList.value.replace('hljs language-', '') as string).toLowerCase()
    copyTag && copyTag.removeEventListener('click', () => copyCode(code?.textContent || ''))
    copyTag?.addEventListener('click', () => copyCode(code?.textContent || ''))
  })
}

const upgradedCodeBlock = (parsedMarked: string) => {
  const upgradeParts = `<pre style="padding:0"><div class="code-block-head"><label id="language">Code</label><button id="copy">copy</button></div>`
  return parsedMarked.replace(/<pre>/g, upgradeParts)
}

const getMarkedHighlightOps = () => {
  return markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  })
}

const parseMDByHighlight = (content: string) => {
  const marked = new Marked(getMarkedHighlightOps())
  return upgradedCodeBlock(marked.parse(content) as string)
}

const vUpgradeCodeBlock = {
  updated: upgradeCodeBlock,
  mounted: upgradeCodeBlock
}
</script>


<style lang="scss" scoped></style>
