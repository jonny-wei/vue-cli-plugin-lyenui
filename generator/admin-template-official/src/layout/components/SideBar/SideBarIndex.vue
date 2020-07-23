<template>
  <div :class="{ 'has-logo': showLogo,'has-user': showUser,'has-all': showLogo && showUser}">
    <side-bar-logo v-if="showLogo" :collapse="isCollapse" />
    <side-bar-user v-if="showUser" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <side-bar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SideBarLogo from './SideBarLogo'
import SideBarUser from './SideBarUser'
import SideBarItem from './SideBarItem'
import { mapGetters } from 'vuex'

export default {
  name: 'SideBarIndex',
  components: { SideBarItem, SideBarUser, SideBarLogo },
  mixins: [],
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['sidebar']),
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    showUser () {
      return this.$store.state.settings.sidebarUser
    },
    routes () {
      return this.$router.options.routes
    },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
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

</style>
