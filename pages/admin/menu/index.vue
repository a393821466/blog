<template>
  <div>
    {{ da }}
    <nuxt-link :to="{ name: 'index' }">
      Home
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'frame',
  name: 'About',
  data() {
    return {
      da: 'about'
    }
  }
}
</script>

<style lang=""></style>
