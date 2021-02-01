<!--
 * @Description:
 * @Author: caixg
 * @Date: 2021-01-27 17:47:19
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-31 17:02:05
-->
<template>
  <div>角色管理
    <el-row :gutter="20">
      <el-col :span="5">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>权限分配</span>
        </div>
        <el-tree
          :data="treeData"
          show-checkbox
          default-expand-all
          @check-change="handleCheckChange">
        </el-tree>
      </el-card>
      </el-col>
      <el-col :span="19">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>角色列表</span>
        </div>
        <el-table
          ref="multipleTable"
          @row-click="rowSelect"
          :data="rolesTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column prop="sysRoleName" label="名称"></el-table-column>
          <el-table-column prop="name" label="数据权限"></el-table-column>
          <el-table-column prop="seqNo" label="角色级别"></el-table-column>
          <el-table-column prop="sysRoleRemark" label="描述"></el-table-column>
          <el-table-column prop="name" label="创建日期"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="delRole(scope.row)" type="danger" icon="el-icon-delete" size="mini"></el-button>
              <el-button @click="editRole(scope.row)" type="success" size="mini" icon="el-icon-edit"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as service from './service'

export default {
  components: {},
  props: {},
  data () {
    return {
      rolesTable: [],
      current: 1,
      size: 10,
      props: {
        children: 'children',
        label: 'label'
      },
      treeData: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    async getRolesList () {
      const params = {
        current: this.current,
        size: this.size
      }
      const res = await service.getRolesList(params)
      console.log('res', res.data)
      if (res.data.state === 200) {
        this.rolesTable = res.data.data.list
      }
    },
    async getMenus () {
      const res = await service.getMenus()
      const { data, state } = res.data
      if (state === 200) {
        this.treeData = data
        console.log('data', data)
      }
    },
    handleSelectionChange (val) {
      console.log('233', val)
    },
    handleCheckChange (val) {
      console.log('val', val)
    },
    delRole (data) {},
    editRole (data) {},
    rowSelect (row, column, event) {
      console.log('2222', row, column, event)
    }
  },
  created () {
    this.getRolesList()
    this.getMenus()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
</style>
