import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/login/api',
    method: 'post',
    data
  })
}

// axios get请求 params接收参数，post data接收

export function getInfo (params) {
  return request({
    url: '/user/api',
    method: 'post',
    data: params
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
