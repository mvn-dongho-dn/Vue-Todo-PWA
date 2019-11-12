import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from './components/auth/login/Login.component';
import Register from './components/auth/register/Register.component';
import Todo from './components/Todo.component';
import './registerServiceWorker'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/todo'
  },
  {
    path: '/todo',
    component: Todo,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/auth/login')
      }
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./components/auth/Auth.component.vue'),
    children: [
      {
        path: '',
        redirect: 'login'
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
