<template>
  <div>
    <navigation></navigation>
    <router-view class="router-view"/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
export default {
  name: 'App',
  components: {
    Navigation
  }

}
</script>

<style lang="stylus" scoped>
.router-view
  background-color #f7fbff
  min-height 50rem /* 800/16 */
</style>
