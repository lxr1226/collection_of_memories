<template>
  <div class="box">
    <div class="head-portrait">
      <div v-for="(content, isAI, index) in combinedContents" :key="index">
        <div v-if="index % 2 !== 0 && isAI">
          <AI :newContent="content" />
        </div>
        <div v-else>
          <User :newContent="content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineExpose, watch } from 'vue'
import AI from '../content/content-page/Ai.vue'
import User from '../content/content-page/User.vue'

// 使用 defineProps 定义 props，接收从父组件传递过来的数据
const props = defineProps({
  receivedData: {
    type: String,
    default: ''
  },
  isAI: {
    type: Boolean
  }
})

// 对话框内容数组
const dialogContents = ref<string[]>([])

// 添加新的对话框内容，并根据对话框类型和前一个对话框的类型来确定位置
const addDialog = (content: string, isAI: boolean) => {
  // 如果数组为空，直接添加对话框内容
  if (dialogContents.value.length === 0) {
    dialogContents.value.push(content)
    // 更新合并后的对话内容数组
    updateCombinedContents()
  } else {
    // 获取前一个对话框的类型
    const prevIsAI = isAIAtIndex(dialogContents.value.length - 1)
    // 检查前一个对话框的类型和当前对话框的类型是否相同
    if (prevIsAI !== isAI) {
      // 如果相同，则将内容添加到上一个对话框里
      dialogContents.value[dialogContents.value.length - 1] = content
      updateCombinedContents()
    } else {
      // 如果不同类型，则添加对话框内容
      dialogContents.value.push(content)
      updateCombinedContents()
    }
  }
}

// 根据索引判断对话框类型（AI 或 User）
const isAIAtIndex = (index: number) => {
  console.log(index)
  return index % 2 === 0
}

// 合并对话框内容数组
const combinedContents = ref<string[]>([])

// 监听 props 中的 receivedData 和 isAI 的变化，以便更新对话内容
watch(
  () => props.receivedData,
  (newValue, oldValue) => {
    console.log('newValue:', newValue, 'oldValue:', oldValue)
    addDialog(newValue, props.isAI)
    console.log(props.isAI)
  }
)

// 更新合并的对话内容数组
const updateCombinedContents = () => {
  combinedContents.value = []
  combinedContents.value.push(...dialogContents.value)
}
// 暴露给父组件的方法
defineExpose({ addDialog })
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px;
  /*max-width: 1200px;*/
  margin: 0 auto;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
}
.head-portrait {
  display: flex;
  flex-direction: column;
  gap: 12px; /* 设置子元素之间的间距 */
}
</style>
