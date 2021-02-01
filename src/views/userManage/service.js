/*
 * @Description:
 * @Author: caixg
 * @Date: 2021-01-27 17:59:30
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-31 15:48:47
 */
import service from '@/utils/request'

// 添加用户
export function addUser (payload) {
  return service.post('/api/auth/sysUser/insert', payload)
}

// 删除用户
export function delUser (payload) {
  return service.post('/api/auth/sysUser/delete', payload)
}

// 更新用户
export function editUser (payload) {
  return service.post('/api/auth/sysUser/update', payload)
}

// 更新密码
export function updatePassword (payload) {
  return service.post('/api/auth/sysUser/updatePass', payload)
}

// 查询用户数据
export function getUserInfo (payload) {
  return service.post('/api/auth/sysUser/searchByUserId', payload)
}

// 条件查询用户
export function searchUser (payload) {
  return service.post('/api/auth/sysUser/search', payload)
}
