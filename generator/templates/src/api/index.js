/**
 * @desc 自动导出各模块下的API
 * @author Jonny Wei
 * @date 2020/1/15
 */

const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import login from './modules/login'`
// it will auto require all api module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './login.js' => 'login'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default modules
