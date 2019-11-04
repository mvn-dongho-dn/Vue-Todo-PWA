import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from './components/auth/Login.component';
import Register from './components/auth/Register.component';
import Todo from './components/Todo.component';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/todo'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/todo',
    component: Todo
  },
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
