import request from 'Utils/request'

/**
 * @desc 用户相关接口
 * @author Jonny Wei
 * @date 2020/7/8
 */
const feature = '/vue-admin-template/user'

const user = {
  login (data) {
    return request({
      url: `${feature}/login`,
      method: 'post',
      data
    })
  },
  getInfo (token) {
    return request({
      url: `${feature}/info`,
      method: 'get',
      params: { token }
    })
  },
  logout () {
    return request({
      url: `${feature}/logout`,
      method: 'post'
    })
  }
}

export default user
