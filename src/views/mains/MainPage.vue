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
      <a-button type="primary" danger shape="round" class="login-out" @click="logout">退出登录</a-button>
    </a-layout-sider>
    <a-layout>
      <a-layout-content class="content-wrapper">
        <div style="height: 85vh; overflow-y: auto;">
          <div style="padding: 0 50px">
            <AI :newContent="contents" v-if="isAIVisible" style="margin: 50px;"></AI>
          </div>
          <Content ref="contentRef" :receivedData="receivedData" :isAI="isAI"></Content>
          <personalFrom v-model="fieldData.addVisible"></personalFrom>
        <personalYitu v-model="yituData.addVisible"></personalYitu>
        </div>
      </a-layout-content>
      <a-layout-footer :style="footerStyle">
        <VoiceInput
          @dataReceived="handleDataFromChild"
          :onRecordingStopped="handleAddUserDialog"
          :dataToSend="dataFromParent"
          :parentMessage="issueId"
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
      </a-card>
      <MultilevelHeading
      @dataReceived="handleDataFromChild"
      :onRecordingStopped="handleAddUserDialog"
      :dataToSend="dataFromParent"
      />
      </a-layout-sider
    >
  </a-layout>
</template>

<script setup lang="ts">
import SiderLogo from '@/components/mains/main-page/SiderLogo.vue'
import personalFrom from '@/components/mains/main-page/Personal/personalFrom.vue'
import personalYitu from '@/components/mains/main-page/Personal/personalYitu.vue'
import PersonalInformation from '@/components/mains/main-page/PersonalInformation.vue'
import MultilevelHeading from '@/components/mains/main-page/content/content-page/MultilevelHeading.vue'
import {ZHQgetSelextid} from '@/services/content/index'
import type { CSSProperties } from 'vue'
import {onMounted} from 'vue'
import VoiceInput from '@/components/mains/main-page/footer/VoiceInput.vue'
import AI from '@/components/mains/main-page/content/content-page/Ai.vue'
import { ref } from 'vue'
import {ZHQgetgrade} from '@/services/content/index'
import Content from '../../components/mains/main-page/content/Content.vue'
import axios from 'axios'
import router from '@/routers'
import { useRouter } from 'vue-router';

const routers =useRouter();
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
const fieldData = ref({
  addVisible: false,
});//控制显示文本框
const yituData = ref({
  addVisible: false,
});//控制显示文本框
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
const issueId =ref(1)

// const getgrade = async (grade:string) => {
//   const res = await ZHQgetgrade(grade)
//   issueId.value =res.data[0].id;
//   console.log(res.data[0].id);
//   console.log(typeof res.data[0].id);
  
  
  
// }
onMounted(() => {
  getgrade('2')
});
const getgrade = async (grade:string) => {
  const res = await ZHQgetgrade(grade)
  const id = localStorage.getItem('AcountID');//用户id
  // 问题id
  const ids = res.data.map((item: { id: string }) => item.id);
  console.log(ids)// 获取 res.data.id
  localStorage.setItem('QuestionID', ids)

  if (id) {
    const res = await ZHQgetgrade(grade);
    await getSelextid(id);
  } else {
    console.error('用户 ID 未找到或为空');
  }
}
const getSelextid = async (id:string) => {
  const res = await ZHQgetSelextid(id)
  console.log(res.data)
  if (res.data === 0) {
    // 如果 res.data 等于 0，则弹出 RichText 组件
    fieldData.value.addVisible = true;
    console.log('无基本信息无意图');
  } else if (res.data === 1) {
    yituData.value.addVisible = true;
    console.log('有基本信息无意图');
  } else if (res.data === 2) {
    console.log('有基本信息有意图');
  } else {
    console.log('其他情况');
  }
}
const logout=()=>{
  routers.push('/login')
}
// 调用接口
onMounted(() => {
  getgrade('2')
});
//欢迎词和小标题
const token = localStorage.getItem('token');
let grade = "0"
const welcome = function() {
    axios.get('http://47.108.144.113:8906/grade', {
      headers: {
        'token': token 
      },
      params: {
        grade: grade 
    }
    })
    .then(response => {
      console.log(response.data.data[0].issue);
      receivedData.value=response.data.data[0].issue;
      
    })
    .catch((error) => {
      console.error('发送数据到后端失败:', error);
    });
}; 
welcome();
</script>



<style scoped>
.main {
  max-height: 100%;
}

.login-out {
  position: absolute;
  bottom: 2vh;
  left: 5px;
  right: 5px;
  margin: 0 auto;
}
.content-wrapper {
  height: 100%; /* 使内容区域撑满父元素 */
  text-align: 'left';
  /* min-height: 120; */
  line-height: '50px';
  color: '#fff';
  background-color: '#eee'
}
</style>
