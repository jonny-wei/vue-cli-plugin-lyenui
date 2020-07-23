<template>
  <div id="tags-view" class="tags-view">
    <div class="tags-view-header">
      <svg-icon :icon-class="activeIcon" class="tags-view-header-icon" />
    </div>
    <tags-view-scroll-panel ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        <span>{{ tag.title }}</span>
        <span v-if="!isAffix(tag)" class="tags-view-item-close-icon el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </tags-view-scroll-panel>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script>
import TagsViewScrollPanel from './TagsViewScrollPanel'
import path from 'path'
export default {
  name: 'TagsViewIndex',
  components: { TagsViewScrollPanel },
  mixins: [],
  props: {},
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      activeIcon: 'dashboard'
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    },
    routes () {
      // console.log(this.$store.state.permission.routes)
      return this.$router.options.routes
    }
  },
  watch: {
    $route () {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  created () {
  },
  mounted () {
    this.initTags()
    this.addTags()
  },
  beforeDestroy () {
  },
  methods: {
    isActive (route) {
      if (route.path === this.$route.path) {
        this.activeMenuIcon(route)
        return true
      } else {
        return false
      }
    },
    activeMenuIcon (route) {
      const { icon } = route.meta
      const { icon: parentIcon } = (route.matched && route.matched[0].meta) || ''
      this.activeIcon = icon || parentIcon || 'dashboard'
    },
    isAffix (tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags (routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags () {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags () {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag (view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag (view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags (view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView (visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu (tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu () {
      this.visible = false
    },
    handleScroll () {
      this.closeMenu()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "../../styles/variables";
.tags-view{
  @include user-select;
  height: $tagsViewHeight;
  width: 100%;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(221, 221, 221, .5);
  display: flex;
  align-items: center;
  &-header{
    min-width: $tagsViewHeight;
    height: $tagsViewHeight;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-right: 1px solid #d1d9e2!important;
    &-icon{
      font-size: 20px;
      color: #000;
      vertical-align: middle;
    }
  }
  &-item{
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: $tagsViewHeight;
    line-height: 50px;
    color: #495060;
    background: #fff;
    padding: 0 26px;
    font-size: 18px;
    border-top: 4px solid #fff;
    &.active {
      background-color: #e6efff;
      color: #0b318f;
      border-top-color: #0b318f;
    }
    &-close-icon{
      height: 18px;
      width: 18px;
      line-height: 18px;
      border-radius: 50%;
      vertical-align: middle;
      text-align: center;
      position: relative;
      cursor: pointer;
      font-size: 12px;
      margin-left: 6px;
      font-weight: bold;
      &:hover{
        color: #fff;
        background-color: #0b318f;
        transition: background-color .1s ease-in;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background-color: #e6efff;
        color: #0b318f;
      }
    }
  }
}
</style>
