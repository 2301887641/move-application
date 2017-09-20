// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// iview组件
import iView from 'iview'
// element组件
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// 使用 iview CSS
import 'iview/dist/styles/iview.css'
// 本地存储localstory
import Lockr from 'lockr'
// 粒子效果
import VueParticles from 'vue-particles'
// ajax方法和通用配置
import Http from './config/http.js'
import Store from './vuex/store.js'
let httpUtil = new Http()
Vue.config.productionTip = false
// vue上使用iview
Vue.use(iView)
// vue上使用element
Vue.use(Element)
// vue上使用粒子效果
Vue.use(VueParticles)
// vue上使用ajax
Vue.prototype.$http = httpUtil
// 引用Http的conf到vue上
Vue.prototype.$config = httpUtil.conf
// 使用本地存储localstory
Vue.prototype.$lockr = Lockr
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: Store,
  router,
  template: '<App/>',
  components: { App }
})
