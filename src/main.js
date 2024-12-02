import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import DataView from '@jiaminghi/data-view';
createApp(App).use(router).use(DataView).use(ElementPlus).use(Antd).mount('#app');
