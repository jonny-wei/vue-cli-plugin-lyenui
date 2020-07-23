<template>
  <div class="sidebar-logo">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" key="collapse" class="sidebar-logo-collapse">
        <hamburger-index :is-active="isActive" @toggleClick="toggleSideBar" />
      </div>
      <div v-else key="expand" class="sidebar-logo-container">
        <router-link class="sidebar-logo-link" to="/">
          <div style="margin: 0 24px">
            <img v-if="logo" :src="logo" class="sidebar-logo-img">
            <h1 class="sidebar-logo-title">{{ title }}</h1>
          </div>
        </router-link>
        <hamburger-index v-if="device!=='mobile'" :is-active="isActive" style="margin-right: 10px" @toggleClick="toggleSideBar" />
      </div>
    </transition>
  </div>
</template>

<script>
import logo from '@/assets/images/logo_small.png'
import defaultSettings from '@/settings'
import { mapGetters } from 'vuex'
import HamburgerIndex from '../Hamburger/HamburgerIndex'

export default {
  name: 'SideBarLogo',
  components: { HamburgerIndex },
  mixins: [],
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      title: defaultSettings.title,
      logo: logo
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'device']),
    isActive () {
      return this.sidebar.opened
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
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
.sidebar-logo{
  position: relative;
  width: 100%;
  height: $sidebarLogoHeight;
  line-height: $sidebarLogoHeight;
  background: $sideBarLogoBg;
  overflow: hidden;
  &-collapse{
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: $sidebarLogoHeight;
    height: $sidebarLogoHeight;
  }
  &-container{
    display: flex!important;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
  }
  &-link{
    height: 100%;
    width: 100%;
  }
  &-img{
    width: $sideBarLogoSize;
    height: $sideBarLogoSize;
    vertical-align: middle;
    margin-right: 12px;
  }
  &-title{
    display: inline-block;
    max-width: 180px;
    height:$sidebarLogoHeight;
    line-height: $sidebarLogoHeight;
    margin: 0;
    color: $sideBarLogoTextColor;
    font-weight: 600;
    font-size: $sideBarLogoTextSize;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
