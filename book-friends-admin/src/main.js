// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
// element-ui
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
// common dialog
import Base from './base'
Vue.use(Base)
// vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
Vue.http.options.crossOrigin = true // 跨域访问
// Vue.http.options.root = 'http://104.194.94.3:3002/bookcircle'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

