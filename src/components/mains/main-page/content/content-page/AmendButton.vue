<template>
    <div>
      <Button
        v-for="(button, index) in buttons"
        :key="index"
        type="primary"
        :style="{ backgroundColor:button.active ?button.styles.bgplay:button.styles.bgpause , borderRadius: '8px', color: '#fff' }"
        :icon="button.active ? button.icons.pause : button.icons.play"
        @click="toggleButtonStyle(button)"
        >
        
      </Button>
    </div>
    
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { Button } from 'ant-design-vue'
  import { h } from 'vue';
  import { CloseOutlined ,FormOutlined} from '@ant-design/icons-vue'
  import { defineProps } from 'vue'
  const textToSynthesize = ref('')
  const player = ref<HTMLAudioElement | null>(null)
  const props = defineProps({
    content: String // 声明一个名为 content 的 prop，类型为字符串
  })
  // 定义按钮数据
  const buttons = ref([
    {
      id: 1,
      styles: {
        bgplay: '#56684f',
        bgpause: '#c84732',
      },
      icons: {
        play: h(FormOutlined), // 播放图标
        pause: h(CloseOutlined) // 暂停图标
      },
      active: false // 初始状态为非激活状态
    }
  ])
  const toggleButtonStyle = (button: { active: boolean; id: number }) => {
    button.active = !button.active
  }

  
  </script>
  <style scoped></style>