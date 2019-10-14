<template>
  <div class="message" v-if="mess && mess.text">
    <i :class="mess.emoji"></i>
    <span v-html="mess.text"></span>
  </div>
</template>
<script>
export default {
  name: 'message',
  props: {
    mess: {
      text: String,
      emoji: String
    }
  },
  data() {
    return {
    }
  },
  watch: {
    mess: {
      handler: function(txt) {
      }
    }
  }
}
</script>
