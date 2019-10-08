<template>
  <footer class="page-footer">
    <div class="containe">{{ mess }}</div>
  </footer>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {
      mess: 'This is footer'
    }
  }
}
</script>
