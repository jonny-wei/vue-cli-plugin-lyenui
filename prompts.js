const localeList = require('./lang.js')

module.exports = [
  {
    type: 'list',
    name: 'import',
    message: '您想如何引入组件(推荐按需引入)?',
    choices: [
      { name: '按需引入', value: 'partial' },
      { name: '全局引入', value: 'full' }
    ],
    default: 'partial'
  },
  {
    type: 'list',
    name: 'lang',
    message: '请选择要加载的国际化多语言设置',
    choices: localeList.map(locale => ({
      name: locale,
      value: locale
    })),
    default: 'zh-CN'
  },
  {
    type: 'confirm',
    name: 'plop',
    message: '是否使用自动化创建文件功能',
    default: true
  },
  {
    type: 'list',
    name: 'login',
    message: '请选择您喜欢的登录页模板',
    choices: [
      { name: '简约风格', value: 'concise' }
    ],
    default: 'concise'
  },
  {
    type: 'list',
    name: 'admin',
    message: '请选择您喜欢的后台管理模板',
    choices: [
      { name: '官方风格', value: 'official' }
    ],
    default: 'official'
  }
]
