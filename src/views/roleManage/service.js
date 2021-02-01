/*
 * @Description
 * @Author: caixg
 * @Date: 2021-01-27 11:25:42
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-31 16:41:07
 */
import service from '@/utils/request'

// 根据角色标识查询角色数据
export function getRoles (params) {
  return service.get('/api/auth/sysRole/searchByRoleId', params)
}

// 条件查询角色数据，返回分页数据
export function getRolesList (params) {
  return service.post('/api/auth/sysRole/search', params)
}

// 更新角色数据
export function updateRoles (params) {
  return service.get('/api/auth/sysRole/update', params)
}

// 添加角色
export function addRoles (params) {
  return service.get('/api/auth/sysRole/insert', params)
}

// 删除角色
export function deleteRoles (params) {
  return service.get('/api/auth/sysRole/delete', params)
}

// 编辑角色菜单关系数据
export function deleteRolesMenu (params) {
  return service.get('/api/auth/sysRoleMenu/update', params)
}

// 获取左边权限🌲
export function getMenus () {
  return service.get('/api/auth/sysMenu/tree')
}
