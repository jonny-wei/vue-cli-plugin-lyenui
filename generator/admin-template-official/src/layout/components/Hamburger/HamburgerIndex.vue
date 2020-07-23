<template>
  <div class="hamburger" @click="toggleClick">
    <svg-icon
      icon-class="hamburger"
      :class="{'hamburger-active':!isActive}"
      class="hamburger-icon"
      style="margin: 0;"
    />
  </div>
</template>

<script>
export default {
  name: 'HamburgerIndex',
  components: {},
  mixins: [],
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  watch: {},
  created () {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
.hamburger{
  text-align: center;
  display: inline-flex;
  &-icon{
    height: 100%;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    color: $hamburgerColor;
    font-size: $hamburgerSize;
    &:hover {
      color: $hamburgerHoverColor
    }
  }
  &-active {
    transform: rotate(180deg);
  }
}
</style>
