/*
 * @Description:
 * @Author: caixg
 * @Date: 2021-01-27 17:59:30
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-31 00:06:47
 */
import service from '@/utils/request'

// ่ทๅ่ๅ๐ฒ่กจๆ ผ
export function getMenus () {
  return service.get('/api/auth/sysMenu/tree')
}

// ๅ ้ค่ๅ
export function delMenu (payload) {
  console.log('payload', payload)
  return service.delete('/api/auth/sysMenu/delete', payload)
}

// ๆทปๅ ่ๅ
export function addMenu (payload) {
  return service.post('/api/auth/sysMenu/insert', payload)
}
