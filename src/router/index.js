import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue' // @ 是 src 路径的别名，webpack 配置的
import Register from '@/components/register/register.vue'
import Home from '@/components/home/home.vue'
import MarkingTest from '@/components/marking/marking-test.vue'
import MarkingSend from '@/components/marking/marking-send.vue'
import MarkingManage from '@/components/marking/marking-manage.vue'
import {getUserInfo} from '@/assets/js/auth.js'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'home', // home 组件会渲染到 App.vue 根组件的 router-view 中
      path: '/',
      component: Home,
      children: [ // 子路由
        {
          name: 'marking-test',
          path: '/marking-test',
          component: MarkingTest
        },
        {
          name: 'marking-send',
          path: '/marking-send',
          component: MarkingSend
        },
        {
          name: 'marking-manage',
          path: '/marking-manage',
          component: MarkingManage
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    }
  ]
})

// 添加路由拦截器（导航钩子、守卫）

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || to.name === 'register') {
    next()
  } else {
    // 检查是否具有当前登陆的用户信息状态
    if (!getUserInfo()) { // 无令牌，则让其登陆去
      next({
        name: 'login'
      })
    } else { // 有令牌就允许通过
      next()
    }
  }
})

export default router
