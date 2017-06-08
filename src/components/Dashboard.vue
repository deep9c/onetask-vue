<template>
  <div id="wrapper">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->    
    
    <!-- Top Navbar -->
    <Navbar v-bind:username="user.username" v-bind:selectedWsName="selectedWsName"></Navbar>
    
    <!-- Projects in Sidebar -->
    <Sidebar v-bind:selectedWs="selectedWs" v-on:select-proj="selectProj"></Sidebar>

    <!-- Page content -->
    <div id="page-content-wrapper">
        <div class="page-content">
            <div class="container-fluid">
                <div class="row">

                    <!-- Panel 1 -->
                    <div class="col-md-6">
                        <Tasks v-bind:tasks="tasks" v-bind:selectedWsId="selectedWs._id"  v-bind:selectedProj="selectedProj" 
                        v-bind:username="user.username" v-on:select-task="selectTask">
                        </Tasks>
                    </div>

                    <!-- Panel 2 -->
                    <div class="col-md-6">                    
                        <Comments v-if="selectedTask._id && taskComments.comments" v-bind:selectedTask="selectedTask" v-bind:taskComments="taskComments.comments" v-bind:username="user.username"></Comments>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
  </div>
</template>

<script>

import TodoList from './TodoList'
import CreateTodo from './CreateTodo'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Tasks from './Tasks'
import Comments from './Comments'
import api from '../utils/api'

export default {
  name: 'Dashboard',
  components: {
    TodoList,
    CreateTodo,
    Navbar,
    Sidebar,
    Tasks,
    Comments
  },
  data () {
    return {
      
        //username: '',
        user: api.user,
        enrolledWorkspaces: [],
        selectedWorkspaceIndex: -1,
        selectedWsName: '',
        selectedWs: {},
        selectedProj: {},
        tasks: {},
        selectedTask: {},
        taskComments: {},
    };
  },
  created(){
    //console.log('beforeCreate of Dashboard starts');
    this.user = api.user;
    //console.log('dashhhh:: ' + JSON.stringify(api.user.user));

    
    
    var promise1 = this.user.userdetails.user.WorkspaceIds.map((workspace,index)=>{
      return api.getWorkspace(workspace.workspaceId)
        .then((resp)=>{
          //console.log('getWorkspace response:-> ' + JSON.stringify(resp.data));
          this.enrolledWorkspaces.push(resp.data);
          //console.log('enrolledWorkspace ' +index+ ':: ' + JSON.stringify(this.enrolledWorkspaces));
        });
    });
    
    this.selectedWorkspaceIndex = this.user.userdetails.user.WorkspaceIds.findIndex((ws)=>{
      return ws.selected;   //return first index where workspace.selected=true
    });

    Promise.all(promise1).then((results)=> {
      this.selectedWsName = this.enrolledWorkspaces[this.selectedWorkspaceIndex].name;
      this.selectedWs = this.enrolledWorkspaces[this.selectedWorkspaceIndex];
      var selectedProjIndex = this.enrolledWorkspaces[this.selectedWorkspaceIndex].projects.findIndex((proj)=>{
        return proj.selected;
      });
      this.selectedProj = this.enrolledWorkspaces[this.selectedWorkspaceIndex].projects[selectedProjIndex];
      
      //console.log('getTasks req::-- ' + this.selectedWs._id+ '...' + this.selectedProj._id + '...' + this.user.username);
      api.getTasks(this.selectedWs._id,this.selectedProj._id, this.user.username)
        .then((resp)=>{
          //console.log('getTasks resp::- ' + JSON.stringify(resp.data));
          this.tasks = resp.data;
      });

    });

    

    //console.log('beforeCreate of Dashboard ends');
  },
  methods: {
    toggleMenu(e){
      e.preventDefault();
      $("#wrapper").toggleClass("active");
    },
    selectProj(index){
      //console.log('selectProj called with index = ' + index);
      this.selectedProj = this.enrolledWorkspaces[this.selectedWorkspaceIndex].projects[index];
      api.getTasks(this.selectedWs._id,this.selectedProj._id, this.user.username)
        .then((resp)=>{
          //console.log('getTasks resp::- ' + JSON.stringify(resp.data));
          this.tasks = resp.data;
          this.taskComments = {};
      });
    },
    selectTask(task){        
      console.log('showcom called' + JSON.stringify(task));
      this.selectedTask = task;
      api.getComments(task._id)
        .then((resp)=>{
          console.log('getComments resp:- '+JSON.stringify(resp));
          this.taskComments = resp.data;
        });
    }
  },

}
</script>

<style>
#wrapper {
  padding-left: 250px;
  transition: all 0.4s ease 0s;
}

#sidebar-wrapper {
  margin-left: -250px;
  top: 51px;
  left: 250px;
  width: 250px;
  background: #000;
  position: fixed;
  height: 100%;
  overflow-y: auto;
  z-index: 1000;
  transition: all 0.4s ease 0s;
}

#wrapper.active {
  padding-left: 0;
}

#wrapper.active #sidebar-wrapper {
  left: 0;
}

#page-content-wrapper {
  width: 100%;
  padding-top: 70px;
  transition: all 0.4s ease 0s;
}

.sidebar-nav {
  position: absolute;
  top: 0;
  width: 250px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-nav li {
  line-height: 40px;
  text-indent: 20px;
}

.sidebar-nav li a {
  color: #999999;
  display: block;
  text-decoration: none;
  padding-left: 60px;
}

.sidebar-nav li a span:before {
  position: absolute;
  left: 0;
  color: #41484c;
  text-align: center;
  width: 20px;
  line-height: 18px;
}

.sidebar-nav li a:hover,
.sidebar-nav li.active {
  color: #fff;
  background: rgba(255,255,255,0.2);
  text-decoration: none;
}

.sidebar-nav li a:active,
.sidebar-nav li a:focus {
  text-decoration: none;
}

.sidebar-nav > .sidebar-brand {
  height: 65px;
  line-height: 60px;
  font-size: 18px;
}

.sidebar-nav > .sidebar-brand a {
  color: #999999;
}

.sidebar-nav > .sidebar-brand a:hover {
  color: #fff;
  background: none;
}



@media (max-width:767px) {

#wrapper {
  padding-left: 0;
}

#sidebar-wrapper {
  left: 0;
}

#wrapper.active {
  position: relative;
  left: 250px;
}

#wrapper.active #sidebar-wrapper {
  left: 250px;
  width: 250px;
  transition: all 0.4s ease 0s;
}

#menu-toggle {
  display: inline-block;
}

}

</style>
