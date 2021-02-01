<!--
 * @Date: 2020-11-07 23:48:03
 * @LastEditors: leslie-choi
 * @LastEditTime: 2020-11-18 23:25:43
-->
<template>
  <div class="report-data-contrast">
    <page-header @sendDateValue='showDateValue'
                 :active.sync='active' />
    <el-card v-if="!problemVisible">
      <div slot="header">
        <el-row>
          <el-col :span="4">
            <el-select v-model="value"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>

            </el-select>
          </el-col>
          <el-col :span="18">
            <el-button>查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="danger"
                       @click="problemVisible = true"
                       plain>问题列表</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData"
                border
                style="width: 100%;margin-top:20px;">
        <el-table-column type="index"
                         width="120px"
                         label="序号">
        </el-table-column>
        <el-table-column prop="caseNumber"
                         label="病案号">
        </el-table-column>
        <el-table-column prop="number"
                         label="入院次数">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名">
        </el-table-column>
        <el-table-column prop="inUnit"
                         label="入院单位">
        </el-table-column>
        <el-table-column prop="inTime"
                         label="入院时间">
        </el-table-column>
        <el-table-column prop="outUnit"
                         label="出院单位">
        </el-table-column>
        <el-table-column prop="outTime"
                         label="出院时间">
        </el-table-column>
        <el-table-column prop="status"
                         label="状态">
          <template slot-scope="scope">
            <el-tag type="info"
                    v-show="scope.row.status === 0">未映射</el-tag>
            <el-tag type="success"
                    v-show="scope.row.status === 1">映射成功</el-tag>
            <el-tag type="danger"
                    v-show="scope.row.status === 2">映射失败</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 问题列表 -->
    <el-card v-if="problemVisible">
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="14">
            <div class="back-icon">
              <el-link type="primary"
                       icon="el-icon-d-arrow-left"
                       @click="problemVisible = false"
                       :underline="false">返回</el-link>
            </div>
          </el-col>
          <el-col :span="4">
            <el-select v-model="problemValue"
                       placeholder="请选择">
              <el-option v-for="item in problemOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button>查询</el-button>
          </el-col>
          <el-col :span="4">
            <el-button>重新数据映射</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="problemsList">
        <el-table-column type="index"
                         width="120px"
                         label="序号">
        </el-table-column>
        <el-table-column prop="dictionaryTypes"
                         label="字典类别">
        </el-table-column>
        <el-table-column prop="originalTypes"
                         label="原始编码">
        </el-table-column>
        <el-table-column prop="originalName"
                         label="原始名称">
        </el-table-column>
        <el-table-column prop="copies"
                         label="份数">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="200">
          <el-button @click="batcheditVisible = true"
                     type="text"
                     size="medium">批量修改</el-button>
          <el-button type="text"
                     size="medium">新增对照</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 数据映射dialog -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="20%">
      <span>数据映射完成，请进行下一步操作！</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批量修改 dialog -->
    <el-dialog title="批量修改"
               center
               :visible.sync="batcheditVisible">
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="batcheditVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="batcheditVisible = false">确 定</el-button>
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
      active: 1,
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '身份证'
      }, {
        value: '2',
        label: '婚姻'
      }, {
        value: '3',
        label: '性别'
      }, {
        value: '4',
        label: '入院途径'
      }],
      problemOptions: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '未映射'
      }, {
        value: '2',
        label: '映射成功'
      }, {
        value: '3',
        label: '映射失败'
      }],
      value: '',
      problemValue: '',
      tableData: [
        {
          caseNumber: '000123',
          number: '2',
          name: '周树人',
          inUnit: '不知道什么单位',
          inTime: '2020-12-12',
          outUnit: '不知道什么单位',
          outTime: '2020-12-21',
          status: 0
        },
        {
          caseNumber: '000123',
          number: '2',
          name: '周树人',
          inUnit: '不知道什么单位',
          inTime: '2020-12-12',
          outUnit: '不知道什么单位',
          outTime: '2020-12-21',
          status: 1
        },
        {
          caseNumber: '000123',
          number: '2',
          name: '周树人',
          inUnit: '不知道什么单位',
          inTime: '2020-12-12',
          outUnit: '不知道什么单位',
          outTime: '2020-12-21',
          status: 2
        }
      ], // 列表数据
      dialogVisible: false,
      problemVisible: false,
      batcheditVisible: false,
      problemsList: [
        {
          dictionaryTypes: '证件类型',
          originalTypes: '2',
          originalName: '港澳通行证',
          copies: '2'
        }
      ] // 问题列表数据
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
.report-data-contrast {
  .back-icon {
    display: flex;
    align-items: center;
    height: 40px;
  }
}
</style>
