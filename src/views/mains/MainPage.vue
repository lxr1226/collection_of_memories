<!--
    * @FileDescription: 登录页面。
    * @Author: 李思佳
    * @Date: 2024年4月28日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年4月28日
-->
<template>
  <a-layout class="main">
    <a-layout-sider :style="siderStyle">
      <SiderLogo />
      <PersonalInformation />
      <a-button type="primary" danger shape="round" class="login-out">退出登录</a-button>
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="contentStyle">
        <div style="padding:0 50px">
          <AI :newContent="contents" v-if="isAIVisible" style="margin: 50px;"></AI>
        </div>
        
        <Content ref="contentRef" :receivedData="receivedData" :isAI="isAI"></Content>
      </a-layout-content>
      <a-layout-footer :style="footerStyle">
        <VoiceInput
          @dataReceived="handleDataFromChild"
          :onRecordingStopped="handleAddUserDialog"
          :dataToSend="dataFromParent"
        />
      </a-layout-footer>
    </a-layout>
    <a-layout-sider :style="siderStyle">
      <a-card size="small" title="写作意图" style="margin: 10px">
        <p>
          <a-button type="dashed" danger @click="handleClick">写作意图</a-button>
        </p>
      </a-card>
      <a-card size="small" title="写作类型" style="margin: 10px">
        <p style="margin: 10px">
          <a-button type="dashed" block>叙事型</a-button>
        </p>
        <p style="margin: 10px">
          <a-button type="dashed" block>散文型</a-button>
        </p>
        <p style="margin: 10px">
          <a-button type="dashed" block>抒情型</a-button>
        </p>
      </a-card></a-layout-sider
    >
  </a-layout>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import VoiceInput from '@/components/mains/main-page/footer/VoiceInput.vue'
import AI from '@/components/mains/main-page/content/content-page/Ai.vue'

import { ref } from 'vue'
import Content from '../../components/mains/main-page/content/Content.vue'
// import VoiceInput from '../../components/footer/VoiceInput.vue';
const isAIVisible=ref(false)
const contents ='请说出您的写作意图'
const contentStyle: CSSProperties = {
  textAlign: 'left',
  minHeight: 120,
  lineHeight: '50px',
  color: '#fff',
  backgroundColor: '#eee'
}

const siderStyle: CSSProperties = {
  position: 'relative',
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
  backgroundColor: '#F5F5F5'
}

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#F5F5F5'
}
// 使用 ref 定义响应式变量
const dataFromParent = ref<string>('')
const receivedData = ref<string>('')
const isAI = ref<boolean>(true)
const contentRef = ref<InstanceType<typeof Content>>()
const handleAddUserDialog = () => {
  if (contentRef.value) {
    console.log('isAI.value:', isAI.value) // 打印 isAI 的值
    contentRef.value.addDialog(receivedData.value, isAI.value)
  } else {
    console.error('contentRef is not yet available')
  }
}
// 定义处理接收到子组件数据的方法
const handleDataFromChild = (data: string, isAIValue: boolean) => {
  // console.log(data);
  dataFromParent.value = data
  // 在父组件中处理接收到的数据
  // console.log('Received data from child:', data);
  // receivedData.value = data;
  // 更新 receivedData 的值，确保在第一次调用时传递有效的数据给子组件
  if (!receivedData.value) {
    receivedData.value = data
  } else {
    receivedData.value = data
  }
  isAI.value = isAIValue
}
const handleClick=()=>{
  isAIVisible.value = !isAIVisible.value
}
</script>

<style scoped>
.main {
  min-height: 100%;
}

.login-out {
  position: absolute;
  bottom: 2vh;
  left: 5px;
  right: 5px;
  margin: 0 auto;
}
</style>
