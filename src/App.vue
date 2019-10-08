<template>
  <div id="app">
    <HeaderComp/>
    <main class="page-main">
      <InputTodoComp ref="inputTodo" @add="addTodo" />
      <TodoListComp :todos="todos" />
    </main>
    <NavbarComp @filter="filterTodo" @action="actionTodo"/>
  </div>
</template>

<script>
import HeaderComp from './components/Header.component';
import InputTodoComp from './components/InputTodo.component';
import TodoListComp from './components/TodoList.component';
import NavbarComp from './components/Navbar.component';
import { todoLocalStorage } from './core/functions/todo-storage.js';

const STORAGE_KEY = 'todos';

export default {
  name: 'app',
  components: {
    HeaderComp,
    NavbarComp,
    InputTodoComp,
    TodoListComp
  },
  data() {
    return {
      todos: todoLocalStorage.get(STORAGE_KEY),
      originTodos: [],
      currentFilter: ''
    }
  },
  mounted() {
  },
  methods: {
    addTodo: function(e, id) {
      const value = e && e.trim();
      this.todos.push({
        id: id,
        title: value,
        completed: false
      });
      this.originTodos = this.todos;
      this.$refs.inputTodo.newTodo = '';
    },
    filterTodo: function(type) {
      let filtered = this.todos;
      this.currentFilter = type;
      switch (type) {
        case 'all':
          filtered = this.originTodos;
          break;
        case 'active':
          filtered = this.originTodos.filter((e) => !e.completed);
          break;
        case 'completed':
          filtered = this.originTodos.filter((e) => e.completed);
          break;
      }
      this.todos = filtered;
    },
    actionTodo: function(type) {
      switch (type) {
        case 'clear':
          this.todos = this.originTodos = this.originTodos.filter((e) => !e.completed);
          this.filterTodo(this.currentFilter);
          break;
      }
    }
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoLocalStorage.set(STORAGE_KEY, todos)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@import "./assets/styles/styles.scss";
</style>
