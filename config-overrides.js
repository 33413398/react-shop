const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra')

module.exports = override(
  // 装饰器支持
  addDecoratorsLegacy(),
  // 配置babel-plugin-import ==> 只打包import模块及css
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // 自动打包组件对应css
    // style: 'css',
    // 加载less编译
    style: true,
  }),
  // 添加less-loader对应的配置  ==> 修改primary对应的颜色
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  })
)
