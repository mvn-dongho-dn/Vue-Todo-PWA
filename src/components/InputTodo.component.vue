<template>
  <div class="input-todo">
    <button class="toggle-all-todo" type="button" @click="toggleCompleted"></button>
    <input type="text" v-model="newTodo" @keyup.enter="onNewTodo()">
  </div>
</template>

<script>
export default {
  name: 'input-todo',
  data() {
    return {
      data: '',
      newTodo: ''
    }
  },
  watch: {
    newTodo: function() {
      // console.log(this.newTodo);
    }
  },
  methods: {
    toggleCompleted: function() {
      this.$emit('toggle', 'toggle');
    },
    onNewTodo: function() {
      this.$emit('add', this.newTodo);
    },
    // saveLocalNewId: function() {
    //   let getLastId = localStorage.getItem('lastTodoId');
    //   getLastId ? +(getLastId)++ : getLastId = 1;
    //   localStorage.setItem('lastTodoId', getLastId);
    //   return getLastId;
    // }
  }
}
</script>
