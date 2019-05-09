// 入口 加载组件 初始化等
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$ajax = axios

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss'

import App from './App'
import router from './router'
import store from './store'

import '@/icons'
import '@/permission'

import domain from './views/domain'
global.domain = domain

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
