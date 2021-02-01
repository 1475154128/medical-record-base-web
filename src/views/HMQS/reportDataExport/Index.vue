<!--
 * @Date: 2020-11-07 23:48:03
 * @LastEditors: leslie-choi
 * @LastEditTime: 2020-11-19 23:01:27
 * @description 上报数据导出
-->
<template>
  <div class="report-data_export">
    <page-header @sendDateValue='showDateValue'
                 :active.sync='active' />
    <!-- 图表 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <div id="pie"
               ref="pieChart"></div>
        </el-col>
        <el-col :span="12">
          <div id="pic"
               ref="picChart"></div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 统计查询表格 -->
    <el-card>
      <div slot="header">
        <el-row>
          <el-col :span="21">
            <span>统计查询：</span>
            <el-select v-model="queryValue"
                       clearable
                       placeholder="请选择">
              <el-option v-for="item in queryOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-button icon="el-icon-search"
                       style="margin:0 0 20px 20px;"
                       plain>查询</el-button>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-edit"
                       type="primary"
                       @click="editVisible = batchVisible = true"
                       plain>批量修改</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-table :data="tableData"
                    border
                    style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="statisticalName"
                             label="统计项名称">
            </el-table-column>
            <el-table-column prop="statisticalNumbers"
                             label="统计项份数">
            </el-table-column>
            <el-table-column prop="total"
                             label="总份数">
            </el-table-column>
            <el-table-column prop="percent"
                             label="统计项占比">
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             width="100">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)"
                           type="text"
                           size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-card>
    <!-- 修改 dialog -->
    <el-dialog title="修改"
               :visible="editVisible"
               width="30%"
               center>
      <div v-if="batchVisible">
        <p>批量修改条件</p>
        <p>批量修改内容</p>
      </div>
      <div v-else>
        修改项
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts'
import PageHeader from '@/components/PageHeader'

export default {
  components: {
    PageHeader
  },
  props: {},
  data () {
    return {
      batchVisible: false,
      editVisible: false, // 修改 dialog
      valueDate: '', // 选择时间值
      active: 2, // 当前激活步骤
      pieOption: {
        title: {
          text: '最新导出结果',
          subtext: '病案总数1111份',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['导出成功数量', '导出失败数量', '未导出数量']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '导出成功数量' },
              { value: 310, name: '导出失败数量' },
              { value: 234, name: '未导出数量' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      picOption: {
        title: {
          text: '最新12月导出情况',
          left: 'center'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07',
              '2020-08', '2020-09', '2020-10', '2020-11', '2020-12'
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '病案数',
            type: 'bar',
            barWidth: '60%',
            data: [10, 200, 334, 390, 330, 220, 213, 432, 543, 321, 903, 1432]
          }
        ]
      },
      queryOptions: [{
        value: '1',
        label: '医疗付款方式'
      }, {
        value: '2',
        label: '性别'
      }, {
        value: '3',
        label: '入院科室'
      }, {
        value: '4',
        label: '出院科室'
      }, {
        value: '5',
        label: '主要诊断'
      }, {
        value: '6',
        label: '主要手术'
      }],
      queryValue: '',
      tableData: [
        {
          statisticalName: '城镇职工基本医疗保险',
          statisticalNumbers: '333',
          total: '1000',
          percent: '33.3%'
        }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    showDateValue (val) {
      this.valueDate = val
      console.log(this.valueDate)
    },
    /**
     * 绘制饼图
     */
    async createPie () {
      const pieChart = echarts.init(document.getElementById('pie'))
      pieChart.setOption(this.pieOption)
    },
    /**
     * 绘制柱形图
     */
    async createPic () {
      const picChart = echarts.init(document.getElementById('pic'))
      picChart.setOption(this.picOption)
    },
    /**
     * 修改 对应项
     * @params type batch 对应 批量修改
     */
    handleEdit () {
      this.editVisible = true
      this.batchVisible = false
    }
  },
  created () { },
  mounted () {
    this.$nextTick(() => {
      this.createPie()
      this.createPic()
    })
  }
}
</script>
<style lang="scss">
.report-data_export {
  #pie,
  #pic {
    width: 600px;
    height: 300px;
  }
  .el-dialog__headerbtn {
    display: none;
  }
}
</style>
