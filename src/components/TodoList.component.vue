<template>
  <ul class="todo-list">
    <li class="todo-item" v-for="(todo, index) in todos" :key="index" :class="{active: todo.completed}">
      <div class="todo-content" 
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd">
        <label class="checkbox-style">
          <input type="checkbox" v-model="todo.completed" @click="onCompleted(todo)">
          <span></span>
        </label>
        <p class="todo-txt">
          <span>{{ todo.title }}</span>
        </p>
      </div>
      <div class="todo-action">
        <button @click="onDelete(todo)">
          <i class="iconim-trash"></i>
        </button>
      </div>
    </li>
  </ul>  
</template>

<script>
  import db from '../firebase';

  export default {
    name: 'todo-list',
    props: {
      todos: Array
    },
    data() {
      return {
        // todos: [],
        xDown: null,
        yDown: null,
        prevTarget: null,
        swipeType: '',
      }
    },
    methods: {
      onDelete: function(todo) {
        db.collection("todo").doc(todo.id).delete()
        .then(() => {
          this.todos.splice(this.todos.indexOf(todo), 1);
          this.prevTarget.style.transform = 'translateX(0)';
        })
        .catch((error) => {
          console.log(error);
        })
      },
      onCompleted: function(todo) {
        db.collection("todo").doc(todo.id).set({
          userId: localStorage.getItem('userId'),
          title: todo.title,
          completed: !todo.completed
        })
      },
      handleTouchStart: function(evt) {
        this.xDown = evt.touches[0].clientX;
        this.yDown = evt.touches[0].clientY;
      },
      handleTouchMove: function(evt) {
        const target = evt.target;
        if (this.prevTarget) {
          this.prevTarget.style.transform = 'translateX(0)';
        }
        if (!this.xDown || !this.yDown) {
          return;
        }
        let xUp = evt.touches[0].clientX;                                    
        let yUp = evt.touches[0].clientY;
        let xDiff = ~~(this.xDown - xUp);
        let yDiff = ~~(this.yDown - yUp);

        if (Math.abs(xDiff) > Math.abs(yDiff)){
          if ( xDiff > 0 ) {
            target.style.transform = `translateX(${-xDiff}px)`;
            this.swipeType = 'left';
          } else {
            target.style.transform = `translateX(0)`;
            this.swipeType = 'right';
          }                       
        } else {
          if ( yDiff > 0 ) {
            this.swipeType = 'up';
          } else { 
            this.swipeType = 'down';
          }                                                                 
        }
      },
      handleTouchEnd: function(evt) {
        const target = evt.target;
        const size = this.swipeType === 'left' ? '-60px' : '0';
        target.style.transform = `translateX(${size})`;
        this.prevTarget = target;
      }
    }
  }
</script>

<style>
</style>
