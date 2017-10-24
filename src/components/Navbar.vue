<template>
	<v-toolbar fixed app :clipped-left="clipped" color="primary" dark dense extended>
    
      <v-toolbar-side-icon @click.stop="$emit('toggle-drawer', !drawer)"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">OneTask</v-toolbar-title>
      
      <v-btn flat @click="showDashboard($event)" color="white">
        Dashboard
      </v-btn>
      <v-btn flat @click="showMyTasks($event)" color="white">
        My Tasks
      </v-btn>

      <v-spacer></v-spacer>
      <v-spacer slot="extension"></v-spacer><v-spacer slot="extension"></v-spacer>
      <v-spacer slot="extension"></v-spacer><v-spacer slot="extension"></v-spacer>
      <v-spacer slot="extension"></v-spacer><v-spacer slot="extension"></v-spacer>
      <WorkspaceMembers slot="extension" v-bind:selectedWs='selectedWs' v-bind:username='username'></WorkspaceMembers>

      <v-menu offset-y>
        <v-btn color="primary" dark slot="activator" v-if="selectedWs">{{selectedWs.name}}</v-btn>
        <v-list>
          <v-list-tile v-for="(ws,index) in enrolledWorkspaces" v-if="ws._id!=selectedWs._id" :key="index" @click="selectWorkspace(ws)">
            <v-list-tile-title>{{ ws.name }}</v-list-tile-title>
          </v-list-tile>
          <v-divider light></v-divider>
          <v-list-tile @click="">
            <v-list-tile-title><CreateWorkspace v-on:add-workspace='createWorkspace'></CreateWorkspace></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <v-btn color="primary" dark slot="activator">{{username}}</v-btn>
        <v-list>          
          <v-list-tile @click="logout">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>    
    
  </v-toolbar>
</template>

<script>
	import api from '../utils/api'
  import CreateWorkspace from './CreateWorkspace';
  import WorkspaceMembers from './WorkspaceMembers';
	
	export default{
		name: 'Navbar',

		components: {CreateWorkspace,WorkspaceMembers},

		props: {
			username: {
				type: String,
				required: true,
			},			
			selectedWs: {
				type: Object,
				required: true,
			},
      enrolledWorkspaces:{
        type: Array,
        required: true,
      },
      drawer:{
        type: Boolean,
        required: true,
      }
		},

		data(){
			return{
        clipped: true,
			};
		},
		beforeMount(){
			//console.log('zzzzzzzzzz:: ' + this.selectedWorkspaceIndex);
		},
		methods: {
    	toggleMenu(e){
      	e.preventDefault();
      	$("#wrapper").toggleClass("active");
    	},     

    	logout() {
      	api.logout()
       		.then((response)=>{
      			this.$router.push('/login');
      		});
    	},   

      createWorkspace(newworkspace){
        console.log('createWorkspace function called');
        var createWorkspaceInputs = {
          username: this.username,
          workspacename: newworkspace.name,
          //description: newworkspace.description
        };
        api.createWorkspace(createWorkspaceInputs)
          .then((resp)=>{
            console.log('createWorkspace resp-> ' + JSON.stringify(resp.data));
            //this.selectedWs.projects.push(resp.data);
            //this.selectProj(this.selectedWs.projects.findIndex((p)=>{return p._id == resp.data._id}));
            this.enrolledWorkspaces.push(resp.data);
            this.$emit('select-ws', resp.data);
            //selectWorkspace(resp.data);
          });
      },

      selectWorkspace(ws){        
        this.$emit('select-ws', ws);
      },

      showMyTasks(event){
        $("li").removeClass("active");
        $(event.currentTarget).addClass('active');
        this.$emit('show-mytasks');
      },

      showDashboard(event){
        $("li").removeClass("active");
        $(event.currentTarget).addClass('active');
      },

  	},
	}
</script>

<style>
#menu-toggle {
    text-decoration: none;
    float: left;
    color: #fff;
    padding-right: 15px;
}
</style>