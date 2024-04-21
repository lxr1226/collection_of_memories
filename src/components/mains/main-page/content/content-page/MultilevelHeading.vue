<template>
  <a-collapse v-model:activeKey="activeKey" accordion>
    <a-collapse-panel v-for="item in firstLevel" :key="item.key" :header="item.header" @click="clickFirstLevel(item)">
      <template #header>
        <div>{{ item.header }}</div>
      </template>
      <template #default>
        <a-collapse v-if="item.subItems.length > 0">
          <a-collapse-panel v-for="subItem in item.subItems" :key="subItem.id" :header="subItem.issue" @click="clickSecondLevel(item, subItem)">
            <template #header>
              <div>{{ subItem.issue }}</div>
            </template>
            <template #default>
              <ul v-if="subItem.subItems.length > 0">
                <li v-for="subSubItem in subItem.subItems" :key="subSubItem.id">{{ subSubItem.issue }}</li>
              </ul>
              <p v-else>加载中...</p>
            </template>
          </a-collapse-panel>
        </a-collapse>
        <p v-else>加载中...</p>
      </template>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
const emit = defineEmits(['dataReceived']);
const activeKey = ref([]);
const firstLevel = ref([]);

const token = localStorage.getItem('token');

// 页面加载时获取一级标题数据
const fetchFirstLevelData = () => {
  axios.get('http://47.108.144.113:8906/grade', {
    headers: {
      'token': token 
    },
    params: {
      grade: '1' // 默认获取一级标题数据
    }
  })
  .then(response => {
    console.log(response.data);
    // 清空 firstLevel 数组
    firstLevel.value.splice(0);

    // 遍历后端返回的数据数组
    for (const item of response.data.data) {
      // 将每个元素转换为 firstLevel 数组中的对象，并添加到数组中
      firstLevel.value.push({
        key: item.id.toString(), // 将 id 转换为字符串类型
        header: item.issue,
        subItems: []
      });
    }
  })
  .catch((error) => {
    console.error('发送数据到后端失败:', error);
  });
}; 
//创建存储二级标题内容的数组
const secondLevelItemcontents = {};
// 点击一级标题获取对应的二级标题
const clickFirstLevel = (item) => {
  if (item.subItems.length === 0) {
    axios.get('http://47.108.144.113:8906/grade', {
      headers: {
        'token': token 
      },
      params: {
        grade: item.key // 点击时传入对应的一级标题的 key
      }
    })
    .then(response => {
      console.log(response.data);
      // 清空 item.subItems 数组
      item.subItems.splice(0);

      // 遍历后端返回的数据数组
      for (const subItem of response.data.data) {
        // 将每个元素转换为 subItems 数组中的对象，并添加到数组中
        item.subItems.push({
          id: subItem.id,
          issue: subItem.issue,
          subItems: [], // 初始化为空数组，用于存储三级标题
        });
        secondLevelItemcontents[subItem.id] = subItem.issue;//将二级标题的内容存储进对应id的数组里
      }
    })
    .catch((error) => {
      console.error('发送数据到后端失败:', error);
    });
  }
}; 

// 点击二级标题获取对应的三级标题
const clickSecondLevel = (firstLevelItem, secondLevelItem) => {
  if (secondLevelItem.subItems.length === 0) {
    axios.get('http://47.108.144.113:8906/grade', {
      headers: {
        'token': token 
      },
      params: {
        grade: secondLevelItem.id // 点击时传入对应的二级标题的 id
      }
    })
    .then(response => {
      console.log(response.data);
      // 清空 secondLevelItem.subItems 数组
      secondLevelItem.subItems.splice(0);

      // 遍历后端返回的数据数组
      for (const subSubItem of response.data.data) {
        // 将每个元素转换为 subItems 数组中的对象，并添加到数组中
        secondLevelItem.subItems.push({
          id: subSubItem.id,
          issue: subSubItem.issue
        });
      }
    })
    .catch((error) => {
      console.error('发送数据到后端失败:', error);
    });
  }
  const secondLevelItemcontent=secondLevelItemcontents[secondLevelItem.id]
  sendDataToParent(secondLevelItemcontent,true)
}; 

// 页面加载时获取一级标题数据
fetchFirstLevelData();

//点击标题内容生成ai对话框
const sendDataToParent = (blobData,isAI) => {
  emit('dataReceived', blobData,isAI);
  console.log(blobData);
};
</script>
  <style scoped>
  </style>