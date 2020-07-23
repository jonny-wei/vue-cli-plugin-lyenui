module.exports = (api, opts, rootOptions) => {
  const utils = require('./utils')(api)

  api.render((files) => {
    delete files['src/views/Home.vue']
    delete files['src/views/About.vue']
    delete files['src/components/HelloWorld.vue']
    delete files['src/assets/logo.png']
  })

  api.extendPackage({
    scripts: {
      'build:report': 'npm run build --report',
      'build:test': 'vue-cli-service build --mode test',
      'svgo': 'svgo -f src/icons/svg/svg_svgo --config=src/icons/svgo.yml'
    },
    dependencies: {
      'axios': '^0.19.2',
      'element-ui': '^2.13.2',
      'fuse.js': '^3.4.4',
      'js-cookie': '^2.2.1',
      'normalize.css': '^8.0.1',
      'nprogress': '0.2.0',
      'path-to-regexp': '2.4.0',
      'vue-router': '^3.3.4',
      'vuex': '^3.4.0'
    },
    devDependencies: {
      'autoprefixer': '^9.8.5',
      'compression-webpack-plugin': '^4.0.0',
      'sass': '^1.26.9',
      'sass-loader': '^8.0.2',
      'script-ext-html-webpack-plugin': '^2.1.4',
      'svg-sprite-loader': '^4.3.0',
      'svgo': '^1.3.2',
      'webpack-bundle-analyzer': '^3.8.0'
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

  if (opts.plop) {
    api.extendPackage({
      scripts: {
        'plop': 'plop'
      },
      devDependencies: {
        'plop': '^2.7.2'
      }
    })
    api.render('./plop')
  }

  switch (opts.login) {
    case 'concise':
      api.render({
        './src/views/login/login.vue': './login-template-concise/login/login.vue'
      })
      break
    default:
      api.render({
        './src/views/login/login.vue': './login-template-concise/login/login.vue'
      })
  }

  switch (opts.admin) {
    case 'official':
      api.render('./admin-template-official')
      break
    default:
      api.render('./admin-template-official')
  }
}
