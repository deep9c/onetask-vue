<template>
	<div id="sidebar-wrapper">
        <nav id="spy">
            <ul class="sidebar-nav nav">
                <li class="sidebar-brand">
                    <a><span class="fa fa-home solo"><strong>Projects</strong></span></a>
                </li>

                <li v-for="(proj,index) in selectedWs.projects" :key="index">
                	<a href="#" v-on:click="selectProj(index,$event)">
                        <span class="fa fa-anchor solo">{{proj.name}}</span>
                    </a>
  				</li>

  				<li>
  					<CreateProject v-on:add-project='createProject'></CreateProject>
  				</li>

  				<!--
                <li>
                    <a href="#">
                        <span class="fa fa-anchor solo">Anchor 1</span>
                    </a>
                </li>
                -->
            </ul>
        </nav>
    </div>
</template>

<script>
	import api from '../utils/api'
	import CreateProject from './CreateProject';

	export default{
		name: 'Sidebar',

		components: {CreateProject},

		props: {			
			selectedWs: {
				type: Object,
				required: true,
			},			
		},

		data(){
			return{

			};
		},

		methods: {
			selectProj(index,event){
				$("a").removeClass("activate");
				$(event.currentTarget).addClass('activate');
				this.$emit('select-proj', index);
			},

			createProject(newproj){
				var createProjInputs = {
					wsid: this.selectedWs._id,
					name: newproj.name,
					description: newproj.description
				};
				api.createProject(createProjInputs)
					.then((resp)=>{
						console.log('createProject resp-> ' + JSON.stringify(resp.data));
						this.selectedWs.projects.push(resp.data);
						this.selectProj(this.selectedWs.projects.findIndex((p)=>{return p._id == resp.data._id}));
					});
			},
		},

		beforeMount(){
			//console.log('Sidebar selectedWs-->> ' + JSON.stringify(this.selectedWs));
		},
	}

</script>

<style>
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

.activate{
	background: rgba(255,255,255,0.2);
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
</style>