<template>
    <EditOutlined type="primary" @click="showDrawer">
    </EditOutlined>
    <a-drawer
      title="请填写个人信息"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :model="form"  layout="vertical" class="form">
        <a-row :gutter="16">
          <a-col :span="18">
            <a-form-item label="姓名" name="name" >
              <a-input v-model:value="form.name" placeholder="请输入名字" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="18">
            <a-form-item label="年龄" name="age">
              <a-input v-model:value="form.age" placeholder="请输入年纪" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="18">
            <a-form-item label="性别" name="sex">
              <a-select v-model:value="form.sex" placeholder="请选择性别">
                <a-select-option value="man">男</a-select-option>
                <a-select-option value="wowan">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="18">
            <a-form-item label="地址" name="address">
              <a-input v-model:value="form.address" placeholder="请输入地址" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #extra>
        <a-space>
          <Button @click="onClose">取消</Button>
          <Button type="primary" @click="onClose ,sendDataToBackend(form.name, form.age, form.sex, form.address, id)">保存</Button>
        </a-space>
      </template>
    </a-drawer>
  </template>
  <script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { EditOutlined } from '@ant-design/icons-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import { Button } from 'ant-design-vue'
  import axios from 'axios';

  interface FormData {
  name: string;
  age: string;
  sex: string;
  address: string;
}
const form = reactive<FormData>({
  name: '',
  age: '',
  sex: '请选择性别',
  address: '',
});
  
  const open = ref<boolean>(false);
  
  const showDrawer = () => {
    open.value = true;
    amendMessage();
  };
  
  const onClose = () => {
    open.value = false;
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
    form.name = responseData.name;
    form.age = responseData.age;
    form.sex = responseData.sex;
    form.address = responseData.address;
    })
    .catch((error) => {
      console.error('发送数据到后端失败:', error);
    });
}; 
// 修改数据
const sendDataToBackend = (name: string, age: string, sex: string, address: string, id: string) => {
  const requestData = {
    name: name,
    age: age,
    sex: sex,
    address: address,
    id: id
  };
  console.log(id);
  axios.post('http://47.108.144.113:8906/Information', null, {
  params: requestData,
  headers: {
    'token': token
  }
})
.then(response => {
    console.log(response.data);
    amendMessage();
  })
  .catch((error) => {
      console.error('发送数据到后端失败:', error);
  });
};
  </script>
<style scoped>
.form .a-form-item{
  font-size:50px ;
}
</style>