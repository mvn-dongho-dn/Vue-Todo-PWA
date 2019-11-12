<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'app',
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const info = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        };
        localStorage.setItem('user-info', JSON.stringify(info));
      } else {
        localStorage.removeItem('user-info');
      }
    });
  },
  watch: {
    $route() {
      if (document.body.classList.contains('show-sidebar-left')) {
        document.body.classList.remove('show-sidebar-left');
      }
    }
  }
}
</script>

<style lang="scss">
  @import "./styles/styles.scss";
</style>
