import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index"
import pinia from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')

