<!--
    * @FileDescription: 登录页面。
    * @Author: 李思佳
    * @Date: 2024年4月28日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年4月18日
-->
<template>
  <a-config-provider :theme="{ token: { colorPrimary: '#02509b' } }">
    <a-spin tip="加载中，请稍候..." :spinning="spinning" size="large">
      <a-layout>
        <div class="login-wrapper">
          <div class="paper-wrapper">
            <div class="paper" index="0"></div>
            <div class="paper" index="1"></div>
            <div class="paper" index="2"></div>
            <div class="paper" index="3"></div>
            <div class="paper" index="4">
              <div class="login-paper">
                <a-typography-title :level="2" style="text-align: center">登 录</a-typography-title>
                <a-divider />
                <a-form :model="formState" autocomplete="off">
                  <a-form-item name="useraccount" :rules="getRules('账号')">
                    <a-input
                      placeholder="请输入账号"
                      size="large"
                      v-model:value="formState.useraccount"
                    />
                  </a-form-item>

                  <a-form-item name="password" :rules="getRules('密码')">
                    <a-input-password
                      size="large"
                      placeholder="请输入密码"
                      v-model:value="formState.password"
                    />
                  </a-form-item>
                </a-form>
              </div>
              <div style="text-align: center">
                <a-button
                  type="primary"
                  style="width: 90%; border-radius: 20px"
                  size="large"
                  @click="logIn"
                  >进 入</a-button
                >
              </div>
            </div>
          </div>
        </div>
      </a-layout>
    </a-spin>
  </a-config-provider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { JWHLoginRequest } from '../../services/login/login'
import axios from 'axios'

const router = useRouter()
const spinning = ref<boolean>(false)

interface FormState {
  useraccount: string
  password: string
}

const formState = reactive<FormState>({
  useraccount: '',
  password: ''
})

// 登录表单验证
const getRules = (fieldName: string) => [{ required: true, message: `${fieldName}不能为空!` }]


// 登录接口(另一种,备用)
/* const logIn = () => { // 添加了箭头函数的参数声明
  const formData = new FormData();
  // 向 FormData 对象添加表单数据
  formData.append('account', formState.useraccount);
  formData.append('password', formState.password);

  axios.post('/login', formData)
    .then(response => {
      console.log(response.data); // 打印后端返回数据
      if (response.data.code === 200) {
        alert(response.data.msg);
        router.push('/MainPage');
      } else if (response.data.code === 100) {
        alert(response.data.msg);
      }
    })
    .catch(error => {
      console.error('登录请求出错:', error);
      // 处理请求错误
      // 可以在这里处理请求失败的情况，例如显示错误信息给用户
    });
};  */
// 登录接口
async function logIn() {
  // console.log(formState.useraccount)
  // console.log(formState.password)
  spinning.value = true
  const loginResult = await JWHLoginRequest(formState.useraccount, formState.password)
  // console.log(loginResult)
  if (loginResult.code == 200) {
    console.log(loginResult.data.token)
    localStorage.setItem('AcountID', loginResult.data.id)
    localStorage.setItem('token', loginResult.data.token)
    router.push('/MainPage')
    spinning.value = false
    message.success("登录成功")
  } else {
    spinning.value = false
    message.warning("密码有误")
  }
} 

</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: flex-end;
  background-position: center;
  height: 100vh;
  padding: 5%;
  background: url(@/assets/images/background.jpg) center/cover no-repeat;
  background-size: 100% 100%;
}

.paper-wrapper {
  width: 100%; /* 纸堆的宽度 */
  height: 100%; /* 纸堆的高度 */
  display: flex;
  justify-content: flex-end; /* 水平居右 */
  align-items: center; /* 垂直居中 */
  margin-right: 7vw;
}

.paper {
  position: absolute;
  background-color: aliceblue;
  width: 30%; /* 每张纸的宽度 */
  height: 40%; /* 调整纸张的高度 */
  border-radius: 20px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3); /* 阴影效果 */
  transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
}

.paper:nth-child(1) {
  transform: rotate(5deg);
}

.paper:nth-child(2) {
  transform: rotate(-10deg);
}

.paper:nth-child(3) {
  transform: rotate(-15deg);
}

.paper:nth-child(4) {
  transform: rotate(-20deg);
}

.paper:nth-child(1) {
  transform: rotate(-5deg);
}

.paper:nth-child(2) {
  transform: rotate(10deg);
}

.paper:nth-child(3) {
  transform: rotate(-15deg);
}

.paper:nth-child(4) {
  transform: rotate(20deg);
}

.login-paper {
  margin: 5%;
}

.logo {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  margin: 3%;
}
</style>
