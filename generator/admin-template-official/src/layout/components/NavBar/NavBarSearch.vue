<template>
  <div class="navbar-search">
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="请输入您想搜索的内容"
      class="navbar-search-select"
      style="width: 465px;"
      @change="change"
    >
      <svg-icon slot="prefix" icon-class="search" style="font-size: 20px;color: #fff;" />
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script>
/**
   * @fix bug： fuse.js
   * @description 需要fuse.js@3.4.4版本 最新的fuse.js@6.4.0构造出来的数据的结构不一样，从而导致一些浏览器出错
   */
import Fuse from 'fuse.js'
import path from 'path'
import { constantRoutes } from '@/router/routers'
import { isExternal } from 'Utils/validate'

export default {
  name: 'NavBarSearch',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      search: '',
      options: [],
      searchPool: [],
      fuse: undefined
    }
  },
  computed: {
    routes () {
      return constantRoutes
    }
  },
  watch: {
    routes () {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool (list) {
      this.initFuse(list)
    }
  },
  created () {
  },
  mounted () {
    this.searchPool = this.generateRoutes(this.routes)
  },
  beforeDestroy () {
  },
  methods: {
    generateRoutes (routes, basePath = '/', prefixTitle = []) {
      let res = []
      for (const router of routes) {
        if (router.hidden) {
          continue
        }
        const data = {
          path: isExternal(router.path) ? router.path : path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }
        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]
          if (router.redirect !== 'noRedirect') {
            res.push(data)
          }
        }
        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    initFuse (list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      })
    },
    querySearch (query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    },
    change (val) {
      if (isExternal(val.path)) {
        window.open(val.path, '_blank')
      } else {
        this.$router.push(val.path)
      }
      this.search = ''
      this.options = []
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar-search {
    height: 100%;
    width: auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    &-select {
      ::v-deep .el-input__inner {
        background-color: #00257d;
        border: 1px solid #00257d;
        height: 48px;
        line-height: 48px;
        color: #fff;
        padding-left: 48px;
        &:hover {
          border: 1px solid #409EFF;
        }
      }
    }
    ::v-deep .el-input__prefix {
      line-height: 56px;
    }
    ::v-deep .el-select > .el-input {
      display: block;
      height: 50px;
      line-height: 50px;
    }
    ::v-deep .el-input__prefix {
      left: 16px;
    }
  }
</style>
