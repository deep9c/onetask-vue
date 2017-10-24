<template>



<v-card>
    <v-card-actions>
    <v-tooltip bottom>
        <v-btn round flat @click="assigneechip=false" v-show="assigneechip" slot="activator">
            <v-chip close v-model="assigneechip" @input="">
                <v-avatar class="teal">
                    <span class="white--text">{{selectedTask.AssigneeUserId.substring(0,1).toUpperCase()}} </span>
                </v-avatar>
                {{selectedTask.AssigneeUserId}} 
            </v-chip>
        </v-btn>
        <span>Assignee : </br>This task will appear in the </br> Assignee's My Tasks list</span>
    </v-tooltip>
        <!--
        <AssignTask v-show="!assigneechip" v-bind:currentAssignee="selectedTask.AssigneeUserId" v-on:assign-task="assignTask"></AssignTask>
        -->
        <v-text-field
            v-show="!assigneechip"
            v-model="assigneeusername"
            label="Enter assignee"
            @blur="assignTask"          
            :prepend-icon="'account_circle'"
            autofocus
        ></v-text-field>

    </v-card-actions>


    <v-card-text>
        <div class="headline">
            <v-text-field
              v-model="selectedTask.title"
              label="Hint Text"
              value="Input text"
              single-line
              @change="editTodo"
            ></v-text-field>
            <!--
            <v-text-field
              color="teal"
              multi-line
              v-model="selectedTask.description"
              @change="editTodo"
            >
              <div slot="label">
                Task Description
              </div>
            </v-text-field>
            -->
            <v-text-field
                v-model="selectedTask.description"
                label="Task Description"
                @change="editTodo"
                textarea
                auto-grow
                rows="1"
              ></v-text-field>                    
        </div>
        <v-divider></v-divider>

        <!--
        <v-list three-line>         
            <v-list-tile avatar v-for="(comment,index) in taskComments">                
              <v-list-tile-avatar size="36px">
                <v-icon large color="indigo">account_circle</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{comment.CommenterUserId}} <small>on {{new Date(comment.createdDateTime).toDateString()}}</small></v-list-tile-title>
                <v-list-tile-sub-title><pre>{{comment.content}}</pre></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list>
        -->    
        
        <v-card-title>
            <v-container fluid grid-list-md v-for="(comment,index) in taskComments" :key="index">
                <v-layout row wrap>
                    <v-flex d-flex xs1 sm1>
                        <v-avatar size="30px" class="indigo"><span class="white--text">{{comment.CommenterUserId.substring(0,1).toUpperCase()}}</span></v-avatar>
                    </v-flex>
                    <v-flex d-flex>
                        <v-layout row wrap>
                            <v-flex d-flex xs12>
                                <strong class="text-sm-left">{{comment.CommenterUserId}}</strong> <small class="text-sm-right">on {{new Date(comment.createdDateTime).toDateString()}}</small>
                            </v-flex>
                            <v-flex d-flex xs12>
                                <pre class="text-sm-left">{{comment.content}}</pre>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
            </v-container>
        </v-card-title>
    
        <v-text-field textarea color="teal" rows=1 v-model="newcomment"
            v-on:focus='textboxFocus($event)' v-on:blur='textboxBlur($event)' label="Write a comment..."></v-text-field>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small dark color="teal" v-on:click='submit($event)' v-if=showcommentbutton>Comment</v-btn>
        </v-card-actions>
    </v-card-text>



    <!--
    <div class="actionBox">
        <form class="form-inline" role="form">
            <div class="form-group">
                <input class="form-control" type="text" id="box" style="width: 300px; height: 20px" placeholder="Your comments" 
                    v-model="newcomment" v-on:focus='textboxFocus($event)' v-on:blur='textboxBlur($event)'/>
            </div>
            <div class="form-group">
                <!-- <button class="btn btn-default" v-on:click='submit($event)'>Add</button> ->
                <input type="submit" class="btn btn-default" 
                        	value="Add" v-on:click='submit($event)'>
            </div>
        </form>
    </div>
    -->
</v-card>

</template>

<script>
	import api from '../utils/api'
    import AssignTask from './AssignTask'

	export default{
		name: 'Comments',

        components: {
            AssignTask,
        },
		
		props: {
			selectedTask: {
				type: Object,
				required: true
			},
			taskComments: {
				type: Array,
				required: true
			},
			username: {
				type: String,
				required: true
			}
		},

		data(){
			return{				
				newcomment: '',
                assigneechip: true,
                assigneeusername:'',
                showcommentbutton: false
			}
		},

		methods: {
			submit(e){
                console.log("comment button clicked");
				e.preventDefault();
				var submitcommentreq = {
					content: this.newcomment,
					TaskId: this.selectedTask._id,
					CommenterUserId: this.username
				};

				api.createComment(submitcommentreq)
					.then((resp)=>{
						console.log('createComment resp:- ' + JSON.stringify(resp));
						this.taskComments.push(resp.data);
						this.newcomment = '';
					});
				
			},

			textboxFocus(e){
				$(e.currentTarget).animate({
    				//width: '300px',
    				height: '100px'
  				}, 100, function() {
    			// Animation complete.
  				});
                this.showcommentbutton=true;
			},

			textboxBlur(e){
				$(e.currentTarget).animate({
     				//width: '300px',
     				height: '30px'
   				}, 100, function() {
     			// Animation complete.
   			  });
                if(this.newcomment.length==0)
                    this.showcommentbutton=false;
			},

            assignTask(){
                if(this.assigneeusername.length>0){
                var assignTaskToUser = {
                    operation: 'update',
                    taskid: this.selectedTask._id,
                    AssigneeUserId: this.assigneeusername
                }
                api.assignTaskToUser(assignTaskToUser)
                    .then((resp)=>{
                        console.log('assignTaskToUser response:- ' + JSON.stringify(resp));
                        this.selectedTask.AssigneeUserId = this.assigneeusername;
                    });
                }
                this.assigneechip=true;
            },

            editTodo() {
                console.log("editTodo() of Comments.vue called");               
                var updateTaskInputs = {
                    operation: 'update',
                    taskid: this.selectedTask._id,
                    title: this.selectedTask.title,
                    description: this.selectedTask.description
                };
                api.updateTask(updateTaskInputs)
                    .then((resp)=>{
                        console.log('updateTask resp');
                    });
            },
		},

		beforeUpdate(){
			
		},
	}	

</script>


<style>

</style>