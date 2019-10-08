<template>
  <nav class="page-nav">
    <ul>
      <li><button @click="filter('all')">All</button></li>
      <li><button @click="filter('active')">Active</button></li>
      <li><button @click="filter('completed')">Completed</button></li>
      <li><button @click="action('clear')">Clear Completed</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    filter: function(type) {
      this.$emit('filter', type);
    },
    action: function(type) {
      this.$emit('action', type);
    }
  }
}
</script>
