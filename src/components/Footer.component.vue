<template>
  <footer class="page-footer">
    <ul>
      <li :class="{ active: selected == 'all' }">
        <button @click="filter('all')">
          <i class="icon-icon-36-clipboard-download"></i>All task
        </button>
      </li>
      <li :class="{ active: selected == 'active' }">
        <button @click="filter('active')">
          <i class="icon-icon-40-clipboard-list"></i>Active
        </button>
      </li>
      <li :class="{ active: selected == 'completed' }">
        <button @click="filter('completed')">
          <i class="icon-icon-38-clipboard-checked"></i>Completed
        </button>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {
      selected: 'all'
    }
  },
  methods: {
    filter: function(type) {
      this.$emit('filter', type);
      this.selected = type;
    },
    action: function(type) {
      this.$emit('action', type);
    }
  }
}
</script>
