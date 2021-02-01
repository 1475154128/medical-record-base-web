/*
 * @Description:
 * @Author: caixg
 * @Date: 2021-01-27 11:38:59
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-31 00:24:11
 */
import service from '@/utils/request'

export function getMenus () {
  return service.get('api/auth/sysMenu/build')
}
