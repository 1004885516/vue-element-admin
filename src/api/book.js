import request from '@/utils/request'

export function createBook (book) {
  return request({
    url: '/book/api',
    method: 'post',
    data: book
  })
}

export function editBook (book) {
  return request({
    url: '/book/api',
    method: 'post',
    data: book
  })
}
