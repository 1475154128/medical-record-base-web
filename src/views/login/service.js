/*
 * @Description
 * @Author: caixg
 * @Date: 2021-01-27 11:25:42
 * @LastEditors: caixg
 * @LastEditTime: 2021-01-27 14:20:20
 */
import service from '@/utils/request'

export function login (params) {
  return service.post('api/register/login', params)
}
