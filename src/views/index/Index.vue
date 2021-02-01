 * @Date: 2020-11-01 23:42:50
<!--
 * @LastEditors: leslie-choi
 * @LastEditTime: 2020-11-05 22:53:27
-->
<template>
  <div class="main">
    <platform />
    <medical-record />
    <import-record />
  </div>
</template>

<script>
import medicalRecord from './components/MedicalRecord'
import platform from './components/Platform'
import importRecord from './components/ImportRecord'

export default {
  components: {
    medicalRecord,
    platform,
    importRecord
  },
  props: {},
  data () {
    return {
    }
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
