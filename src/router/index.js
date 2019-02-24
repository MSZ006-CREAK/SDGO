import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import gundam from '@/views/gundam'
import egg from '@/views/egg'
//import pumpmonitorindex from '@/views/pumpmonitor/index'
//import pumpmonitorwarning from '@/views/pumpmonitor/warning'
//import pumpmonitordiagram from '@/views/pumpmonitor/diagram'
Vue.use(Router)
//var routertwo = new Router({
//  routes: childrenlist
//});

var router = new Router({
  isAddDynamicMenuRoutes: false,
  routes: [ {
    path: '/',
    name: 'index',
    redirect: '/index-gundam',
    component: index,
    children: [{
      path: '/index-egg',
      name: 'egg',
      component: egg
    }, {
      path: '/index-gundam',
      name: 'gundam',
      component: gundam
    }]
  }]
})
export default router
