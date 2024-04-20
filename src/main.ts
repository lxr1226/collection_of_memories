import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios' // 导入axios的默认导入
import type { AxiosInstance,  InternalAxiosRequestConfig ,AxiosRequestHeaders } from 'axios' // 导入AxiosRequestConfig的类型导入
// 样式相关
import 'normalize.css'
import '@/assets/css/index.less'

// 路由相关
import router from '@/routers'

const app = createApp(App)
axios.defaults.baseURL = 'http://47.108.144.113:8906'

// 创建一个axios实例
const axiosInstance: AxiosInstance = axios.create()
// 设置 axios
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders
      }
      Object.assign(config.headers, { Authorization: `Bearer ${jwtToken}` });
    }
    return config 
  },
  (error) => {
    return Promise.reject(error)
  }
)

app.provide<AxiosInstance>('axios', axiosInstance)
app.use(router)
app.mount('#app')
