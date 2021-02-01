/*
 * @Description:
 * @Author: caixg
 * @Date: 2021-01-27 17:59:30
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-31 00:06:47
 */
import service from '@/utils/request'

// 获取菜单🌲表格
export function getMenus () {
  return service.get('/api/auth/sysMenu/tree')
}

// 删除菜单
export function delMenu (payload) {
  console.log('payload', payload)
  return service.delete('/api/auth/sysMenu/delete', payload)
}

// 添加菜单
export function addMenu (payload) {
  return service.post('/api/auth/sysMenu/insert', payload)
}
