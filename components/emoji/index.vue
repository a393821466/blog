<template>
  <div class="emoji-panel-wrap">
    <emoji
      v-for="(item, index) in emojis"
      :key="index"
      :text="item"
      @onClick="handleEmojiClick"
    />
  </div>
</template>
<script>
import Emoji from './emojiImg.vue'
export default {
  components: {
    Emoji
  },
  data() {
    return {
      emojis: [
        'angry',
        'anguished',
        'astonished',
        'blush',
        'cold_sweat',
        'confounded',
        'confused',
        'cry',
        'disappointed',
        'disappointed_relieved',
        'dizzy_face',
        'expressionless',
        'fearful',
        'flushed',
        'frowning',
        'grimacing',
        'grin',
        'grinning',
        'heart_eyes',
        'hushed',
        'innocent',
        'joy',
        'kissing_closed_eyes',
        'kissing_heart',
        'laughing',
        'neutral_face',
        'no_mouth',
        'open_mouth',
        'pensive',
        'persevere',
        'relaxed',
        'relieved',
        'sleepy',
        'smile',
        'smiley',
        'smirk',
        'sob',
        'stuck_out_tongue',
        'sunglasses',
        'sweat',
        'sweat_smile',
        'scream',
        'wink',
        'unamused',
        'satisfied',
        'worried',
        'stuck_out_tongue_closed_eyes',
        'weary',
        'yum',
        'tired_face',
        'triumph',
        'stuck_out_tongue_winking_eye'
      ]
    }
  },
  methods: {
    handleEmojiClick(a) {
      this.$emit('emojiClick', a)
    }
  }
}
</script>
<style scoped>
.emoji-panel-wrap {
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background-color: #ffffff;
  position: absolute;
  left: 0px;
  top: 32px;
  max-height: 100px;
  overflow-y: auto;
  z-index: 999;
  padding: 10px;
}
</style>
