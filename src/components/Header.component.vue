<template>
  <header class="page-header">
    <h1 class="logo">{{ mess }}</h1>
    <div class="flash-screen">
      <div class="flash-inner">
        <span class="left">ToDo</span>
        <span class="right">ToDo</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'header-comp',
  data() {
    return {
      mess: 'TODO'
    }
  }
}
</script>
