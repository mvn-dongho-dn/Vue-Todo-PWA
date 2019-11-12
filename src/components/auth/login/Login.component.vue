<template>
  <div class="login-page">
    <!-- <h4 class="title">Login</h4>
    <form class="form-login">
      <input placeholder="Email" v-model="email" type="text" class="input">
      <input placeholder="Password" v-model="password" type="password" class="input">
      <div class="form-buttom">
        <button @click="login" type="submit" class="btn-submit">LOGIN</button>
      </div>
      <p class="text">Or</p>
      <ul class="list-social">
        <li class="item" @click="loginFb()">
          <img src="~@/assets/images/facebook.png" alt="facebook">
        </li>
        <li class="item" @click="loginGg()">
          <img src="~@/assets/images/google.png" alt="google">
        </li>
        <li class="item" @click="loginTt()">
          <img src="~@/assets/images/twitter.png" alt="twitter">
        </li>
      </ul>
    </form>
    <div class="login-bottom">
      <p>Have not account yet?</p>
      <router-link to="/register" class="register-link">SIGN UP</router-link>
    </div> -->
    <form action="" @submit.prevent="submit">
      <div class="alert alert-danger" v-if="messErr">{{ messErr }}</div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="text">
        <span class="form-focus-line"></span>
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-envelope fa-w-16"><path fill="currentColor" d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z" class=""></path></svg>
      </div>
      <div class="form-group">
        <label for="email">Password</label>
        <input type="password" v-model="password">
        <span class="form-focus-line"></span>
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-envelope fa-w-16"><path fill="currentColor" d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z" class=""></path></svg>
      </div>
      <div class="buttons-set">
        <button type="button" :class="{ 'btn-loading': loading }" :disabled="!email || !password" @click="login">Login</button>
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
        token: '',
        router: new VueRouter(),
        loading: false,
        messErr: ''
      }
    },
    methods: {
      login: function() {
        this.loading = true;
        firebase.auth().signInWithEmailAndPassword(this.email.trim(), this.password.trim())
        .then(() => {
          firebase.auth().currentUser.getIdToken()
          .then((idToken) => {
            this.token = idToken;
            this.setStorage();
            this.$router.replace('/todo');
          })
        })
        .catch((error) => {
          this.messErr = 'You have entered an invalid email or password';
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // if (errorCode === 'auth/wrong-password') {
          //   // alert('Wrong password.');
          // } else {
          //   // alert(errorMessage);
          // }
          console.log(error);
        }).finally(() => this.loading = false);
      },
      loginFb: function() {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          this.token = result.credential.accessToken;
          this.setStorage();
          this.$router.replace('/todo');
        }).catch(function(error) {
          console.log(error);
        });
      },
      loginGg: function() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          this.token = result.credential.accessToken;
          this.setStorage();
          this.$router.replace('/todo');
        }).catch((error) => {
          console.log(error);
        });
      },
      loginTt: function() {
        // TODO: login with twitter
      },
      setStorage: function() {
        localStorage.setItem('token', this.token);
        localStorage.setItem('userId', firebase.auth().currentUser.uid);
        localStorage.setItem('photoURL', firebase.auth().currentUser.photoURL);
      }
    }
  }
</script>
