<template>
  <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawerMutate"
      enable-resize-watcher
      dark
      app
    >
      <v-list class="pa-1">
        <v-list-tile v-if="miniVariant" @click.stop="miniVariant = !miniVariant">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>        
      </v-list>
      <v-list class="pt-0" dense>
        <v-list-tile>          
          <v-list-tile-content>
            <v-list-tile-title>PROJECTS</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <CreateProject v-on:add-project='createProject'></CreateProject>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider light></v-divider>
        <v-list-tile v-for="(proj,index) in selectedWs.projects" :key="index" @click="selectProj(index,$event)">          
          <v-list-tile-content>
            <v-list-tile-title>{{ proj.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        

      </v-list>
    </v-navigation-drawer>



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
      drawer:{
        type: Boolean,
        required: true,
      }		
		},

    watch : {
      drawer : function (value) {
        //console.log('drawer changed to '+value);
        this.drawerMutate = !this.drawerMutate;
      }
    },

		data(){
			return{
        miniVariant: false,
        clipped: true,
        drawerMutate: this.drawer,
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
          username:api.username,
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

</style>