<template>
  <nav class="page-nav" role="navigation">
    <ul class="nav-menu">
      <li>
        <button @click="logout">
          <span class="icon">
            <i class="icon-icon-36-clipboard-download"></i>
          </span>
          <span class="txt">Sign out</span>
        </button>
      </li>
      <li>
        <button @click="logout">
          <span class="icon">
            <i class="icon-icon-36-clipboard-download"></i>
          </span>
          <span class="txt">Sign out</span>
        </button>
      </li>
      <li>
        <button @click="logout">
          <span class="icon">
            <i class="icon-icon-36-clipboard-download"></i>
          </span>
          <span class="txt">Sign out</span>
        </button>
      </li>
      <li>
        <button @click="logout">
          <span class="icon">
            <i class="icon-icon-36-clipboard-download"></i>
          </span>
          <span class="txt">Sign out</span>
        </button>
      </li>
      <li>
        <button @click="logout">
          <span class="icon">
            <i class="icon-icon-36-clipboard-download"></i>
          </span>
          <span class="txt">Sign out</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'navbar',
  data() {
    return {
      selected: 'all'
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.$router.replace('/auth/login');
      });
    }
  }
}
</script>
