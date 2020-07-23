const path = require('path')
const os = require('os')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const defaultSettings = require('./src/settings.js')

const productionGzipExtensions = ['js', 'css', 'html']

const resolve = dir => path.join(__dirname, dir)

const name = defaultSettings.title || 'Vue Admin Template'

module.exports = {
  publicPath: '/',
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  devServer: {
    port: 8001,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    https: false
  },

  css: {
    extract: true,
    sourceMap: false
  },

  parallel: os.cpus().length > 1,

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      /* Gzip 压缩开启 */
      config.plugins.push(new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      }))
    }
    Object.assign(config, {
      name,
      resolve: {
        alias: {
          '@': resolve('src'),
          Api: resolve('src/api/'),
          Components: resolve('src/components/'),
          Utils: resolve('src/utils/'),
          Views: resolve('src/views/')
        },
        extensions: ['.vue', '.js', '.ts', '.json'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
      }
    })
  },

  chainWebpack: (config) => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.module
      .rule('svg')
      .exclude
      .add(resolve('src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map'))

    config
      .when(process.env.NODE_ENV !== 'development',
        (config) => {
          if (process.env.npm_config_report) {
            config
              .plugin('webpack-bundle-analyzer')
              .use(BundleAnalyzerPlugin)
              .end()
            config.plugins.delete('prefetch')
          }
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()

          config
            .optimization.minimizer('terser').tap(args => {
              args[0].terserOptions.compress['warnings'] = false
              args[0].terserOptions.compress['drop_console'] = true
              args[0].terserOptions.compress['drop_debugger'] = true
              args[0].terserOptions.compress.pure_funcs = ['console.*']
              return args
            })
            .end()

          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial'
                },
                elementUI: {
                  name: 'chunk-elementUI',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'),
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        })
  }
}
