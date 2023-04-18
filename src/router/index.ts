/*
 * @Author: weisheng
 * @Date: 2021-10-13 11:15:00
 * @LastEditTime: 2023-04-18 21:07:13
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \uniapp-vue3-fant-ts\src\router\index.ts
 * 记得注释
 */
import { useAuthStore } from '@/store'
import { createRouter } from 'uni-mini-router'

const router = createRouter({
  routes: [...ROUTES]
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.$state.userInfo && to && to.name !== 'login') {
    next({ name: 'login', path: '' })
  } else if (authStore.$state.userInfo && to && to.name === 'login') {
    next({ name: 'home', path: '' })
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  const authStore = useAuthStore()
  if (!authStore.$state.userInfo && to.name !== 'login') {
    router.replaceAll({ name: 'login' })
  } else if (authStore.$state.userInfo && to.name === 'login') {
    router.replaceAll({ name: 'home', path: '' })
  }
})

export default router
