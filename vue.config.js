// vue.config.js
// 自定义resolve函数，由于加载资源
const path = require('path')

// 定义根目录引入的方法
const resolve = dir => {
  return path.join(__dirname, '.', dir)
}

// webpack相关配置
module.exports = {
  chainWebpack: config => {
    // 别名配置,进设置src一个，与其项目包此后同步，便于移动业务模块
    config.resolve.alias.set('@', resolve('src'))
  },
}
