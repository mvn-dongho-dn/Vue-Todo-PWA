<template>
  <div class="login container">
    <h4 class="title">Login</h4>
    <form class="form-login">
      <input placeholder="Email" v-model="email" type="text" class="input">
      <input placeholder="Password" v-model="password" type="password" class="input">
      <div class="form-buttom">
        <router-link to="/register" class="register">Register</router-link>
        <button @click="login" type="submit" class="btn-submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import VueRouter from 'vue-router';

  export default {
    name: "login",
    data() {
      return {
        email: '',
        password: '',
        router: new VueRouter()
      }
    },
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email.trim(), this.password.trim())
        .then((res) => {
          firebase.auth().currentUser.getIdToken()
          .then((idToken) => {
            localStorage.setItem('token', idToken);
            localStorage.setItem('userId', firebase.auth().currentUser.uid);
            this.$router.replace('todo')
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
        })
      }
    }
  }
</script>
