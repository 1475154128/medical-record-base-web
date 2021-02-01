<!--
 * @Date: 2020-11-07 23:48:14
 * @LastEditors: leslie-choi
 * @LastEditTime: 2020-11-19 22:23:26
-->
<template>
  <div class="report-parameters">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>上报参数设置</span>
        <el-button style="float: right; padding: 3px 0"
                   @click="addParams"
                   type="text">
          <i class="el-icon-plus"></i> 新增参数
        </el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input placeholder="请输入关键字"
                    v-model="input"
                    suffix-icon
                    clearable>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="name"
                         label="名称"
                         width="220">
        </el-table-column>
        <el-table-column prop="keyword"
                         label="关键字"
                         width="220">
        </el-table-column>
        <el-table-column prop="params"
                         label="参数值">
        </el-table-column>
        <el-table-column prop="description"
                         label="描述">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)"
                       type="text"
                       size="small">查看</el-button>
            <el-button type="text"
                       size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加 dialog 表单 -->
    <el-dialog title="新增上报参数"
               width="30%"
               center
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               :rules="formRules"
               label-width="100px">
        <el-form-item label="参数名称：">
          <el-input v-model="form.name"
                    placeholder="请输入参数名称"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键字：">
          <el-input v-model="form.keyword"
                    placeholder="请输入关键字"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数值：">
          <el-input v-model="form.keyword"
                    placeholder="请输入参数值"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="form.keyword"
                    type="textarea"
                    placeholder="请输入描述内容"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      input: '',
      tableData: [
        {
          name: '上传服务器目录',
          keyword: 'upload_directory',
          params: 'D:\batjData',
          description: '上传服务器目录'
        }
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        keyword: '',
        params: '',
        description: ''
      },
      formLabelWidth: '220px',
      formRules: {} // todo
    }
  },
  watch: {},
  computed: {},
  methods: {
    /**
     * 新增参数
     */
    addParams () {
      this.dialogFormVisible = true
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
</style>
