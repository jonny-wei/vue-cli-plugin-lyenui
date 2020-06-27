module.exports = (api, opts, rootOptions) => {
  const utils = require('./utils')(api)

  api.extendPackage({
    dependencies: {
      'element-ui': '^2.13.2'
    },
    devDependencies: {
      'sass': '^1.26.9',
      'sass-loader': '^8.0.2'
    }
  })

  api.injectImports(utils.getMain(), `import './plugins/lyenui/lyenui.js'`)

  api.render('./templates')

  if (opts.import === 'partial') {
    api.extendPackage({
      devDependencies: {
        'babel-plugin-component': '^1.1.1'
      }
    })
  }

  api.onCreateComplete(() => {
    if (opts.import === 'partial') {
      utils.updateBabelConfig(cfg => {
        const pluginComponent = ['component', {
          'libraryName': 'element-ui',
          'styleLibraryName': 'theme-chalk'
        }]
        cfg.plugins = cfg.plugins || []
        cfg.plugins.push(pluginComponent)
        return cfg
      })
    }
  })
}
