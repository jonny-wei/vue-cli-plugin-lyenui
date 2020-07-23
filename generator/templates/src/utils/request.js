import axios from 'axios'
import router from '../router'
import storage from 'Utils/storage'

// 错误处理
const errorHandle = (status, otherError) => {
  switch (status) {
    case 401:
      break
    case 403:
      break
    case 404:
      router.push('/404')
      break
    case 500:
    case 502:
    case 503:
    case 504:
      break
    case 20001:
    case 20002:
    case 20003:
    case 20004:
    case 20005:
      break
    default:
      console.log('response other err -->', otherError)
  }
}

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000
})

const TokenKey = 'vue_admin_template_token'

// 请求拦截
service.interceptors.request.use(
  (request) => {
    // console.log('请求拦截 =>', request);
    request.headers['X-INTERFACE-TOKEN'] = storage.getCookie(TokenKey)
    return request
  },
  (error) => {
    // do something with request error
    console.log(`request err -->, ${error}`) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    // console.log('响应拦截 =>', response);
    const res = response.data
    if (response.status === 200) {
      return res
    }
    errorHandle(res.code, res.message)

    return Promise.reject(new Error(res.message || 'Error'))
  },
  (error) => {
    // console.log('响应错误拦截 =>', error);
    // 超时处理
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      console.log('超时处理')
    }
    // 请求已发出但不在 2xx 范围，需要错误处理
    const { response } = error
    if (response) {
      errorHandle(response.status, response.data.message)
    } else {
      console.log('断网错误处理')
    }
    console.log(`response err -->, ${error}`) // for debug
    return response ? Promise.reject(response) : Promise.reject(error)
  }
)

export default service
