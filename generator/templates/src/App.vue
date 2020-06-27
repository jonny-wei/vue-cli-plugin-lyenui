<template>
  <div id="app">
    <img style="margin-bottom: 16px" src="./assets/images/logo.png">
    <plugin-slogan msg="vue-cli-plugin-lyenui 快速构建 LYENUI 中后台管理系统"/>
    <lyenui-buttons />
  </div>
</template>

<script>
import PluginSlogan from './components/PluginSlogan/PluginSlogan.vue'
import LyenuiButtons from './components/LyenuiButtons/LyenuiButtons'

export default {
  name: 'App',
  components: {
    LyenuiButtons,
    PluginSlogan
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
