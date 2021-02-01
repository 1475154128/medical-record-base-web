<!--
 * @Date: 2020-11-02 00:21:19
 * @LastEditors: leslie-choi
 * @LastEditTime: 2020-11-13 00:19:15
-->
<template>
  <div class="import-record">
    <el-card class="box-card">
      <div slot="header"
           class="">
        <span>各平台上报情况</span>
        <el-date-picker v-model="value"
                        @change="getVaule"
                        type="daterange"
                        align="center"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <el-row :gutter="20">
        <el-col v-for="item in platformLists"
                :span="4"
                :key="item.title">
          <el-card shadow="hover">
            <p>
              {{item.title}}
            </p>
            <p>
              {{item.number}}
            </p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    value: '',
    pickerOptions: {
      shortcuts: [{
        text: '最近一周',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近三个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }]
    },
    platformLists: [
      {
        title: 'HMQS',
        number: 1298
      },
      {
        title: '二级公立绩效',
        number: 1560
      },
      {
        title: '三级公立绩效',
        number: 1320
      },
      {
        title: '卫统上报',
        number: 1200
      },
      {
        title: '医保上报',
        number: 1300
      },
      {
        title: '医保上报1',
        number: 1300
      }
    ]
  }),
  methods: {
    getVaule () {
      console.log(this.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.import-record {
  margin-top: 20px;
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    margin-left: 100px;
  }
}
</style>
