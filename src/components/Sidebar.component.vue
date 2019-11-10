<template>
  <div id="sidebar">
    <div class="sidebar-backdrop" @click="closeSidebarPanel()" v-if="isPanelOpen"></div>
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "sidebar",
    props: {
      isPanelOpen: Boolean
    },
    data() {
      return {
      }
    },
    methods: {
      closeSidebarPanel: function() {
        this.$emit('closeSidebar', this.isPanelOpen);
      }
    }
  }
</script>
