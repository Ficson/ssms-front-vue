import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue' // @ 是 src 路径的别名，webpack 配置的
import Home from '@/components/home/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home
    }

  ]
})
