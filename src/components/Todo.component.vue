<template>
  <div id="todo">
    <HeaderComp/>
    <NavbarComp/>
    <main class="page-main">
      <InputTodoComp ref="inputTodo" @add="addTodo" @toggle="actionTodo" :loading="loading"/>
      <div class="todo-counter">
        {{ todos.length }} item left
        <span v-if="toggleClear" @click="actionTodo('clear')">Clear completed</span>
      </div>
      <TodoListComp :todos="todos" />

      <MessageComp :mess="message"/>
    </main>
    <FooterComp @filter="filterTodo" @action="actionTodo"/>
    <ProfileComp :todos="todos"/>
  </div>
</template>

<script>
  import HeaderComp from './Header.component';
  import InputTodoComp from './InputTodo.component';
  import TodoListComp from './TodoList.component';
  import NavbarComp from './Navbar.component';
  import FooterComp from './Footer.component';
  import MessageComp from './Message.component';
  import ProfileComp from './Profile.component';
  import { EMOJI } from '../core/functions/emoji';
  import db from '../firebase';

  export default {
    name: 'todo',
    components: {
      HeaderComp,
      NavbarComp,
      InputTodoComp,
      MessageComp,
      FooterComp,
      TodoListComp,
      ProfileComp
    },
    data() {
      return {
        todos: [],
        originTodos: [],
        currentFilter: 'all',
        message: {},
        toggle: false,
        toggleClear: false,
        loading: false
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
        this.loading = true;
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
          this.loading = false;
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
            this.loading = true;
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
              this.loading = false;
            })
            break;
          case 'toggle':
            this.loading = true;
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
              this.loading = false;
            })
            break;
        }
      }
    },
    watch: {
      todos: {
        handler: function(todos) {
          this.reactiveMess(this.currentFilter, this.todos);
          this.toggleClear = todos.some(e => e.completed);
          this.reactiveMess(this.currentFilter, todos);
        },
        deep: true
      }
    }
  }
</script>
