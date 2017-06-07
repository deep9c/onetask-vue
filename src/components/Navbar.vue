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
          <li class="active"><router-link to="/dashboard">Dashboard</router-link></li>          
          <li><a href="#about">About</a></li>
        </ul>
        <ul class="nav navbar-nav pull-right">
            
            <li class="dropdown">              
              <a href="#" id="nbAcctDD" class="dropdown-toggle" data-toggle="dropdown"><li v-if="selectedWsName">{{selectedWsName}}</li></a>
              <ul class="dropdown-menu pull-right">
                <li>Other workspaces</li>
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
	
	export default{
		name: 'Navbar',
		//props: ['user','enrolledWorkspaces','selectedWorkspaceIndex'],

		props: {
			username: {
				type: String,
				required: true,
			},			
			selectedWsName: {
				type: String,
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