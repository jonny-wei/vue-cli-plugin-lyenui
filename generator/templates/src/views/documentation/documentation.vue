<template>
  <div class="app-container documentation">
    <a class="documentation-btn" target="_blank" href="/">Documentation</a>
    <a class="documentation-btn" target="_blank" href="/">Github Repository</a>
    <a class="documentation-btn" target="_blank" href="/">国内文档</a>
  </div>
</template>

<script>
export default {
  name: 'Documentation',
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
  .documentation {
    margin: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    &-btn {
      flex-shrink: 0;
      display: block;
      cursor: pointer;
      background: black;
      color: white;
      height: 60px;
      width: 200px;
      margin-bottom: 16px;
      line-height: 60px;
      font-size: 20px;
      text-align: center;
      box-shadow: 0 0 8px 3px rgba(0,0,0,.3);
    }
  }
</style>
