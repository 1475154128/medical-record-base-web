<!--
 * @Date: 2020-11-22 22:21:31
 * @LastEditors: leslie-choi
 * @LastEditTime: 2020-11-22 23:25:28
-->
<template>
  <div class="base-dialog">
    <el-dialog :title="dialogObj.title"
               center
               :visible.sync="dialogObj.visible"
               :width="dialogObj.width">
      <div v-if="dialogObj.info">
        <p class="item-info">
          <span class="item-label">修改项：</span>
          <span>
            {{dialogObj.info.editNumber}}
          </span>
          <span>
            {{dialogObj.info.editName}}
          </span>
        </p>
        <p class="item-info">
          <span class="item-label">原数值：</span>
          <span>
            {{dialogObj.info.originValue}}
          </span>
          <span>
            {{dialogObj.info.originName}}
          </span>
        </p>
        <el-form label-width="80px"
                 :model="editForm">
          <el-form-item label="修改值：">
            <el-input class="item-input"
                      v-model="editForm.newValue"></el-input>
            <el-input class="item-input"
                      v-model="editForm.newName"></el-input>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input :rows="2"
                      type="textarea"
                      v-model="editForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogObj.visible = false">取 消</el-button>
          <el-button type="primary"
                     @click="dialogObj.visible = false">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    dialogObj: {
      type: Object
      // default: () => {
      //   return {
      //     width: '30%'
      //   }
      // }
    }
  },
  data () {
    return {
      editForm: {
        item: '',
        originValue: '',
        newValue: '',
        newName: '',
        description: ''
      }
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
.base-dialog {
  .item-info {
    display: flex;
    justify-content: space-between;
    .item-label {
      display: block;
      width: 80px;
      padding-left: 12px;
    }
    .item-input {
      display: block !important;
      width: 100px;
    }
  }
}
</style>
