<template>
	<div id="sidebar-wrapper">
        <nav id="spy">
            <ul class="sidebar-nav nav">
                <li class="sidebar-brand">
                    <a><span class="fa fa-home solo"><strong>Projects</strong></span></a>
                </li>

                <li v-for="(proj,index) in selectedWs.projects" :key="index">
                	<a href="#" v-on:click="selectProj(index)">
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
			selectProj(index){
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