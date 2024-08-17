import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import gloalComponent from '@/components'
import router from './router'
import store from './store'
import moment from 'moment';
import localforage from 'localforage'
import 'moment/locale/zh-cn';
import datav from "@iamzzg/data-view/dist/vue3/datav.map.vue.esm";
const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(gloalComponent)
app.use(router)
app.use(datav)
app.use(localforage)
app.config.globalProperties.$moment = moment
moment.locale('zh-cn');
app.mount('#app')
