<template>
    <div v-for="(tooltip, index) in rightTooltips" :key="index">
    <Time />
        <div class="right">
        <div class="chatBox chatBox-right" >
          <div class="chatboxcontent ">
            <div>
              <div class="custom-tooltip-content" :style="{height: '100%', overflow: 'hidden'}">
                <span class="content">
                  {{ tooltip.content }}
                </span>
              </div>
              <div class="custom-tooltip-button">
              <VoiceButton :content="tooltip.content"/>
              </div>
              </div>
          </div>
        </div>
          <a-avatar :size="100" class="user">Me</a-avatar>
        </div>
      </div>
  </template>
  <script setup lang="ts">
  import { ref, onMounted,watch } from 'vue';
  import { Avatar as AAvatar,Popconfirm as APopconfirm, } from 'ant-design-vue';
  import { Icon,Button } from 'vant';
  import VoiceButton from '../content-page/VoiceButton.vue'
  import Time from '../content-page/Time.vue'
  
  
  interface TooltipData {
    height: string;
    overflow: string;
    content: string;
  }
  const props = defineProps<{
    newContent: string;
  }>()
  const rightTooltips = ref<TooltipData[]>([
    {
      height: '200px',
      overflow: 'scroll',
      content: props.newContent,
    },
  ]);
  // 更新右侧对话框内容的方法
  function updateLeftTooltipContent(newContent: string, tooltipIndex: number) {
    rightTooltips.value[tooltipIndex].content = newContent;
  }
  // 监听 props 的变化，更新右侧对话框内容
  watch(() => props.newContent, (newValue) => {
    updateLeftTooltipContent(newValue, 0); // 假设只有一个对话框，索引为 0
  });
  
  </script>
  <style scoped>
  
  .chatBox-right::after{
    content: '';
    width: 0;
    height: 0;
    position: relative;
    border: 12px solid;
    border-color: #3b64bc00 #70707000 #3b64bc00 #ffffff;
    top: 10%;
  }
  .chatBox {
    display: flex;
  
  }
  .chatboxcontent{
    background: #ffffff;
    display: inline-block; /* 设置为内联块元素 */
    vertical-align: top; /* 垂直对齐方式，根据实际情况调整 */
    text-align: center;
    padding: 0 10px  ;
    max-width: 1800px;
    border: 1px solid white;
    border-radius: 8px;
    box-shadow: 0 0 10px 3px rgba(73, 73, 73, 0.4);
  
  }
  .custom-tooltip-content {
    display: flex;
    font-size: 35px;
    max-width: 1770px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px 3px rgba(73, 73, 73, 0.4);
    display: inline-block; /* 设置为内联块元素 */
    vertical-align: top; /* 垂直对齐方式，根据实际情况调整 */
    margin-top: 10px;
  
  }
  .content {
   /* text-overflow: ellipsis;  在文本溢出时显示省略号 */
   color: black;
    margin: 0 auto;
    padding: 10px;
    text-align: justify;
  }
  .custom-tooltip-button{
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 12px;
    margin-bottom: 12px;
    justify-content: space-around;
  
  }
  .right .user {
    background: #56684f;
    background-size: cover;
    background-position: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #f5f5f5;
    box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5);
    margin-right: 20px
  }
  .right{
    margin: 0 auto;
    padding: 0 10px 10px 10px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .jwh{
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: #f5f5f5;
    background-image: url("./luge.jpeg");
    align-items: center;
  }
  </style>