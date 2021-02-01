<!--
 * @Date: 2020-11-07 23:48:09
 * @LastEditors: leslie-choi
 * @LastEditTime: 2020-11-22 23:19:18
-->
<template>
  <div class="report-data-verified">
    <page-header @sendDateValue='showDateValue'
                 :active.sync='active' />
    <!-- 图表 -->
    <el-card v-show="!problemsVisible">
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-input v-model="keyword"
                      placeholder="请输入编码或名称"></el-input>
          </el-col>
          <el-col :span="4">
            <el-select v-model="value"
                       placeholder="全部">
              <!-- <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option> -->
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-button plain>查 询</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="danger"
                       @click="problemsVisible = true"
                       plain>问题列表</el-button>
          </el-col>
        </el-row>
      </div>
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
      <el-table :data="problemList"
                class="problem-list">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="problemsType"
                         label="核查问题类型">
        </el-table-column>
        <el-table-column prop="totalError"
                         label="错误项总数">
        </el-table-column>
        <el-table-column prop="errorItemPct"
                         label="错误项占比">
        </el-table-column>
        <el-table-column prop="errorNumbers"
                         label="错误份数">
        </el-table-column>
        <el-table-column prop="errorNumberPct"
                         label="错误份数占比">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)"
                       type="text"
                       size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 问题列表 -->
    <div v-show="problemsVisible">
      <el-row>
        <el-col :span="4">
          <div>
            <p class="problem-title">
              <el-link type="primary"
                       icon="el-icon-d-arrow-left"
                       @click="problemsVisible = false"
                       :underline="false">返回</el-link>
              <span>
                <i class="el-icon-circle-close"
                   style="color:red;"></i>
                必填项验证错误
              </span>
            </p>
          </div>
          <el-menu default-active="2"
                   class="el-menu-vertical-demo">
            <el-menu-item v-for="item in errorList"
                          :key="item.index">
              <span>{{item.error}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <!-- 修改 Dialog -->
    <base-dialog :dialogObj="dialogObj" />
  </div>
</template>

<script>
import echarts from 'echarts'
import PageHeader from '@/components/PageHeader'
import BaseDialog from '@/components/BaseEdit'

export default {
  components: {
    PageHeader,
    BaseDialog
  },
  props: {},
  data () {
    return {
      problemsVisible: false,
      valueDate: '', // 选择时间值
      active: 2, // 当前激活步骤
      pieOption: {
        title: {
          text: '核查结果概览',
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
          data: ['核查成功数量', '核查失败数量', '未核查数量']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '核查成功数量' },
              { value: 310, name: '核查失败数量' },
              { value: 234, name: '未核查数量' }
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
          text: '核查问题类别分类概览',
          subtext: '病案总数1111份',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        dataset: {
          source: [
            ['score', 'amount', 'product'],
            [89.3, 58212, '必填项验证有误'],
            [57.1, 78254, '技术通道验证有误'],
            [74.4, 41032, '值域验证有误'],
            [50.1, 12755, '接口标准验证有误'],
            [89.7, 20145, '完整性验证有误']
          ]
        },
        grid: { containLabel: true },
        xAxis: { name: '数量' },
        yAxis: { type: 'category' },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 10,
          max: 100,
          text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#D7DA8B', '#E15457']
          }
        },
        series: [
          {
            type: 'bar',
            encode: {
              x: 'amount',
              y: 'product'
            }
          }
        ]
      },
      problemList: [
        {
          problemsType: '必填项验证有误',
          totalError: '233',
          errorItemPct: '12%',
          errorNumbers: '31',
          errorNumberPct: '32%'
        }
      ],
      keyword: '',
      value: '', // 下拉框选择
      errorList: [
        {
          index: '1',
          error: '机构名称不能为空'
        },
        {
          index: '2',
          error: '机构名称不能为空'
        },
        {
          index: '3',
          error: '机构名称不能为空'
        }
      ],
      dialogObj: { // 传给 dialog 的值
      }
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
     * 点击修改项
     */
    handleClick (row) {
      console.log(row)
      this.dialogObj = {
        title: '修改 change',
        width: '30%',
        visible: true,
        info: {
          editName: '出院科别',
          editNumber: 'B16',
          originName: '心血管科',
          originValue: 'Z8002'
        }
      }
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
<style lang="scss" scoped>
.report-data-verified {
  #pie,
  #pic {
    width: 600px;
    height: 300px;
  }
  .problem-list {
    margin-top: 80px;
  }
  .problem-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 30px;
    color: #303133;
    width: 100%;
  }
}
</style>
