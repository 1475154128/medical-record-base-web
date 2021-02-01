<!--
 * @Date: 2021-01-31 00:46:50
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-31 01:11:36
-->
<template>
  <div>
      <el-button size="small" type="primary" @click="add">增加</el-button>
      <el-button size="small" type="success" @click="edit">修改</el-button>
      <el-button size="small" type="danger" @click="del">删除</el-button>
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
    add () {
      this.$emit('add')
    },
    edit () {
      this.$emit('edit')
    },
    del () {
      this.$emit('del')
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.btn-list {
  margin-bottom: 20px;
}
</style>
