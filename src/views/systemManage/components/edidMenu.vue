<!--
 * @Date: 2021-01-28 22:19:22
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-31 00:55:49
-->
<template>
  <div class="m-dialog">
    <el-dialog
      :title="title"
      @close='closeDialog'
      :visible="dialogVisible"
      :append-to-body="true"
      width="30%">
      <div>
        <el-form :rules="rules" :model="menuForm" ref="menuForm" label-width="80px">
          <el-form-item label="菜单类型" prop="sysMenuType">
            <el-radio-group @change="changeType" v-model="menuForm.sysMenuType" size="small">
              <el-radio-button label="0" value="0">目录</el-radio-button>
              <el-radio-button label="1" value="1">菜单</el-radio-button>
              <el-radio-button label="2" value="2">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单图标" prop="sysMenuIconPath">
            <el-input v-model="menuForm.sysMenuIconPath"></el-input>
          </el-form-item>
          <el-form-item label="权限标识" v-if="btnShow || menuShow" prop="sysMenuPermission">
            <el-input v-model="menuForm.sysMenuPermission"></el-input>
          </el-form-item>
          <el-form-item :label="label" prop="sysMenuName">
            <el-input v-model="menuForm.sysMenuName"></el-input>
          </el-form-item>
          <el-form-item label="路由地址" prop="sysRequestUrl">
            <el-input v-model="menuForm.sysRequestUrl"></el-input>
          </el-form-item>
          <el-form-item label="菜单排序" prop="seqNo">
            <el-input-number v-model="menuForm.seqNo" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="上级类目" prop="sysMenuParentId">
          <el-cascader
            v-model="menuForm.sysMenuParentId"
            @change="getUpType"
            :options="options"
            :props="{ checkStrictly: true }"
            clearable></el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../service'

export default {
  components: {},
  props: {
    title: {
      type: String,
      require: true
    },
    options: {
      type: Array,
      require: true
    },
    dialogVisible: {
      type: Boolean,
      require: true,
      default: false
    },
    menuForm: {
      type: Object,
      require: false,
      default: () => {
        return {
          seqNo: '',
          sysMenuIconPath: '',
          sysRequestUrl: '',
          sysMenuName: '',
          sysMenuParentId: '',
          sysMenuPermission: '',
          sysMenuType: '0'
        }
      }
    }
  },
  data () {
    return {
      directoryShow: true, // 默认true 控制目录类型下显示字段
      menuShow: '',
      btnShow: '',
      label: '菜单名称',
      rules: {
        sysRequestUrl: [
          { required: true, message: '请输入地址' }
        ],
        sysMenuName: [
          { required: true, message: '请输入名称' }
        ]
      }
    }
  },
  watch: {
  },
  computed: {},
  methods: {
    async getMenus () {
      const res = await api.getMenus()
      const { data, state } = res.data
      if (state === 200) {
        this.options = data
        console.log('this.options', this.options)
      }
    },
    getUpType (val) {
    },
    cancel () {
      this.$parent.closeDialog()
    },
    confirm () {
      const len = this.menuForm.sysMenuParentId.length
      this.menuForm.sysMenuParentId = this.menuForm.sysMenuParentId[len - 1]
      // 校验
      this.$refs.menuForm.validate(async (valid) => {
        if (valid) {
          const res = await api.addMenu(this.menuForm)
          console.log('res', res)
          this.$parent.getMenus()
          this.$parent.closeDialog()
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    // 控制字段显示隐藏
    changeType () {
      const tag = this.menuForm.sysMenuType
      this.label = '菜单名称'
      if (tag === '1') {
        this.menuShow = true
        this.directoryShow = this.btnShow = false
      } else if (tag === '2') {
        this.btnShow = true
        this.directoryShow = this.menuShow = false
        this.label = '按钮名称'
      } else {
        this.directoryShow = true
        this.menuShow = this.btnShow = false
      }
    },
    closeDialog () {
      this.$parent.closeDialog()
    }
  },
  created () {
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.m-dialog {
  /deep/ .el-input-number .el-input__inner {
    padding: 0;
  }
  /deep/ .el-input__inner {
    width: 100%;
  }
}
</style>
