<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
    <p>Welcome {{user.username}}</p>
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li><router-link to="/login" v-if="!user.authenticated">Login</router-link></li>
          <li><router-link to="/login" v-if="user.authenticated" v-on:click.native="logout">Logout</router-link></li>
          <li v-if="enrolledWorkspaces[selectedWorkspaceIndex]">{{enrolledWorkspaces[selectedWorkspaceIndex].name}}</li>
        </ul>
      </div>    
    </nav>
    <todo-list v-bind:todos="todosarray"></todo-list>
    <create-todo v-on:add-todo="addTodo"></create-todo>
  </div>
</template>

<script>

import TodoList from './TodoList'
import CreateTodo from './CreateTodo'
import api from '../utils/api'

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
        //username: '',
        user: api.user,
        enrolledWorkspaces: [],
        selectedWorkspaceIndex: 0
    };
  },
  beforeMount(){
    this.user = api.user;
    //console.log('dashhhh:: ' + JSON.stringify(api.user.user));
    this.user.userdetails.user.WorkspaceIds.map((workspace,index)=>{
      api.getWorkspace(workspace.workspaceId)
        .then((resp)=>{
          console.log('getWorkspace response:-> ' + JSON.stringify(resp.data));
          this.enrolledWorkspaces.push(resp.data);
          console.log('enrolledWorkspace ' +index+ ':: ' + JSON.stringify(this.enrolledWorkspaces));
        });
    });
    this.selectedWorkspaceIndex = this.user.userdetails.user.WorkspaceIds.findIndex((ws)=>{
      return ws.selected;
    });
    
  },
  methods: {
    addTodo(newtodo) {
      console.log("addTodo() called");
      this.todosarray.push(newtodo);
    },
    logout() {
      api.logout()
        .then((response)=>{
          this.$router.push('/login');
        });
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
