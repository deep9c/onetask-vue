<template>
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
                <div  class="navbar-brand">
                    <a id="menu-toggle" href="#" class="glyphicon glyphicon-align-justify btn-menu toggle" v-on:click="toggleMenu($event)">
                        <i class="fa fa-bars"></i>
                    </a>
                    <a href="#">OneTask</a>
                </div>
      </div>
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="active" v-on:click="showDashboard($event)"><router-link to="/dashboard">Dashboard</router-link></li>          
          <li v-on:click="showMyTasks($event)"><a href="#">My Tasks</a></li>
        </ul>
        <ul class="nav navbar-nav pull-right">
            <li>
              <WorkspaceMembers v-bind:selectedWs='selectedWs' v-bind:username='username'></WorkspaceMembers>
            </li>
            <li class="dropdown">              
              <a href="#" id="nbAcctDD" class="dropdown-toggle" data-toggle="dropdown"><li v-if="selectedWs">{{selectedWs.name}}</li></a>
              <ul class="dropdown-menu pull-right">
                <li v-for="(ws,index) in enrolledWorkspaces" :key="index">
                  <a href="#" v-on:click="selectWorkspace(ws)" v-if="ws._id!=selectedWs._id"> {{ws.name}} </a>
                </li>
                <li role="separator" class="divider"></li>
                <li><CreateWorkspace v-on:add-workspace='createWorkspace'></CreateWorkspace></li>
              </ul>
            </li> 
            <li class="dropdown">
              <a href="#" id="nbAcctDD" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-user"></i>{{username}}<i class="icon-sort-down"></i></a>
              <ul class="dropdown-menu pull-right">
                <li><router-link to="/login" v-on:click.native="logout">Logout</router-link></li>
              </ul>
            </li>            
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </nav>
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
      }
		},

		data(){
			return{

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