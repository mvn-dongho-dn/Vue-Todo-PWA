<template>
  <header class="page-header" role="banner">
    <div class="header-action">
      <img @click="togleSidebar()" class="icon-menu" src="~@/assets/images/menu.png" alt="icon-menu">
      <img class="icon-user" src="~@/assets/images/user.png" alt="icon-user">
    </div>
    <h1 class="logo">T<span>o</span>d<span>o</span></h1>
    <div class="flash-screen">
      <div class="flash-inner">
        <div class="txt"><i>T</i><span>o</span><i>d</i><span>o</span></div>
      </div>
    </div>

    <Sidebar :isPanelOpen="isPanelOpen" @closeSidebar="togleSidebar()">
      <ul class="sidebar-panel-nav">
        <li @click="logout()">logout</li>
      </ul>
    </Sidebar>
  </header>
</template>


<script>
import Sidebar from './Sidebar.component';

export default {
  name: 'header-comp',
  components: {
    Sidebar
  },
  data() {
    return {
      mess: 'TODO',
      isPanelOpen: false
    }
  },
  methods: {
    togleSidebar: function() {
      this.isPanelOpen = !this.isPanelOpen;
    },
    logout: function() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
       this.$router.replace('login')
    }
  }
}
</script>
