<!--
 * @Description:
 * @Author: caixg
 * @Date: 2021-01-27 17:44:20
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-31 01:11:14
-->
<template>
  <div>
    <!-- 按钮列表 -->
    <btn-list @add="addMenu" @del="delMenu" @edit="editMenu" />
    <!-- 表格 -->
    <el-table
      :data="menusTable"
      row-key="id"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="label" label="菜单标题" width="200">
      </el-table-column>
      <el-table-column prop="seqNo" label="排序"></el-table-column>
      <el-table-column prop="seqNo" label="菜单图标路径"></el-table-column>
      <el-table-column prop="seqNo" label="菜单名称"></el-table-column>
      <el-table-column prop="seqNo" label="上级菜单"></el-table-column>
      <el-table-column prop="seqNo" label="菜单授权"></el-table-column>
      <el-table-column prop="seqNo" label="菜单类型"></el-table-column>
      <el-table-column prop="seqNo" label="菜单请求地址"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="delMenu(scope.row, false)" type="danger" icon="el-icon-delete" size="mini"></el-button>
          <el-button @click="editMenu(scope.row)" type="success" size="mini" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加菜单 -->
    <edit-menu
      :menuForm="menuForm"
      :dialogVisible="dialogVisible"
      @change="getMenuVal"
      :options="menusTable"
      :title="title"></edit-menu>
  </div>
</template>
<script>
import * as api from './service'
import editMenu from './components/edidMenu'
import btnList from '@/components/BtnList'

export default {
  components: {
    editMenu,
    btnList
  },
  props: {},
  data () {
    return {
      menusTable: [],
      popoverVisible: false,
      multipleSelection: [],
      dialogVisible: false,
      menuForm: {},
      title: ''// dialog 菜单
    }
  },
  watch: {},
  computed: {},
  methods: {
    async getMenus () {
      const res = await api.getMenus()
      const { data, state } = res.data
      if (state === 200) {
        this.menusTable = data
        this.formatData(this.menusTable)
      }
    },
    /**
     * 过滤数据为树形控件
     */
    filterTree (data) {
      const treeArr = []
      treeArr.push({
        children: data.children,
        label: data.label,
        id: data.id
      })
      return treeArr
    },
    /**
     * @params id
     * @params isMany true 为多个 false 为单个
     * 单个按钮删除菜单
     */
    delMenu (data, isMany) {
      this.$confirm('如果存在下级节点则一并删除，此操作不能撤销！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await api.delMenu({
          sysMenuIds: isMany === false ? data.id : this.multipleSelection
        })
        this.$message({
          type: 'success',
          message: res.data.message
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
      console.log('data', data)
    },
    editMenu (data) {
      this.dialogVisible = true
      this.title = '编辑菜单'
      // todo 菜单字段映射 ？
      this.menuForm = {
        seqNo: '',
        sysMenuIconPath: '',
        sysRequestUrl: '',
        sysMenuName: data.label,
        sysMenuParentId: '',
        sysMenuPermission: '',
        sysMenuType: '0'
      }
      console.log('data', data)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.id
      })
      console.log('val', this.multipleSelection)
    },
    addMenu () {
      this.dialogVisible = true
      this.title = '新增菜单'
    },
    getMenuVal (val) {
      console.log('val', val)
    },
    /**
     * 递归 给每个item 添加 value 属性 否则级联动组件无法使用
     */
    formatData (data) {
      data.forEach(item => {
        item.value = item.id
        if (item.children) {
          this.formatData(item.children)
        }
      })
    },
    closeDialog () {
      this.dialogVisible = false
    }
  },
  created () {
    this.getMenus()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
</style>
