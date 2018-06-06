import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue' // @ 是 src 路径的别名，webpack 配置的
import Home from '@/components/home/home.vue'
/*import UserList from '@/components/user-list/user-list.vue'*/
/*import RoleList from '@/components/role-list/role-list.vue'*/
import MarkingTest from '@/components/marking/test.vue'
import MarkingSend from '@/components/marking/send.vue'
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
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})

// 添加路由拦截器（导航钩子、守卫）

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
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
