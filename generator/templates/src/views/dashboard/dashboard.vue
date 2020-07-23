<template>
  <div class="dashboard">
    <el-image :src="logo" style="margin-bottom: 18px" />
    <h1>vue-cli-plugin-lyenui 快速构建企业中后台管理系统</h1>
    <h4>vue-cli-plugin-lyenui 基于 @vue/cli 4 的插件。快速，高效，构建企业中后台管理系统</h4>

    <el-row style="margin-top: 80px">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

    <el-row style="margin-top: 10px">
      <el-button icon="ly-icon-down-circle">默认按钮</el-button>
      <el-button type="primary" icon="ly-icon-frown">主要按钮</el-button>
      <el-button type="success" icon="ly-icon-check-circle">成功按钮</el-button>
      <el-button type="info" icon="ly-icon-info-circle">信息按钮</el-button>
      <el-button type="warning" icon="ly-icon-close-circle">警告按钮</el-button>
      <el-button type="danger" icon="el-icon-search">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
import logo from '@/assets/images/logo.png'
export default {
  name: 'Dashboard',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      logo: logo
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.dashboard{
  margin: 40px auto;
  text-align: center;
  .el-button{
    margin: 10px;
  }
}
</style>
