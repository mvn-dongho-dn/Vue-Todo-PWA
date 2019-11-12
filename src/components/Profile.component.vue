<template>
  <div class="profile-page">
    <button class="profile-close btn-no-style" @click="close">
      <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-times fa-w-10"><path fill="#333" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path></svg>
    </button>
    <div class="profile-bg">
      <span class="profile-avatar">
        <img v-if="userInfo.photoURL" :src="userInfo.photoURL" alt="">
        <img v-else src="@/assets/images/avatar.png" alt="">
      </span>      
    </div>
    <div class="profile-info">
      <h3>{{ userInfo.displayName }}</h3>
      <p>Email: {{ userInfo.email }}</p>
    </div>
    <ul class="profile-overview">
      <li>
        <strong>{{todos.length}}</strong>
        <span>All Task</span>
      </li>
      <li>
        <strong>{{active}}</strong>
        <span>Active</span>
      </li>
      <li>
        <strong>{{completed}}</strong>
        <span>Completed</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'profile',
  props: {
    todos: Array
  },
  data() {
    return {
      userInfo: {},
      active: 0,
      completed: 0
    }
  },
  mounted() {
    const getInfo = localStorage.getItem('user-info');
    this.userInfo = getInfo ? JSON.parse(getInfo) : {};
  },
  methods: {
    close() {
      document.body.classList.remove('profile-open');
    }
  },
  watch: {
    todos: {
      handler: function(todos) {
        this.active = todos.filter((e) => !e.completed).length;
        this.completed = todos.filter((e) => e.completed).length;
      },
      deep: true
    }
  }
};
</script>
