import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import router from './router'; // 导入路由配置
import App from './App.vue';
import "./assets/style/common.css"

createApp(App)
  .use(router) // 使用 Vue Router
  .use(ElementPlus)
  .mount('#app');
