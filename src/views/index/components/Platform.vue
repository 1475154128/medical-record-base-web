<template>
  <div>
    <el-card class="box-card">
      <div v-for="o in 3"
           :key="o"
           class="platform-item">
        {{'列表内容 ' + o }}
      </div>
      <el-collapse-transition>
        <div v-show="tag">
          <div v-for="o in 10"
               :key="o"
               class="platform-item">
            {{'列表内容 ' + o }}
          </div>
        </div>
      </el-collapse-transition>

      <div class="m-footer"
           @click="tag = !tag">
        展示所有平台
        <i class="el-icon-arrow-down"
           v-show="tag"></i>
        <i class="el-icon-arrow-up"
           v-show="!tag"></i>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      tag: false
    }
  },
  watch: {},
  computed: {},
  methods: {
  },
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.box-card {
  .platform-list {
    overflow: hidden;
    height: 100px;
    transition: height 0.5s;
  }
  .m-footer {
    text-align: center;
    color: #99a9bf;
    cursor: pointer;
  }
}
</style>
