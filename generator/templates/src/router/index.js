import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { constantRoutes } from './routers'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import storage from 'Utils/storage'
import getPageTitle from 'Utils/get-page-title'

Vue.use(Router)

NProgress.configure({ showSpinner: false }) // NProgress 配置

// 解决 vue-router@3.1.0 以上版本 重复访问路由报错的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new Router({
  routes: constantRoutes,
  scrollBehavior: () => ({ y: 0 }), // 滚动行为。 具体见 https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
  mode: 'history' // 您也可以使用 hash 模式，如果用 history 模式还需要后台配置支持。具体见 https://router.vuejs.org/zh/guide/essentials/history-mode.html
})

const router = createRouter()

const whiteList = ['/login'] // no redirect whitelist
const TokenKey = 'vue_admin_template_token'

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = storage.getCookie(TokenKey)
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
