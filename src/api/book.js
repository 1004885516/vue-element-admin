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

export function getBook (params) {
  return request({
    url: '/book/api',
    method: 'post',
    data: params
  })
}

export function getCategory () {
  return request({
    url: '/book/api',
    method: 'post'
  })
}

export function getBookList (query) {
  return request({
    url: '/book/api',
    method: 'post',
    data: query
  })
}

export function deleteOneBook (query) {
  return request({
    url: '/book/api',
    method: 'post',
    data: query
  })
}
