import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
// 引入 Element Plus 样式
import 'element-plus/dist/index.css'
import router from './router'

createApp(App).use(ElementPlus).use(router).mount('#app')
