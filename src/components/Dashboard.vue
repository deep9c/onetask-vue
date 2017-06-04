<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
    <p>Welcome {{username}}</p>
    <todo-list v-bind:todos="todosarray"></todo-list>
    <create-todo v-on:add-todo="addTodo"></create-todo>
  </div>
</template>

<script>

import TodoList from './TodoList'
import CreateTodo from './CreateTodo'

export default {
  name: 'Dashboard',
  components: {
    TodoList,
    CreateTodo
  },
  data () {
    return {
      todosarray:  [
                {
                  title: 'Todo A',
                  project: 'Project 1',
                  done: false
                },
                {
                  title: 'Todo B',
                  project: 'Project 2',
                  done: false
                },
                {
                  title: 'Todo C',
                  project: 'Project 2',
                  done: true
                },
                {
                  title: 'Todo D',
                  project: 'Project 3',
                  done: false
                }
              ],
        username: ''
    };
  },
  beforeMount(){
    //this.username = api.user.username;

    
  },
  methods: {
    addTodo(newtodo) {
      console.log("addTodo() called");
      this.todosarray.push(newtodo);
    },
  },

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
