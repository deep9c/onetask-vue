<template>
	<div id="sidebar-wrapper">
        <nav id="spy">
            <ul class="sidebar-nav nav">
                <li class="sidebar-brand">
                    <a><span class="fa fa-home solo"><u>PROJECTS</u></span></a>
                </li>

                <li v-for="(proj,index) in selectedWs.projects" :key="index">
                	<a href="#" v-on:click="selectProj(index)">
                        <span class="fa fa-anchor solo">{{proj.name}}</span>
                    </a>
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

	export default{
		name: 'Sidebar',

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
		},

		beforeMount(){
			//console.log('Sidebar selectedWs-->> ' + JSON.stringify(this.selectedWs));
		},
	}

</script>