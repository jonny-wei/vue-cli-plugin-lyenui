<template>
  <div :class="classObj" class="layout">
    <div v-if="device === 'mobile' && sidebar.opened" class="layout-drawer" @click="handleClickOutside" />
    <side-bar-index class="layout-sidebar" />
    <div class="layout-main">
      <div class="navbar-fixed-placeholder">
        <nav-bar-index :class="{'navbar-fixed':fixedNavBar}" />
      </div>
      <section class="layout-main-views">
        <tags-view-index v-if="needTagsView && device !== 'mobile'" />
        <breadcrumbs-index v-if="needBreadcrumbs && device !== 'mobile'" />
        <transition name="fade-transform" mode="out-in">
          <router-view :key="viewKey" />
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import ResizeMixin from './mixin/ResizeHandler'
import SideBarIndex from './components/SideBar/SideBarIndex'
import NavBarIndex from './components/NavBar/NavBarIndex'
import TagsViewIndex from './components/TagsView/TagsViewIndex'
import BreadcrumbsIndex from './components/Breadcrumbs/BreadcrumbsIndex'

export default {
  name: 'Layout',
  components: {
    BreadcrumbsIndex,
    TagsViewIndex,
    NavBarIndex,
    SideBarIndex
  },
  mixins: [ResizeMixin],
  props: {},
  data () {
    return {}
  },
  computed: {
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    device () {
      return this.$store.state.app.device
    },
    sidebar () {
      return this.$store.state.app.sidebar
    },
    fixedNavBar () {
      return this.$store.state.settings.fixedNavBar
    },
    needTagsView () {
      return this.$store.state.settings.tagsView
    },
    needBreadcrumbs () {
      return this.$store.state.settings.breadcrumbs
    },
    viewKey () {
      return this.$route.path
    }
  },
  watch: {},
  created () {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "styles/variables";

  .layout {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
    &-drawer {
      background: #000;
      opacity: 0.3;
      width: 100%;
      top: 0;
      height: 100%;
      position: absolute;
      z-index: 999;
    }
    &-main {
      min-height: 100%;
      transition: margin-left .28s;
      margin-left: $sideBarWidth;
      position: relative;
      background-color: $layoutMainBg;
      &-views {
        min-height: calc(100vh - #{$navBarHeight});
        padding: $layoutMainViewsPadding;
        width: 100%;
        position: relative;
        overflow: hidden;
      }
    }
  }

  .navbar-fixed-placeholder{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $navBarHeight;
    background: $primary-color;
    z-index: 2;
  }

  .navbar-fixed {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    transition: width 0.28s;
    width: calc(100% - #{$sideBarWidth});
  }

  .layout-main-views{
    padding-top: $navBarHeight + $layoutMainViewsPaddingTop;
  }

  .hideSidebar .navbar-fixed{
    width: calc(100% - #{$sideBarCollapseWidth});
  }

  .mobile .navbar-fixed{
    width: 100%;
  }
</style>

