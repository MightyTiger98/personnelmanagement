import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 全局样式
import './assets/css/global.css'
//导入mock
import './mock/index.js'
import './mock/login.js'
import './mock/depart.js'
import './mock/test.js'
//导入axios
import axios from 'axios'

Vue.config.productionTip = false
//挂载axios
Vue.prototype.$http = axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
