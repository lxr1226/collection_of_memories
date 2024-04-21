<!--
    * @FileDescription: 页面的头部组件。
    * @Author: 李思佳
    * @Date: 2024年4月18日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年4月18日
-->
<template>
  <a-card hoverable style="margin: 10vh 10px">
    <template #actions>
      <setting-outlined key="setting" />
      <PersonalInfor key="edit" @data-updated="handleDataUpdated"/>
    </template>
    <a-avatar>
      <template #icon><UserOutlined /></template>
    </a-avatar>
    <a-typography-title :level="5">{{name}}</a-typography-title>
    <div class="personal-information">
      <p>性别：{{ sex }}</p>
      <p>年龄：{{ age }}</p>
      <p>住址：{{ address }}</p>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { SettingOutlined, EditOutlined, UserOutlined } from '@ant-design/icons-vue'
import PersonalInfor from '../../mains/main-page/content/content-page/PersonalInfor.vue'
import { Button } from 'ant-design-vue'
import { h } from 'vue';
import { ref } from 'vue';
import axios from 'axios';
// 使用 ref 声明响应式数据
const name = ref("这是一个人名");
const sex = ref("女");
const age = ref("18岁");
const address = ref("成都市xx区");
// 接收子组件传递的数据
const handleDataUpdated = (data: any) => {
  console.log('Received updated data from child component:', data);
   name.value=data.name
   sex.value=data.sex
   age.value=data.age
   address.value=data.address
};
const token = localStorage.getItem('token');
const id = localStorage.getItem('AcountID')as string;
// 获取数据
const amendMessage = () => {
    axios.get('http://47.108.144.113:8906/Selectmation', {
      headers: {
        'token': token 
      },
      params: {
      id: id 
    }
    })
    .then(response => {
      console.log(response.data);
    const responseData = response.data.data[0]; // 取出数据数组的第一个元素
    name.value = responseData.name;
    age.value = responseData.age;
    sex.value = responseData.sex;
    address.value = responseData.address;
    })
    .catch((error) => {
      console.error('发送数据到后端失败:', error);
    });
}; 
amendMessage ();
</script>

<style scoped>
.personal-information {
  text-align: left;
}
</style>