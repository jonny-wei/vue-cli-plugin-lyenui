<template>
  <div class="error-page">
    <div>
      <svg-icon icon-class="error404" class="error-page-img" />
    </div>
    <h4>抱歉！未找到您要的资源</h4>
    <el-button type="primary" plain @click="$router.push('/')">返回首页瞧瞧</el-button>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {}
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
.error-page{
  text-align: center;
  &-img{
    font-size: 28vw; // 500px
  }
  h4{
    margin-bottom: 4vw
  }
}
</style>
