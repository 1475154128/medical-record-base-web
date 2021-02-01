/*
 * @Date: 2020-11-05 22:40:04
 * @LastEditors: caixg
 * @LastEditTime: 2021-01-27 14:19:46
 */

// vue.config.js
/**
 * 如何配置webpack： https://cli.vuejs.org/guide/webpack.html
 * webpack Config: https://cli.vuejs.org/config/#vue-config-js
 * chainWebpack语法：https://github.com/mozilla-neutrino/webpack-chain
 * 
 */
module.exports = {
  // baseUrl: process.env.NODE_ENV === 
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://129.204.32.6:8079',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
