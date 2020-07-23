<template>
  <component :is="type" v-bind="linkProps(to)" class="side-bar-link">
    <slot />
  </component>
</template>

<script>
import { isExternal } from 'Utils/validate'

export default {
  name: 'SideBarLink',
  components: {},
  mixins: [],
  props: {
    to: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    isExternal () {
      return isExternal(this.to)
    },
    type () {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
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
    linkProps (to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
