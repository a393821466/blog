<template>
  <div>
    <h2 v-if="error.statusCode == 404">
      404页面
    </h2>
    <h2 v-else>
      500页面
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang=""></style>
