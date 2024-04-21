<template>
  <div class="box">
    <div class="head-portrait">
      <div v-for="(content,index) in combinedContents" :key="index">
        <div v-if="index % 2 === 0 ">
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
import { ref, onMounted, watch } from 'vue'
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

// 监听 props 中的 receivedData 和 isAI 的变化，以便更新对话内容
watch(
  () => props.receivedData,
  (newValue, oldValue) => {
    //console.log('newValue:', newValue, 'oldValue:', oldValue)
    addDialog(newValue, props.isAI)
    //console.log(props.isAI)
  }
)

// 存储 AI 对话框和user对话框的内容数组
const aiContents = ref<string[]>(['你好，我是您的回忆录助手，有什么我可以帮忙的吗？']);
const userContents = ref<string[]>([]);


// 将 AI 对话框内容和用户对话框内容交错合并
const combinedContents = ref<string[]>([]);

const maxLength = Math.max(aiContents.value.length, userContents.value.length);

for (let i = 0; i < maxLength; i++) {
  console.log(aiContents.value[i])
  if (i % 2 === 0) {
    // 偶数索引，添加 AI 对话框内容
    if (aiContents.value[i]) {
      combinedContents.value.push(aiContents.value[i]);
    }
  } else {
    // 奇数索引，添加用户对话框内容
    if (userContents.value[i]) {
      combinedContents.value.push(userContents.value[i]);
    }
  }
  Play(aiContents.value[i]); // 调用 Play 函数播放内容
}
// 上一个对话框的类型，默认为用户对话框
let lastDialogType: string | null = 'AI';
// 添加对话框
function addDialog(newValue:string,isAI:boolean) {
  const currentDialogType = isAI ? 'AI' : 'User';

  if (currentDialogType === lastDialogType) {
    // 如果当前对话框类型与上一个对话框类型相同，则将新内容追加到上一个对话框中
    if (currentDialogType === 'AI') {
      aiContents.value[aiContents.value.length - 1] =  newValue;
    } else {
      userContents.value[userContents.value.length - 1] = newValue;
    }
  } else {
    // 如果当前对话框类型与上一个对话框类型不同，则创建新的对话框
    if (isAI) {
      aiContents.value.push(newValue);
      lastDialogType = 'AI';
    } else {
      userContents.value.push(newValue);
      lastDialogType = 'User';
    }
  }
  updateCombinedContents();
}

function updateCombinedContents() {
  combinedContents.value = [];
  for (let i = 0; i < Math.max(aiContents.value.length, userContents.value.length); i++) {
    if (aiContents.value[i]) combinedContents.value.push(aiContents.value[i]);
    if (userContents.value[i]) combinedContents.value.push(userContents.value[i]);
  }
}



// 定义全局变量 audio
let audio: any
async function Play(newValue:string) {
  if (!newValue) {
    alert('Please enter some text to synthesize.')
    return
  }
  try {
    const token = localStorage.getItem('token');
    //console.log(token)
    const apiUrl = `http://47.108.144.113:8906/synthesizes?text=${encodeURIComponent(newValue)}`
    if (token) {
      const response = await fetch(apiUrl, {
        headers: {
          'token': token // 将请求头内容传递给后端
        }
      })
      // console.log(response.ok)
      if (!response.ok) {
        throw new Error(`Failed to fetch synthesized audio. Status: ${response.status}`)
      }
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      // 将 Audio 实例赋值给全局变量 audio
      audio = new Audio(blobUrl)
      audio.play()
    }
  }catch (error) {
    // console.error('Error fetching and playing synthesized audio:', error)
  }
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
