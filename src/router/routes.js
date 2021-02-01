/*
 * @Date: 2020-10-28 13:01:55
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-30 13:10:51
 */
export default [
  {
    path: '/',
    component: (resolve) => require(['@/layout/Index'], resolve),
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: (resolve) => require(['@/views/index/Index'], resolve)
      },
      {
        path: '/hmsq/report-parameters',
        name: '上报参数设置',
        component: (resolve) => require(['@/views/HMQS/reportParameters/Index'], resolve)
      },
      {
        path: '/hmsq/dictionary-comparison',
        name: '字典对照设置',
        component: (resolve) => require(['@/views/HMQS/dictionaryComparison/Index'], resolve)
      },
      {
        path: '/hmsq/home-page-data-import',
        name: '首页数据导入',
        component: (resolve) => require(['@/views/HMQS/homePageDataImport/Index'], resolve)
      },
      {
        path: '/hmsq/report-data-contrast',
        name: '上报数据对照',
        component: (resolve) => require(['@/views/HMQS/reportDataContrast/Index'], resolve)
      },
      {
        path: '/hmsq/report-data-verified',
        name: '上报数据核查',
        component: (resolve) => require(['@/views/HMQS/reportDataVerified/Index'], resolve)
      },
      {
        path: '/hmsq/report-data-export',
        name: '上报数据导出',
        component: (resolve) => require(['@/views/HMQS/reportDataExport/Index'], resolve)
      },
      {
        path: '/system/menu/index',
        name: '菜单管理',
        component: (resolve) => require(['@/views/systemManage/menuManage'], resolve)
      },
      {
        path: '/system/user/index',
        name: '用户管理',
        component: (resolve) => require(['@/views/userManage/userManage'], resolve)
      },
      {
        path: '/system/role/index',
        name: '角色管理',
        component: (resolve) => require(['@/views/roleManage/roleManage'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login/index'], resolve)
  }
]
