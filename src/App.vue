<template>
  <div id="app">
    <HeaderComp/>
    <main class="page-main">
      <InputTodoComp ref="inputTodo" @add="addTodo" @toggle="actionTodo"/>
      <div class="todo-counter">
        {{todos.length}} {{todos.length ? 'items' : 'item'}} left
        <span v-if="toggleClear" @click="actionTodo('clear')">Clear completed</span>
      </div>
      <TodoListComp :todos="todos" />

      <MessageComp :mess="message"/>
    </main>
    <NavbarComp @filter="filterTodo" @action="actionTodo"/>
  </div>
</template>

<script>
import HeaderComp from './components/Header.component';
import InputTodoComp from './components/InputTodo.component';
import TodoListComp from './components/TodoList.component';
import NavbarComp from './components/Navbar.component';
import MessageComp from './components/Message.component';
import { todoLocalStorage } from './core/functions/todo-storage.js';
import { EMOJI } from './core/functions/emoji';

const STORAGE_KEY = 'todos';

export default {
  name: 'app',
  components: {
    HeaderComp,
    NavbarComp,
    InputTodoComp,
    MessageComp,
    TodoListComp
  },
  data() {
    return {
      todos: todoLocalStorage.get(STORAGE_KEY),
      originTodos: [],
      currentFilter: 'all',
      message: {},
      toggle: false,
      toggleClear: false
    }
  },
  mounted() {
    this.reactiveMess('all', this.todos);
    this.originTodos = this.todos;
  },
  methods: {
    addTodo: function(e, id) {
      const value = e && e.trim();
      this.todos.unshift({
        id: id,
        title: value,
        completed: false
      });
      this.originTodos = this.todos;
      this.$refs.inputTodo.newTodo = '';
      this.reactiveMess('all', this.todos);
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
    reactiveMess: function(type, data) {
      const actionMess = {
        all: {
          text: 'Please make me disappear !!!', emoji: EMOJI.smile
        },
        active: {
          text: `You don't have any <span>Active</span> task`, emoji: EMOJI.sad
        },
        completed: {
          text: `You don't have any <span>Completed</span> task`, emoji: EMOJI.soSad
        }
      };
      this.message = data.length ? {} : actionMess[type];
    },
    actionTodo: function(type) {
      switch (type) {
        case 'clear':
          this.todos = this.originTodos = this.originTodos.filter((e) => !e.completed);
          this.filterTodo(this.currentFilter);
          break;
        case 'toggle':
          this.toggle = !this.toggle;
          this.todos = this.originTodos = this.originTodos.map((e) => {
            e.completed = this.toggle;
            return e;
          });
          break;
      }
    }
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoLocalStorage.set(STORAGE_KEY, todos)
        this.toggleClear = todos.some(e => e.completed);
        this.reactiveMess(this.currentFilter, todos);
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@import "./assets/styles/styles.scss";
</style>
