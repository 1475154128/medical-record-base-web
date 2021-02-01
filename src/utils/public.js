/*
 * @Date: 2021-01-30 23:06:30
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-31 13:20:18
 */
import Vue from 'vue'
import { MessageBox, Message } from 'element-ui'

/**
 * @params
 * txt 提示文本
 * type 消息类型
 * title 弹框标题
 * fun 成功回调函数
 */

export default Vue.prototype.$ConfirmBox = (options) => {
  const { type = 'waring', txt = '确定删除本条数据？', title = '提示', fn } = options
  MessageBox.confirm(txt, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  }).then(() => {
    fn()
    Message({
      type: 'success',
      message: '删除成功!'
    })
  }).catch((err) => {
    console.log('err', err, fn)
    Message({
      type: 'info',
      message: '已取消!'
    })
  })
}
