<template>
  <div class="login container">
    <h4 class="title">Create Acount</h4>
    <form class="form-login">
      <input placeholder="Email" v-model="email" type="text" class="input">
      <input placeholder="Password" v-model="password" type="password" class="input">
      <div class="form-buttom">
        <button @click="register" class="btn-submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase';
 
  export default {
    name: 'register',
    data () {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      register: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email.trim(), this.password.trim())
        .then((res) => {
          this.$router.replace('/login')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
        });
      }
    }
  }
</script>
