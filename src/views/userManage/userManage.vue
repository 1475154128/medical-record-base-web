<!--
 * @Description:用户管理
 * @Author: caixg
 * @Date: 2021-01-27 17:46:54
 * @LastEditors: caixg
 * @LastEditTime: 2021-02-01 10:35:35
-->
<template>
  <div class="user-manage">
    用户管理管理
    <btn-list @add="addUser" @del="delUser" @edit="editUser" />
    <el-row>
      <!-- <el-input
        placeholder="根据部门搜索用户"
        v-model="inputByDepartment">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input> -->
      <el-table :data="usersList">
        <el-table-column prop="sysRoleName" label="病案角色名称"></el-table-column>
        <el-table-column prop="sysUserName" label="病案用户名称"></el-table-column>
        <el-table-column prop="sysUserActualName" label="真实姓名"></el-table-column>
        <el-table-column prop="sysUserStatus" label="是否启用">
          <template slot-scope="scope">
            <el-switch
              @change="changeStatus(scope.row)"
              v-model="scope.row.sysUserStatus"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="sysRoleRemark" label="角色备注"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row)" type="success" size="mini" icon="el-icon-edit"></el-button>
            <el-button @click="delUser(scope.row)" type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="title"
        @close="closeDialog"
        :visible.sync="dialogVisible"
        width="25%"
        >
        <el-form :model="userform" ref="userform" :rules="userRules" label-width="130px" label-position="right">
          <!-- <el-form-item label="角色：" prop="roles"><el-input v-model="userform.roles"></el-input></el-form-item> -->
          <el-form-item label="真实姓名：" prop="sysUserActualName"><el-input v-model="userform.sysUserActualName"></el-input></el-form-item>
          <el-form-item label="病案用户名称：" prop="sysUserName"><el-input v-model="userform.sysUserName"></el-input></el-form-item>
          <el-form-item label="病案用户密码：" prop="sysUserPassword"><el-input v-model="userform.sysUserPassword"></el-input></el-form-item>
          <el-form-item label="是否启用：" prop="sysUserStatus">
            <el-switch
              v-model="userform.sysUserStatus"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="备注" prop="sysRoleRemark">
            <el-input v-model="userform.sysRoleRemark" type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAdd()">确 定</el-button>
        </span>
      </el-dialog>
      <el-pagination
        layout="prev, pager, next"
        @current-change="handelCurrentChange"
        :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import * as service from './service'
import { encrypt } from '@/utils/rsaEncrypt'
import btnList from '@/components/BtnList'

export default {
  components: {
    btnList
  },
  props: {},
  data () {
    return {
      inputByDepartment: '',
      usersList: [],
      currnet: 1, // 分页从 1 开始
      size: 10,
      total: 0,
      title: '',
      dialogVisible: false,
      userform: {
        sysUserActualName: '', // 真实姓名
        sysUserName: '', // 病案用户名称
        sysUserPassword: '', // 病案用户密码
        sysUserStatus: '1', // 是否启用
        roles: []
      },
      userRules: {
        sysUserActualName: [
          { required: true, message: '请输入真实姓名！', triger: 'blur' }
        ],
        sysUserName: [
          { required: true, message: '请输入病案用户名称！', triger: 'blur' }
        ],
        sysUserPassword: [
          { required: true, message: '请输入病案用户密码！', triger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    async getUsersList () {
      const params = {
        currnet: this.currnet,
        size: this.size
      }
      const res = await service.searchUser(params)
      if (res.data.state === 200) {
        const { totalCount, list, totalPage } = res.data.data
        this.usersList = list
        this.total = totalCount * totalPage
      }
    },
    changeStatus (data) {

    },
    editUser (data) {
      console.log('data', data)
      this.title = '编辑用户'
      this.dialogVisible = true
      this.userform = data
    },
    delUser (data) {
      // 传 id 数组
      const fn = async () => {
        const res = await service.delUser(data.sysUserId.split(' '))
        if (res.data.state === 200) {
          this.getUsersList()
        }
      }
      this.$ConfirmBox({
        fn
      })
    },
    addUser () {
      this.dialogVisible = true
      this.title = '添加用户'
    },
    closeDialog () {
      this.dialogVisible = false
    },
    confirmAdd () {
      this.$refs.userform.validate(async (validate) => {
        if (validate) {
          this.userform.sysUserPassword = encrypt(this.userform.sysUserPassword)
          const tag = this.title === '新增用户' ? 'addUser' : 'editUser'
          const res = await service[tag](this.userform)
          if (res.data.state === 200) {
            this.getUsersList()
            this.closeDialog()
          }
        }
      })
    },
    handelCurrentChange (val) {
      this.currnet = val
      this.getUsersList()
    }
  },
  created () {
    this.getUsersList()
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.user-manage {
  /deep/ .el-input-number .el-input__inner {
    padding: 0;
  }
  /deep/ .el-input__inner {
    width: 100%;
  }
}
</style>
