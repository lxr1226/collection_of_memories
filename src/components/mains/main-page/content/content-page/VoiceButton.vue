<template>
  <div>
    <a-button
      v-for="(button, index) in buttons"
      :key="index"
      type="default"
      :style="{ backgroundColor: '#c84732', borderRadius: '8px', color: '#fff' }"
      @click="toggleButtonStyle(button)"
      >播放
      <CaretRightOutlined />
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button as AButton } from 'ant-design-vue'
import { CaretRightOutlined } from '@ant-design/icons'
import { defineProps } from 'vue'
const textToSynthesize = ref('')
const player = ref<HTMLAudioElement | null>(null)
const props = defineProps({
  content: String // 声明一个名为 content 的 prop，类型为字符串
})
//实时回答
//Play();

async function Play() {
  if (!props.content) {
    alert('Please enter some text to synthesize.')
    return
  }
  try {
    // console.log(props.content);
    const apiUrl = `http://47.108.144.113:8906/synthesize?text=${encodeURIComponent(props.content)}`

    const response = await fetch(apiUrl)
    /* console.log(response.ok) */
    if (!response.ok) {
      throw new Error(`Failed to fetch synthesized audio. Status: ${response.status}`)
    }

    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    // 将 Audio 实例赋值给全局变量 audio
    audio = new Audio(blobUrl)
    audio.play()
  } catch (error) {
    // console.error('Error fetching and playing synthesized audio:', error)
  }
}
// 定义按钮数据
const buttons = ref([
  {
    id: 1,
    style: {
      backgroundColor: '#c84732',
      iconName: 'play' // 默认
    },
    active: false // 初始状态为非激活状态
  }
  // 可以添加更多的按钮数据
])

// 点击按钮时切换样式的函数
const toggleButtonStyle = (button: { active: boolean; id: number }) => {
  if (button.active) {
    //handleStop();
    pauseAudio()
  } else {
    // 如果按钮是非激活状态，则切换到新样式
    //handleSpeak();
    synthesizeAndPlay(button.id, button.active)
  }
  // 切换按钮状态
  button.active = !button.active
}
// 定义全局变量 audio
let audio: any
async function synthesizeAndPlay(buttonId: number, active: boolean) {
  const buttonsValue = buttons.value // 获取 buttons 的原始值
  const button = buttonsValue.find((b) => b.id === buttonId) // 根据 id 获取对应的按钮数据
  if (!props.content) {
    alert('Please enter some text to synthesize.')
    return
  }

  try {
    // console.log(props.content)
    const apiUrl = `http://47.108.144.113:8906/synthesize?text=${encodeURIComponent(props.content)}`

    const response = await fetch(apiUrl)
    /* console.log(response.ok) */
    if (!response.ok) {
      throw new Error(`Failed to fetch synthesized audio. Status: ${response.status}`)
    }

    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    // 将 Audio 实例赋值给全局变量 audio
    audio = new Audio(blobUrl)
    audio.play()
    audio.addEventListener('ended', () => {
      // 在音频播放结束后，切换按钮样式
      active = !active
    })
  } catch (error) {
    console.error('Error fetching and playing synthesized audio:', error)
  }
}

//暂停播放
const pauseAudio = () => {
  if (audio) {
    audio.pause() // 暂停音频播放
  } else {
    console.warn('Audio is not initialized or null.')
  }
}
</script>
<style scoped></style>
