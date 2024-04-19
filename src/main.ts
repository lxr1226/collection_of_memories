import { createApp } from 'vue'
import App from './App.vue'

// 样式相关
import 'normalize.css'
import '@/assets/css/index.less'

// 路由相关
import router from '@/routers'

const app = createApp(App)
app.use(router)
app.mount('#app')
