<!--
 * @Date: 2020-10-28 13:01:55
 * @LastEditors: leslie-choi
 * @LastEditTime: 2020-11-22 21:49:19
-->
<template>
  <div class="m-header">
    <h1 @click="toIndex">病案上报系统</h1>
    <div class="m-out"
         @click="logout">
      <i class="el-icon-switch-button"
         style="margin-right:5px"></i>
      退出
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    logout () {
      console.log('out')
      // this.$router.push({
      //   path: '/login'
      // })
      // this.$message({
      //   type: 'success',
      //   message: '退出成功'
      // })
    },
    toIndex () {
      this.$router.push({
        path: '/index'
      })
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.m-header {
  background: #2c3e50;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  .m-out {
    cursor: pointer;
  }
}
</style>
