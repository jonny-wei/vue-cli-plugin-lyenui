<template>
  <div class="sidebar-user" :class="{'sidebar-user-collapse':collapse}">
    <transition name="sidebarUserFade">
      <div v-if="collapse" key="collapse" class="sidebar-user-container">
        <img v-if="logo" :src="logo" class="sidebar-user-avatar">
      </div>
      <div v-else key="expand" class="sidebar-user-container">
        <img v-if="logo" :src="logo" class="sidebar-user-avatar">
        <div class="sidebar-user-text">
          <h2>张小明</h2>
          <p>超级管理员</p>
        </div>
      </div>
    </transition>
    <div v-show="!collapse" class="sidebar-user-divider" />
  </div>
</template>

<script>
import logo from '@/assets/images/logo_small.png'

export default {
  name: 'SideBarUser',
  components: {},
  mixins: [],
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      logo: logo
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
  methods: {}
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "../../styles/variables";
  .sidebar-user {
    position: relative;
    width: auto;
    margin: 24px 26px 17px;
    &-container {
      display: flex;
      align-items: center;
    }
    &-avatar {
      width: $sideBarUserAvatarSize;
      height: $sideBarUserAvatarSize;
      border-radius: 50%;
    }
    &-text {
      width: auto;
      display: flex;
      flex-direction: column;
      margin-left: 16px;
      h2 {
        width: auto;
        max-width: 200px;
        height: 24px;
        font-size: 18px;
        text-align: left;
        color: rgba(0, 0, 0, .85);
        line-height: 24px;
        margin: 0;
        @include text-beyond(1)
      }
      p {
        width: auto;
        max-width: 200px;
        height: 20px;
        font-size: 14px;
        text-align: left;
        color: #464c5b;
        line-height: 20px;
        margin: 0;
        @include text-beyond(1)
      }
    }
    &-divider::after {
      content: "";
      width: 263px;
      height: 1px;
      position: absolute;
      background: rgba(0, 0, 0, 0.15);
      bottom: -17px;
    }
  }

  .sidebarUserFade-enter-active {
    transition: opacity 1.5s;
  }

  .sidebarUserFade-enter,
  .sidebarUserFade-leave-to {
    opacity: 0;
  }

  .sidebar-user-collapse {
    margin: 0 !important;
    width: 100%;
    padding: 22px 16px;
  }
</style>
