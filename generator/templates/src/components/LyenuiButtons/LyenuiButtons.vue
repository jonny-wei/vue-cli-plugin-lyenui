<template>
  <div>
    <el-row style="margin-top: 80px">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

    <el-row style="margin-top: 30px">
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
export default {
  name: 'LyenuiButtons'
}
</script>

<style scoped>

</style>
