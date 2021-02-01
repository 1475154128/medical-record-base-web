/*
 * @Description:
 * @Author: caixg
 * @Date: 2021-01-27 11:05:37
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-30 17:49:36
 */
import Cookies from 'js-cookie'

const TokenKey = 'Authorization'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, { expires: 10 })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function setUser (user) {
  return Cookies.set('user', user, { expires: 10 })
}

export function getUser () {
  return Cookies.get('user')
}
