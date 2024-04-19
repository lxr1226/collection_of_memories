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
      <edit-outlined key="edit" />
    </template>
    <a-avatar>
      <template #icon><UserOutlined /></template>
    </a-avatar>
    <a-typography-title :level="5">这是一个人名</a-typography-title>
    <div class="personal-information">
      <p>性别：女</p>
      <p>年龄：18岁</p>
      <p>住址：成都市xx区</p>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { SettingOutlined, EditOutlined, UserOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.personal-information {
  text-align: left;
}
</style>
