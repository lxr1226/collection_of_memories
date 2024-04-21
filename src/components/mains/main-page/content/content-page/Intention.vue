<template>
    <div class="conation">
      <a-button v-for="item in conations" :key="item.id" @click="handleConation(item.conation)">{{ item.conation}}</a-button>
    </div>
  </template>
  
  <script setup lang="ts">
import {LXRSelectConationRequest} from '@/services/mains/selectConation'
import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/lib/button/style'; 
import {LXRConationRequest} from '@/services/mains/intention'
import { ref } from 'vue';
/**
 * @description 意图填入
 */

const handleConation = async(conation:string) => {
    const userId = localStorage.getItem('AcountID')
    console.log(userId);
    console.log(typeof userId);
  if (!userId) {
    // 处理没有找到userId的情况，例如显示错误信息或使用默认值
    return '未找到userId'
  }
  const formData = new FormData();
  
  // 添加数据到 FormData
  formData.append('conation', conation);
  formData.append('id', userId);
  // try {
  //   const res = await LXRConationRequest(conation, userId);
  //   console.log(res);
  // } catch (error) {
  //   console.error('请求失败:', error);
  // }
  const token = localStorage.getItem('token')

  if (!token) {
    // 处理没有找到token的情况，例如显示错误信息或使用默认值
    return '未找到token'
  }
  const response2 =await LXRConationRequest(conation, userId)
console.log(response2);
  // try {
  //   // 发送请求
  //   const response = await fetch('http://47.108.144.113:8906/intention', {
  //     method: 'POST',
  //     headers: {
  //       // 'Content-Type': 'multipart/form-data',
  //       'token':`${token}`
  //     },
  //     body: formData // 注意：当使用 FormData 时，fetch 会自动设置 Content-Type 头
  //   });


  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   // 假设服务器返回 JSON 格式的数据
  //   const res = await response.json();
  //   console.log(res);
  // } catch (error) {
  //   console.error('Error:', error);
  // }
}
/**
 *@description 查询意图
 */
interface Conation {
  id: number;
  conation: string;
}
const conations = ref<Conation[]>([])
const SelectConation=async ()=>{
const conationsRes = await LXRSelectConationRequest()
console.log(conationsRes)
conations.value = conationsRes.data
console.log(conations.value);
}
SelectConation()
  </script>

<style scoped>
.conation{
width:''
}

</style>