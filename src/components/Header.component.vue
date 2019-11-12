<template>
  <header class="page-header" role="banner">
    <button class="toggle-sidebar-left" @click="toggleSidebar()">
      <span></span>
    </button>

    <h1 class="logo">T<span>o</span>d<span>o</span></h1>
    <div class="flash-screen">
      <div class="flash-inner">
        <div class="txt"><i>T</i><span>o</span><i>d</i><span>o</span></div>
      </div>
    </div>
    <div class="user-avatar" @click="openProfile">
      <img v-if="userInfo.photoURL" :src="userInfo.photoURL" alt="">
      <img v-else src="@/assets/images/avatar.png" alt="">
    </div>
    <div class="nav-overlay" @click="toggleSidebar()"></div>
  </header>
</template>


<script>
const body = document.body;

export default {
  name: 'header-comp',
  data() {
    return {
      mess: 'TODO',
      isPanelOpen: false,
      photoURL: '',
      userInfo: {}
    }
  },
  mounted() {
    const getInfo = localStorage.getItem('user-info');
    this.userInfo = getInfo ? JSON.parse(getInfo) : {};
    this.photoURL = localStorage.getItem('photoURL');
  },
  methods: {
    openProfile() {
      document.body.classList.add('profile-open');
    },
    logout: function() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.$router.replace('/auth/login');
    },
    toggleSidebar() {
      const navClass = 'show-sidebar-left';
      if (body.classList.contains(navClass)) {
        body.classList.remove(navClass);
      } else {
        body.classList.add(navClass);
      }
    }
  }
}
</script>
