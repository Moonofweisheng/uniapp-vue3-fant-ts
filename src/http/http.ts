import { useAuthStore } from '@/store'
import { CommonUtil } from '@/uni_modules/fant-mini-plus'
import axios from 'axios'
import { uniAdapter } from 'fant-axios-adapter'

axios.defaults.timeout = 60000
export default class ApiClient {
  public static server() {
    // 可以在这里拦截
    const baseURL = import.meta.env.VITE_BASEURL
    return ApiClient.create(baseURL)
  }

  public static create(baseURL: string) {
    const instance = axios.create({
      withCredentials: true,
      baseURL: baseURL,
      adapter: uniAdapter // 指定适配器
    })

    instance.interceptors.request.use(
      (request) => {
        // 设置conten-type
        request.headers['Content-Type'] = 'application/json'
        // 设置请求唯一标识（便于查询请求日志）
        request.headers.trace_id = CommonUtil.dateFormat(new Date().getTime(), 'yyyyMMddHHmmssSSS')
        return request
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      (response) => {
        if (response.data instanceof ArrayBuffer) {
          return response
        }
        // 此处为前后端约定的接口成功的字段，旨在处理状态码为200的错误响应，开发者可自行调整
        if (response.data.success) {
          return response
        } else {
          const error: Record<string, any> = {}
          if (response.data.code) {
            error.code = response.data.code
          }
          if (response.data.msg) {
            error.message = response.data.msg
          } else {
            error.message = response.status + '服务器内部异常'
          }
          error.response = response.data
          return Promise.reject(error)
        }
      },
      (error) => {
        if (error.status !== 0 && !error.status) {
          const newError = error as any
          newError.msg = '请检查网络设置'
          return Promise.reject(newError)
        }
        const pages = getCurrentPages() as any[]
        const oauthStore = useAuthStore()
        switch (error.status) {
          // 小程序切换页面会导致正在处理中的请求返回状态码为0 这里还没有什么比较好的处理方案
          // case 0:
          //   error.msg = '请检查网络设置'
          //   break
          case 1:
            error.msg = '网络超时!'
            break
          case 401:
            oauthStore.logout()
            setTimeout(() => {
              uni.showToast({ title: '登录已过期,请重新登录!', icon: 'none' })
            }, 300)
            // 如果当前页面不是登录页面则跳转至登录页面
            if (
              !pages[pages.length - 1].$page ||
              (pages[pages.length - 1].$page && pages[pages.length - 1].$page.fullPath !== '/pagesOther/login/Login')
            ) {
              uni.reLaunch({ url: '/pagesOther/login/Login' })
            }
            break

          case 403:
            error.msg = `${error.status} 禁止访问!`
            break
          case 500:
            error.msg = `${error.status} 服务内部异常!`
            break
          case 502:
            error.msg = `${error.status} 服务器暂不可用!`
            break
          case 503:
            error.msg = `${error.status} 服务器升级中!`
            break
          case 404:
            error.msg = `${error.status} 服务器无回应!`
            break
          default:
            error.msg = `${error.status} 未知错误!`
        }
        return Promise.reject(error)
      }
    )
    return instance
  }
}
