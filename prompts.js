const localeList = require('./lang.js')

module.exports = [
  {
    type: 'list',
    name: 'import',
    message: '您想如何引入 LYENUI 组件(推荐按需引入)?',
    choices: [
      { name: '按需引入', value: 'partial' },
      { name: '全局引入', value: 'full' }
    ],
    default: 'partial'
  },
  {
    type: 'list',
    name: 'lang',
    message: '请选择要加载的国际化多语言设置(默认中文)',
    choices: localeList.map(locale => ({
      name: locale,
      value: locale
    })),
    default: 'zh-CN'
  }
]
