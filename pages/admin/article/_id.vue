<template>
  <div>
    <h2>news-details</h2>
    <p>newsId:{{ $route.params.id }}</p>
    <nuxt-link :to="{ name: 'index' }">
      Home
    </nuxt-link>
  </div>
</template>

<script>
export default {
  // 校验路由参数
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      title: this.$route.params.title
    }
  },
  head() {
    return {
      title: this.title,
      meta: [{ hid: 'description', name: 'mews1', content: 'mwkdwnnf akdwds' }]
    }
  }
}
</script>

<style lang=""></style>
