import Vue from 'vue'
import SvgIconIndex from 'Components/SvgIcon/SvgIconIndex.vue'

// register globally
Vue.component('svg-icon', SvgIconIndex)

const req = require.context('./svg', true, /\.svg$/) // 第二个参数 允许遍历子目录

const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
