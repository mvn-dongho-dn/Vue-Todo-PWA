<template>
   <div id="todo">
    <HeaderComp/>
    <main class="page-main">
      <InputTodoComp ref="inputTodo" @add="addTodo" @toggle="actionTodo"/>
      <div class="todo-counter">
        2 item left
        <span v-if="toggleClear" @click="actionTodo('clear')">Clear completed</span>
      </div>
      <TodoListComp :todos="todos" />

      <MessageComp :mess="message"/>
    </main>
    <NavbarComp @filter="filterTodo" @action="actionTodo"/>
  </div>
</template>

<script>
  import HeaderComp from './Header.component';
  import InputTodoComp from './InputTodo.component';
  import TodoListComp from './TodoList.component';
  import NavbarComp from './Navbar.component';
  import MessageComp from './Message.component';
  // import { todoLocalStorage } from '../core/functions/todo-storage.js';
  import { EMOJI } from '../core/functions/emoji';
  import db from '../firebase';
  import firebase from 'firebase'

  // const STORAGE_KEY = 'todos';

  export default {
    name: 'todo',
    components: {
      HeaderComp,
      NavbarComp,
      InputTodoComp,
      MessageComp,
      TodoListComp
    },
    data() {
      return {
        todos: [],
        originTodos: [],
        currentFilter: 'all',
        message: {},
        toggle: false,
        toggleClear: false,
      }
    },
    mounted() {
      this.getTodo();
    },
    methods: {
      getTodo: function() {
        db.collection("todo").where('userId', '==', localStorage.getItem('userId'))
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const obj = {
              id: doc.id,
              title: doc.data().title,
              completed: doc.data().completed,
            }
            this.todos.push(obj);
          });
          this.originTodos = this.todos;
          this.reactiveMess('all', this.todos);
        })
        .catch((error) => {
          console.log(error);
        })
      },
      addTodo: function(e) {
        const value = e && e.trim();
        if (!e) {
          return
        }
        db.collection("todo").add({
          title: value,
          completed: false,
          userId: localStorage.getItem('userId')
        })
        .then((res) => {
          this.todos.push({
            id: res.id,
            title: value,
            completed: false
          });

          this.originTodos = this.todos;
          this.$refs.inputTodo.newTodo = '';
          this.reactiveMess('all', this.todos);
        })
        .catch((error) => {
          console.log(error);
        })
      },
      filterTodo: function(type) {
        let filtered = this.todos;
        this.currentFilter = type;

        switch (type) {
          case 'all':
            filtered = this.originTodos;
            break;
          case 'active':
            filtered = this.originTodos.filter((e) => { !e.completed});
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
            db.collection('todo')
            .where('completed', '==', true)
            .where('userId', '==', localStorage.getItem('userId'))
            .get()
            .then((querySnapshot) => {
              const batch = db.batch();
              querySnapshot.forEach((doc) => {
                batch.delete(doc.ref)
              });
              batch.commit().then(() => {
                this.todos = this.originTodos = this.originTodos.filter((e) => !e.completed);
                this.filterTodo(this.currentFilter);
              });
            })
            break;
          case 'toggle':
            db.collection('todo')
            .where('completed', '==', false)
            .where('userId', '==', localStorage.getItem('userId'))
            .get()
            .then((querySnapshot) => {
              const batch = db.batch();
              querySnapshot.forEach((doc) => {
                batch.update(doc.ref, {branch: {completed: true}}); 
              });
              batch.commit().then(() => {
                this.toggle = !this.toggle;
                this.todos = this.originTodos = this.originTodos.map((e) => {
                  e.completed = this.toggle;
                  return e;
                });
              });
            })
            break;
        }
      }
    },
    watch: {
      todos: {
        handler: function(todos) {
          // todoLocalStorage.set(STORAGE_KEY, todos)
          this.reactiveMess(this.currentFilter, this.todos);
          this.toggleClear = todos.some(e => e.completed);
          this.reactiveMess(this.currentFilter, todos);
        },
        deep: true
      }
    }
  }
</script>
