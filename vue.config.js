module.exports = {
  configureWebpack: {
    resolve: {
      // 解决路径相关问题
      alias: {
        // '@':'src' 已经有了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}