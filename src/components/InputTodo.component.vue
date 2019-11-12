<template>
  <div class="input-todo" role="form">
    <button 
      class="toggle-all-todo"
      type="button"
      @click="toggleCompleted"
      aria-label="Toggle Todo"
      v-bind:class="{ active: toggle }"></button>
    <input type="text" v-model="newTodo" @keyup.enter="onNewTodo()" aria-label="Input Todo" placeholder="What need to be done?">
    <span v-if="loading" class="input-loading">
      <img src="@/assets/images/loading.gif" alt="">
    </span>
  </div>
</template>

<script>
export default {
  name: 'input-todo',
  props: {
    loading: Boolean
  },
  data() {
    return {
      data: '',
      newTodo: '',
      toggle: false
    }
  },
  watch: {
    newTodo: function() {
      // console.log(this.newTodo);
    }
  },
  methods: {
    toggleCompleted: function() {
      this.toggle = !this.toggle;
      this.$emit('toggle', 'toggle');
    },
    onNewTodo: function() {
      if (this.newTodo) {
        this.$emit('add', this.newTodo.trim());
      }
    },
    saveLocalNewId: function() {
      let getLastId = localStorage.getItem('lastTodoId');
      getLastId ? +(getLastId)++ : getLastId = 1;
      localStorage.setItem('lastTodoId', getLastId);
      return getLastId;
    }
  }
}
</script>
