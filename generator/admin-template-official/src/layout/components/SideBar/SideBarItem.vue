<template>
  <div v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <side-bar-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <side-bar-menu :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </side-bar-link>
    </template>
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <side-bar-menu v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <template v-if="item.meta && item.meta.groupSet">
        <div v-for="(group,index) in item.meta.groupSet" :key="`group${index}`">
          <el-menu-item-group>
            <template slot="title">{{ group }}</template>
            <side-bar-item
              v-for="child in getSameChild(item.children,group)"
              :key="child.path"
              :is-nest="true"
              :item="child"
              :base-path="resolvePath(child.path)"
              class="nest-menu"
            />
          </el-menu-item-group>
        </div>
      </template>
      <template v-else>
        <side-bar-item
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script>
import SideBarLink from './SideBarLink'
import SideBarMenu from './SideBarMenu'
import path from 'path'
import { isExternal } from 'Utils/validate'
import FixiOSBugMinix from '../../mixin/FixiOSBug'

export default {
  name: 'SideBarItem',
  components: { SideBarMenu, SideBarLink },
  mixins: [FixiOSBugMinix],
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    this.onlyOneChild = null
    return {
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
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    getSameChild (children = [], classType) {
      return children.filter(item => {
        return item.meta.group === classType
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
