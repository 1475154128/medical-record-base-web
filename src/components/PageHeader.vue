<!--
 * @Date: 2020-11-15 21:56:35
 * @LastEditors: leslie-choi
 * @LastEditTime: 2020-11-15 23:04:37
-->
<template>
  <el-card>
    <div slot="header">
      <div class="block">
        <span>出院日期：</span>
        <el-date-picker v-model="valueDate"
                        format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <el-steps :active="active"
              process-status="process"
              finish-status="success">
      <el-step title="字典对照维护"
               icon="el-icon-edit"></el-step>
      <el-step title="数据映射"
               icon="el-icon-data-line"></el-step>
      <el-step title="数据核查"
               icon="el-icon-reading"></el-step>
      <el-step title="数据导出"
               icon="el-icon-upload"></el-step>
    </el-steps>
  </el-card>
</template>

<script>
export default {
  components: {},
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      valueDate: ''
    }
  },
  watch: {
    valueDate: {
      handler (oldVal, newVal) {
        if (newVal !== '') {
          this.$emit('sendDateValue', newVal)
        } else {
          this.$emit('sendDateValue', oldVal)
        }
      },
      deep: true
    }
  },
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
</style>
