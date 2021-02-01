<template>
  <el-row class="tac">
    <el-col>
      <h1 class="title">病案上报系统</h1>
      <div class="user-info">
        <div class="avatar">
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2531979377,1157189295&fm=26&gp=0.jpg"
               alt="">
        </div>
        <p class="admin-info">系统管理员 giao</p>
      </div>
    <el-menu background-color="#1e282c"
            unique-opened
            :collapse="isCollapse"
    >
      <el-submenu v-for="(item, index) in menus" :key="index" :index="String(index + 1)">
        <template slot="title">
          <!-- <i class="el-icon-menu"></i> -->
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem.path)">{{subItem.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import * as api from './service'

export default {
  components: {},
  props: {},
  data () {
    return {
      menuList: {
        // personal: [{
        //   index: '1-1',
        //   text: '全部信息',
        //   path: '/personalWorkbench/All',
        //   statusId: ''
        // }],
        // workOrder: [
        //   {
        //     index: '2-1',
        //     text: '上报参数设置',
        //     path: '/hmsq/report-parameters'
        //   },
        //   {
        //     index: '2-2',
        //     text: '字典对照设置',
        //     path: '/hmsq/dictionary-comparison'
        //   },
        //   {
        //     index: '2-3',
        //     text: '首页数据导入',
        //     path: '/hmsq/home-page-data-import'
        //   },
        //   {
        //     index: '2-4',
        //     text: '上报数据对照',
        //     path: '/hmsq/report-data-contrast'
        //   },
        //   {
        //     index: '2-5',
        //     text: '上报数据核查',
        //     path: '/hmsq/report-data-verified'
        //   },
        //   {
        //     index: '2-6',
        //     text: '上报数据导出',
        //     path: '/hmsq/report-data-export'
        //   }
        // ]
      },
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 25
      },
      total: '',
      menus: [],
      isCollapse: false // 默认展开
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleOpen () {
      console.log('233')
    },
    handleClose () {
      console.log('233')
    },
    clickMenu (path) {
      this.$router.push({
        path
      })
    },
    async getMenu () {
      const res = await api.getMenus()
      const { state, data } = res.data
      // 处理菜单数据
      if (state === 200) {
        data.forEach((item, index) => {
          this.menus.push({
            title: item.sysMenuName,
            children: []
          })
          if (item.children) {
            item.children.forEach((subItem, subIndex) => {
              this.menus[index].children.push({
                title: subItem.sysMenuName,
                path: subItem.sysRequestUrl
              })
            })
          }
        })
      }
    }
  },
  created () {
    this.getMenu()
  },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.tac {
  padding-top: 10px;
  background: #1e282c;
  min-height: 100vh;
  /deep/ .el-menu {
    border: none;
    background: #1E282C;
    color: rgb(191, 203, 217);
  }
  /deep/ .el-submenu__title {
    color: rgb(191, 203, 217);
  }
  /deep/.el-submenu__title:hover {
    background: #263445;
  }
  .el-menu-item:hover {
    background-color: #001528;
  }
  /deep/ .el-menu-item.is-active {
    color: rgb(191, 203, 217);
  }
  .title {
    text-align: center;
    color: #ffffff;
  }
  .user-info {
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto;
      background: #ffffff;
      img {
        width: 80px;
        border-radius: 50%;
        height: 80px;
      }
    }
    .admin-info {
      text-align: center;
      color: #ffffff;
    }
  }
}
</style>
