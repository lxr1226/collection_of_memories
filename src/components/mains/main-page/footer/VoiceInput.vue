<template>
  <div class="Input_box">
    <div class="mask" v-if="recording"></div>
    <a-button
      class="Input_button"
      :class="{'input-red': !recording, 'input-white': recording}"
      @mousedown="startRecording"
      @mouseup="sendRecording"
    >{{ recording ? '正在说话...' : '长按发送' }}
    </a-button>
    <div v-if="recording" class="speech-bubble">
      <!-- 显示声音波形的组件（VoiceWave） -->
      <VoiceWave v-show="hasAudioInput" :show="true" />
      <!-- 根据是否有音频输入显示不同提示 -->
      <p v-if="hasAudioInput" style="color: #4caf50;text-align: center">上滑取消发送</p>
      <p v-else style="color: #c84732; font-size: 20px">请说话</p>
      <p v-if="canceling" ></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import type { Ref } from 'vue';
import VoiceWave from './VoiceWave.vue'
import Recorder from 'recorder-core'
import 'recorder-core/src/engine/wav.js'
import axios from 'axios';


const emit = defineEmits(['dataReceived']);
const hasAudioInput = ref(true);//是否显示动画
const cancel = ref(false); // 上滑并松手，确定取消录音
const canceling = ref(false); // 在上滑时用户上滑会取消
const recording = ref(false);//是否说话状态
// let startY = 0; // 用于判断上滑取消
// 定义一个引用类型变量来存储Recorder实例
const rec: Ref<typeof Recorder | null> = ref(null);
// 开始录音的方法
function startRecording() {
  cancel.value = false;
  recording.value = true;
  // startY = event.touches[0].clientY;
  recOpen()
}

// 初始化并打开录音设备
function recOpen() {
  // 创建一个Recorder实例，设置音频参数
  rec.value = Recorder({
    type: "wav",
    sampleRate: 8000,
    bitRate: 16,
  });
  // 如果创建成功，开启录音
  if (rec.value) {
    rec.value.open(function () {

      rec.value.start(); // 开始录音过程
    }, function (msg: string, isUserNotAllow: boolean) {
      console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg);
    });
  } else {
    console.error('录音对象没有正确初始化或获取');
  }
}

// 结束录音的方法
function recStop() {
  recording.value = false;
  rec.value.stop(function (blob:Blob) {
    rec.value.close();
    rec.value = null;
    if (!cancel.value) {
      sendDataToBackend(blob);
    }
  }, function () {
    rec.value.close();
    rec.value = null;
  });
}

// 设置请求头
const config = {
  headers: {
    'Content-Type': 'application/octet-stream'
  }
}
// 封装发送Base64编码的录音数据到后端的方法
const sendDataToBackend = (wavBlob:Blob) => {
  axios.post('http://47.108.144.113:8906/transcribeAudio', wavBlob, config)
    .then((response) => {
      if (response.data) {
        const responseData = response.data.replace(/^\[|]$/g, '');
        sendDataToParent(responseData,false);
        sendMessage(responseData);
        // const formData = new FormData();
        // formData.append('title', response.data);
        // axios.post('http://47.108.144.113:8090/v1/Moxin', formData).then((res) => {
        //   console.log(res.data.data);
        //   sendDataToParent(res.data.data);
        // });
      }
    })
    .catch((error) => {
      console.error('发送数据到后端失败:', error);
    });
};
let dataBuffer: string[] = [];
 const sendMessage = (text:string) => {
  if (text) {
    // 发送消息给后端
    const eventSource = new EventSource(`http://47.108.144.113:7159/events/streamAsk?q=${encodeURIComponent(text)}`);
    eventSource.onmessage = (event) => {
      const botResponse = event.data;
      //sendDataToParent(botResponse)
      dataBuffer.push(botResponse);
      sendDataToParent(dataBuffer.join(''),true);
    };
    eventSource.onerror = () => {
      stopListening(eventSource);
    };
  }
};  
const stopListening = (eventSource: EventSource) => {
  if (eventSource) {
    eventSource.close();
    
    dataBuffer = [];
  }
};
// 上滑超过50px则取消录音
// function handleTouchMove(event) {
//   if (recording.value) {
//     const currentY = event.touches[0].clientY;
//     const deltaY = startY - currentY;
//
//     if (deltaY > 50) {
//       cancel.value = true;
//       canceling.value = true;
//     } else {
//       cancel.value = false;
//       canceling.value = false;
//     }
//   }
// }

// 结束录音时，恢复各字段默认值并执行recStop方法
function sendRecording() {
  recording.value = false;
  canceling.value = false;
  recStop()
}
const sendDataToParent = (blobData: string,isAI:Boolean) => {
  emit('dataReceived', blobData,isAI);
};
</script>

<style scoped>
@import url('../../../../assets/css/voiceInputCss/VoiceInput.css');
</style>
