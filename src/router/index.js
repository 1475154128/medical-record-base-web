/*
 * @Description:
 * @Author: 小鬼
 * @Date: 2020-08-07 11:11:21
 * @LastEditTime: 2021-01-27 21:02:57
 * @LastEditors: leslie-choi
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
// import { getToken } from '@/utils/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  // const token = getToken()

  // if (to.path === '/login') return next()
  // // 获取token
  // const tokenStr = getToken('token')
  // if (!tokenStr) return next('/login')
  next()
})

export default router
