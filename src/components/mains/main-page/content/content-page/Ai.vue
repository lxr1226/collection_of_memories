<template>
    <div v-for="(tooltip, index) in leftTooltips" :key="index">
      <Time />
    <div class="left">
      <a-avatar :size="100" class="ai">AI</a-avatar>
      <div class="chatBox chatBox-left" >
        <div class="chatboxcontent">
          <div>
            <div class="custom-tooltip-content" :style="{height: '100%', overflow: 'hidden'}">
              <span class="content">
                {{ tooltip.content }}
              </span>
            </div>
            <div class="custom-tooltip-button">
              <VoiceButton :content="tooltip.content"/>
              <AmendButton :content="tooltip.content" @click="showEdit"/>
              <RichText v-model="fieldData.addVisible" :newContent="tooltip.content"></RichText>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="intention">
      <Intention></Intention>
      <!-- <Button v-for="(buttonText, index) in buttons" :key="index">{{ buttonText }}</Button> -->
    </div>
  </div>
  </template>
  <script setup lang="ts">
  import {ref, onMounted, watch, defineComponent, onUpdated} from 'vue';
  import {Avatar as AAvatar, Popconfirm as APopconfirm} from 'ant-design-vue';
  import { CaretRightOutlined } from '@ant-design/icons'
  import { Button } from 'ant-design-vue'
  import RichText from '@/components/mains/main-page/content/content-page/RichText.vue'
  import VoiceButton from '../content-page/VoiceButton.vue';
  import AmendButton from '../content-page/AmendButton.vue';
  import Intention from './Intention.vue';
  import Time from '../content-page/Time.vue'
  // const buttons = ref<string[]>(['意图1', '意图2', '意图3', '意图4', '意图5']);
  interface TooltipData {
    height: string;
    overflow: string;
    content: string;
  }
  const props = defineProps<{
    newContent: string;
  }>();
  const fieldData = ref({
  addVisible: false,
});//控制显示文本框

const showEdit = () => {
  fieldData.value.addVisible= true;
};
  const leftTooltips = ref<TooltipData[]>([
    {
      height: '170px',
      overflow: 'scroll',
      content: props.newContent
    }
  ]);
  
  // 更新左侧对话框内容的方法
  function updateLeftTooltipContent(newContent: string, tooltipIndex: number) {
    leftTooltips.value[tooltipIndex].content = newContent;
  }
  // 监听 props 的变化，更新左侧对话框内容
  watch(
    () => props.newContent,
    (newValue) => {
      updateLeftTooltipContent(newValue, 0); // 假设只有一个对话框，索引为 0
    }
  );
  </script>
  <style scoped>
.intention{
    width: 100%;
    margin:10px 120px auto;
    font-size: 16px;
    color: #56684f;
    padding:5px
  }
  .left .ai {
    background: #c84732;
    background-size: cover;
    background-position: center;
    width: 1800px;
    height: 50px;
    border: 1px solid #f5f5f5;
    border-radius: 50%;
    box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5);
  }
  
  .chatBox-left::before {
    content: '';
    width: 0;
    height: 0;
    position: relative;
    border: 12px solid;
    border-color: #3b64bc00 #ffffff #3b64bc00 #bc3b4a00;
    top: 10%;
  }
  
  .chatBox {
    display: flex;
  }
  
  .chatboxcontent {
    background: #ffffff;
    display: inline-block; /* 设置为内联块元素 */
    vertical-align: top; /* 垂直对齐方式，根据实际情况调整 */
    /* width: 260px; */
    padding: 10px;
    border: 1px solid white;
    border-radius: 8px;
    box-shadow: 0 0 10px 3px rgba(73, 73, 73, 0.4);
  }
  
  .custom-tooltip-content {
    display: flex;
    font-size: 30px;
    max-width: 1800px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px 3px rgba(73, 73, 73, 0.4);
    display: inline-block; /* 设置为内联块元素 */
    vertical-align: top; /* 垂直对齐方式，根据实际情况调整 */
    /* margin-top: 10px; */
  }
  .content {
    /* text-overflow: ellipsis;  在文本溢出时显示省略号 */
    padding: 20px;
    text-align: justify;
    color: #000;
  }
  .custom-tooltip-button {
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 12px;
    margin-bottom: 12px;
    justify-content: space-around;
  }
  .left {
    margin: 0 auto;
    /*padding: 10px;*/
    width: 100%;
    height: 100%;
    display: flex;
  }
  </style>