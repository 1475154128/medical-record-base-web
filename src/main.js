/*
 * @Date: 2021-01-27 19:37:20
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-30 23:46:58
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import publicMethods from './utils/public'

Vue.config.productionTip = false
Vue.use(ElementUI, publicMethods)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
