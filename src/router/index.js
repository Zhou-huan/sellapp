import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '../pages/modules/Goods.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'goods',
    component:Goods,
    meta:{
      isActive:0,
    }
  },
  {
    path:'/evaluate',
    name:'evaluate',
    component:()=>import('../pages/modules/Evaluate.vue'),
    meta:{
      isActive:1,
    }
  },
  {
    path:'/business',
    name:'business',
    component:()=>import('../pages/modules/Business.vue'),
    meta:{
      isActive:2,
    }
  },
  //出现错误时，配置路由
  {
    path:'*',
    redirect:'/'
  }
]

const router = new VueRouter({
  routes
})

export default router
