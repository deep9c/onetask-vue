<template>
  <div>     
      
    <!-- Projects in Sidebar -->
    <Sidebar v-bind:selectedWs="selectedWs" v-on:select-proj="selectProj" v-bind:drawer="drawer"></Sidebar>

    <!-- Top Navbar -->
    <Navbar v-bind:username="user.username" v-bind:selectedWs="selectedWs" v-bind:enrolledWorkspaces="enrolledWorkspaces" 
      v-on:select-ws="selectWorkspace" v-on:show-mytasks="showMyTasks" v-bind:drawer="drawer" v-on:toggle-drawer="drawer=!drawer"></Navbar>
    
    <!--
    <main>
      <v-content>
        <v-container grid-list-md text-xs-center>          
            <v-layout row wrap>

              <v-flex md6>
                <v-card>
                  <v-card-text class="px-0">
                    <v-list dense>
                      <v-list-tile avatar v-for="item in items" v-bind:key="item.title" @click="">
                        <v-list-tile-action>
                          <v-icon>check_circle</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-text-field              
                            label="Hint Text"
                            :value="item.title"              
                            single-line
                          ></v-text-field>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-icon>delete</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex md6>
                <v-card dark color="green darken-1">
                  <v-card-text class="px-0">6</v-card-text>
                </v-card>
              </v-flex>

            </v-layout>          
        </v-container>
      </v-content>
    </main>
-->

    <!-- Page content -->
    <main>
      <v-content>
        <v-container grid-list-md text-xs-center>          
          <v-layout row wrap>

                    
            <v-flex md6>
              <Tasks v-bind:tasks="tasks" v-bind:selectedWsId="selectedWs._id"  v-bind:selectedProj="selectedProj" 
                v-bind:username="user.username" v-on:select-task="selectTask">
              </Tasks>
            </v-flex>

                    
            <v-flex md6>
              
              <Comments v-if="selectedTask._id && taskComments.comments" v-bind:selectedTask="selectedTask" 
                v-bind:taskComments="taskComments.comments" v-bind:username="user.username">
              </Comments>
              <!--
              <v-card dark color="green darken-1">
                <v-card-text class="px-0">6</v-card-text>
              </v-card>
              -->
            </v-flex>

          </v-layout>          
        </v-container>
      </v-content>
    </main>


  <!--
  <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  -->
    
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
        drawer: true,
        fixed: true,
        //username: '',
        user: api.user,
        enrolledWorkspaces: [],
        selectedWorkspaceIndex: -1,
        selectedWs: {},
        selectedProj: {},
        tasks: {},
        selectedTask: {},
        taskComments: {},

        items: [
          { icon: true, title: 'Jason Oner', avatar: '/static/doc-images/lists/1.jpg' },
          { title: 'Travis Howard', avatar: '/static/doc-images/lists/2.jpg' },
          { title: 'Ali Connors', avatar: '/static/doc-images/lists/3.jpg' },
          { title: 'Cindy Baker', avatar: '/static/doc-images/lists/4.jpg' },
        ]
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
      this.selectedProj = this.selectedWs.projects[index];
      if(this.selectedProj){
        api.getTasks(this.selectedWs._id,this.selectedProj._id, this.user.username)
          .then((resp)=>{
            //console.log('getTasks resp::- ' + JSON.stringify(resp.data));
            this.tasks = resp.data;
            this.taskComments = {};
        });
      }
      else{
        this.tasks = {};
        this.taskComments = {};
      }
    },
    selectTask(task){        
      console.log('showcom called' + JSON.stringify(task));
      this.selectedTask = task;
      api.getComments(task._id)
        .then((resp)=>{
          console.log('getComments resp:- '+JSON.stringify(resp));
          this.taskComments = resp.data;
        });
    },

    selectWorkspace(ws){        
      console.log('selectWorkspace called in dashboard' + JSON.stringify(ws));
      this.selectedWs = ws;   
      this.selectProj(0);  
    },

    showMyTasks(){
      api.getTasksByAssignee(this.user.username)
          .then((resp)=>{
            console.log('getTasksByAssignee resp::- ' + JSON.stringify(resp.data));
            this.tasks = resp.data;
            this.taskComments = {};
        });
    }
  },

}
</script>

<style>
#wrapper {
  padding-left: 170px;
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
  padding-top: 10px;
  transition: all 0.4s ease 0s;
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
