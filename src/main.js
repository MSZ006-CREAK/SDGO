// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
//import TrackballControls from 'TrackballControls'
//import CSS3DRenderer from 'three/src/renderers/CSS3DRenderer'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import httpRequest from './components/httpRequest' // api: https://github.com/axios/axi

//Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
