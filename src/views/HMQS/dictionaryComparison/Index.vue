<!--
 * @Date: 2020-11-07 23:46:17
 * @LastEditors: leslie-choi
 * @LastEditTime: 2020-11-18 00:05:13
-->
<template>
  <div class="dictionary-comparison">
    <page-header @sendDateValue='showDateValue'
                 :active.sync='active' />
    <el-card>
      <el-card class="box-card">
        <span>未对照</span>
        <div v-for="o in 3"
             :key="o"
             class="platform-item">
          {{'列表内容 ' + o }}
        </div>
        <el-collapse-transition>
          <div v-show="tag">
            <div v-for="o in 10"
                 :key="o"
                 class="platform-item">
              {{'列表内容 ' + o }}
            </div>
          </div>
        </el-collapse-transition>
        <div class="m-footer"
             @click="tag = !tag">
          展示所有平台
          <i class="el-icon-arrow-down"
             v-show="tag"></i>
          <i class="el-icon-arrow-up"
             v-show="!tag"></i>
        </div>
      </el-card>
    </el-card>
    <el-card>
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="6">
            <span>字典类型：</span>
            <el-select v-model="dictionaryType"
                       clearable
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>字典：</span>
            <el-select v-model="dictionaryValue"
                       clearable
                       placeholder="请选择">
              <el-option v-for="item in dictionaryOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="primary"
                       plain>一键对照</el-button>
            <el-button type="success"
                       plain>已对照</el-button>
            <el-button>未对照</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入编码、名称"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button>查询</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData"
                border
                style="width: 100%;margin-top:20px;">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="localNumber"
                         label="本地编码">
        </el-table-column>
        <el-table-column prop="localName"
                         label="本地名称">
        </el-table-column>
        <el-table-column prop="reportNumber"
                         label="上报编码">
        </el-table-column>
        <el-table-column prop="reportName"
                         label="上报名称">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)"
                       type="text"
                       size="small">修改</el-button>
            <el-button type="text"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 对照完成 dialog -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="20%">
      <span>字典对照已经完成，请进行下一步操作！</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  props: {},
  data () {
    return {
      tag: false,
      dialogVisible: false,
      valueDate: '', // 选择时间值
      active: 2, // 当前激活步骤
      options: [{
        value: '1',
        label: '二级绩效诊断字典'
      }, {
        value: '2',
        label: '二级绩效手术字典'
      }, {
        value: '3',
        label: '二级绩效基础字典'
      }],
      dictionaryOptions: [{
        value: '1',
        label: '二级绩效诊断编码'
      }],
      dictionaryType: '', // 字典类型下拉框
      dictionaryValue: '', // 字典下拉框
      tableData: [{
        localNumber: '0532102',
        localName: '男',
        reportNumber: '233',
        reportName: '性别不明'
      }]
    }
  },
  watch: {},
  computed: {},
  methods: {
    showDateValue (val) {
      this.valueDate = val
      console.log(this.valueDate)
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.box-card {
  .m-footer {
    text-align: center;
    color: #99a9bf;
    cursor: pointer;
  }
}
</style>
