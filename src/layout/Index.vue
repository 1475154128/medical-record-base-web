<!--
 * @Date: 2020-10-28 13:01:55
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-02-01 00:20:48
-->
<template>
  <el-container class="m-main"
                direction="vertical">
    <!-- <el-header class="m-main-header">
    </el-header> -->
    <cus-header />
    <el-container class="m-main-container">
      <el-aside class="m-main-aside"
                width="300px">
        <cus-aside />
      </el-aside>
      <el-main>
        <cus-main />
      </el-main>
    </el-container>
    <!-- <CusFooter /> -->
  </el-container>
</template>

<script>
import CusAside from './Aside'
// import CusFooter from './Footer'
import CusHeader from './Header'
import CusMain from './Main'

export default {
  components: {
    CusHeader,
    CusAside,
    CusMain
    // CusFooter
  },
  props: {},
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
</style>
