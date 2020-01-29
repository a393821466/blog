<template>
  <span
    class="emoji-item-common"
    :class="[
      'emoji-' + text,
      isInput ? 'emoji-size-small' : 'emoji-size-large'
    ]"
    @click="emojiClick"
  />
</template>
<script>
export default {
  components: {},
  // eslint-disable-next-line vue/require-prop-types
  props: ['text', 'isInput'],
  data() {
    return {}
  },
  methods: {
    emojiClick() {
      this.$emit('onClick', this.text)
    }
  }
}
</script>
