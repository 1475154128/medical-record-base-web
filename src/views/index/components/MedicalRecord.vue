<template>
  <div class="medical-record">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header"
               class="recently-record">
            <span>最近病案导入情况</span>
            <el-date-picker v-model="value"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            @change="dateHandle"
                            value-format="yyyy-MM-dd"
                            end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary"
                       @click="importData">导入</el-button>
          </div>
          <div v-for="o in 9"
               :key="o"
               class="platform-item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="pic"
               ref="chart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  components: {},
  props: {},
  data () {
    return {
      myOptions: {
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
            data: [10, 200, 334, 390, 330, 220, 213, 432, 543, 321, 903, 432]
          }
        ]
      },
      value: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    /**
     * 绘制柱状图
     */
    async createPicture () {
      const myChart = echarts.init(document.getElementById('pic'))
      myChart.setOption(this.myOptions)
    },
    /**
     * 获取选择的 date
     */
    async dateHandle () {
      console.log(this.value)
    },
    /**
     * 导入数据
     */
    async importData () {
      this.$confirm('数据导入完成，请进行下一步操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 跳转
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  created () { },
  mounted () {
    this.$nextTick(() => {
      this.createPicture()
    })
  }
}
</script>
<style lang="scss" scoped>
.medical-record {
  margin-top: 20px;
  #pic {
    width: 600px;
    height: 300px;
  }
  .recently-record {
    line-height: 40px;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }
}
</style>
