import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
const carBind = r=>require.ensure([],()=>r(require('@/components/car_bind')));
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'carBind',
      component: carBind
    }
  ]
})
