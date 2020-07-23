<template>
  <div class="navbar">
    <div class="navbar-left-menu">
      <hamburger-index v-if="device==='mobile' || !showLogo" :is-active="sidebar.opened" style="margin: 0 15px" @toggleClick="toggleSideBar" />
      <template v-if="device!=='mobile'">
        <nav-bar-search id="header-search" />
      </template>
    </div>
    <div class="navbar-right-menu">
      <template v-if="device!=='mobile'">
        <div class="navbar-right-menu-item hover-effect">
          <el-badge is-dot class="bell-badge"><svg-icon icon-class="bell" /></el-badge>
        </div>
        <div class="navbar-right-menu-item hover-effect">
          <svg-icon icon-class="search" />
        </div>
        <div class="navbar-right-menu-item hover-effect">
          <svg-icon icon-class="question-circle" />
        </div>
        <div class="navbar-right-menu-item hover-effect">
          <svg-icon icon-class="earth" />
        </div>
      </template>
      <el-dropdown class="navbar-right-menu-avatar navbar-right-menu-item hover-effect" trigger="hover">
        <div class="navbar-right-menu-avatar-wrapper">
          <el-image
            class="navbar-right-menu-avatar-img"
            :src="userAvatar"
            fit="fill"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <a target="_blank" href="/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import avatar from '@/assets/images/logo_small.png'
import HamburgerIndex from '../Hamburger/HamburgerIndex'
import NavBarSearch from './NavBarSearch'
import { mapGetters } from 'vuex'

export default {
  name: 'NavBarIndex',
  components: { HamburgerIndex, NavBarSearch },
  mixins: [],
  props: {},
  data () {
    return {
      userAvatar: avatar
    }
  },
  computed: {
    ...mapGetters(['device', 'sidebar']),
    showLogo () {
      return this.$store.state.settings.sidebarLogo
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
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "../../styles/variables.scss";
.navbar{
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  @include user-select;
  &-left-menu{
    float: left;
    width: auto;
    height: 100%;
    line-height: $navBarHeight;
    display: flex;
    align-items: center;
  }
  &-right-menu{
    float: right;
    height: 100%;
    line-height: $navBarHeight;
    &:focus {
      outline: none;
    }
    &-item{
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      color: #fff;
      font-size: 30px;
      vertical-align: middle;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: $navBarItemMenuHoverColor
        }
      }
    }
    &-avatar{
      margin-right: 30px;
      &-wrapper{
        height: 76px;
        line-height: 92px;
        position: relative;
      }
      &-img{
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%
      }
      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 40px;
        font-size: 12px;
        color: #fff;
      }
    }
  }
}
  .bell-badge{
    line-height: 30px;
    height: 34px;
  }
</style>
