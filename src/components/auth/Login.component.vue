<template>
  <div class="login container">
    <h4 class="title">Login</h4>
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
    </div>
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
        .then(() => {
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
      },
      loginFb: function() {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          localStorage.setItem('token', result.credential.accessToken);
          localStorage.setItem('userId', result.user.uid);
          this.$router.replace('todo');
        }).catch(function(error) {
          console.log(error);
        });
      },
      loginGg: function() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          localStorage.setItem('token', result.credential.accessToken);
          localStorage.setItem('userId', result.user.uid);
          this.$router.replace('todo');
        }).catch((error) => {
          console.log(error);
        });
      },
      loginTt: function() {
        // TODO: login with twitter
      }
    }
  }
</script>
