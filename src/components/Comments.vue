<template>



<v-card>
    <v-card-actions>

    <!--
    <v-tooltip bottom>
        
            <v-chip close v-model="assigneechip" @input="" @click="assigneechip=false" v-show="assigneechip" slot="activator" style="cursor: pointer">
                <v-avatar class="teal">
                    <span class="white--text">{{selectedTask.AssigneeUserId.name.charAt(0).toUpperCase()}}{{selectedTask.AssigneeUserId.name.split(" ").pop().charAt(0).toUpperCase()}} </span>
                </v-avatar>
                {{selectedTask.AssigneeUserId.name}} 
            </v-chip>
        
        <span>Assignee : </br>This task will appear in the </br> Assignee's My Tasks list</span>
    </v-tooltip>
    -->
        <!--
        <AssignTask v-show="!assigneechip" v-bind:currentAssignee="selectedTask.AssigneeUserId" v-on:assign-task="assignTask"></AssignTask>
        -->
        

        <v-select full-width
                v-bind:items="selectedWs.MemberUserIds"
                v-model="assigneeobject"
                label="Assignee"                
                chips
                item-value="_id" item-text="name"
                @input="assignTask"                
              >
                <template slot="selection" scope="data">
                  <v-chip
                    v-model="showassigneechip"
                    close
                    @input="data.parent.selectItem(data.item); assigneeobject=null;"
                    :selected="data.selected"
                    class="chip--select-multi"
                    :key="JSON.stringify(data.item)"                    
                  >
                    <v-avatar class="teal">
                      <span>{{data.item.name.charAt(0).toUpperCase()}}{{data.item.name.split(" ").pop().charAt(0).toUpperCase()}}</span>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>                            
              </v-select>

        <!--
        <v-text-field
            v-if="!assigneechip"
            v-model="assigneeusername"
            label="Enter assignee"
            @blur="assignTask"          
            :prepend-icon="'account_circle'"
            autofocus
        ></v-text-field>
        -->


        <v-menu
        lazy
        :close-on-content-click="false"
        v-model="menu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="Due Date"
          v-model="date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" no-title scrollable actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-menu>

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
                <v-list-tile-title>{{comment.CommenterUserId.name}} <small>on {{new Date(comment.createdDateTime).toDateString()}}</small></v-list-tile-title>
                <v-list-tile-sub-title><pre>{{comment.content}}</pre></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list>
        -->    
        
        <v-card-title>
            <v-container fluid grid-list-md v-for="(comment,index) in taskComments" :key="index">
                <v-layout row wrap>
                    <v-flex d-flex xs1 sm1>
                        <v-avatar size="30px" class="indigo"><span class="white--text">{{comment.CommenterUserId.name.charAt(0).toUpperCase()}}{{comment.CommenterUserId.name.split(" ").pop().charAt(0).toUpperCase()}}</span></v-avatar>
                    </v-flex>
                    <v-flex d-flex>
                        <v-layout row wrap>
                            <v-flex d-flex xs12>
                                <strong class="text-sm-left">{{comment.CommenterUserId.name}}</strong> <small class="text-sm-right">on {{new Date(comment.createdDateTime).toDateString()}}</small>
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
			},
            selectedWs: {
                type: Object,
                required: true,
            },
		},

		data(){
			return{				
				newcomment: '',
                assigneechip: true,
                assigneeusername:'',
                showcommentbutton: false,
                assigneeobject: this.selectedTask.AssigneeUserId,
                showassigneechip: true,
                //below are for datepicker
                date: null,
                menu: false,
                modal: false
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
                this.showassigneechip=true; 
                console.log("assigneeobject:- "+JSON.stringify(this.assigneeobject));
                //if(this.assigneeusername.length>0){
                if(this.assigneeobject){
                var assignTaskToUser = {
                    operation: 'update',
                    taskid: this.selectedTask._id,
                    //AssigneeUserId: this.assigneeusername
                    AssigneeUserId: this.assigneeobject
                }
                api.assignTaskToUser(assignTaskToUser)
                    .then((resp)=>{
                        console.log('assignTaskToUser response:- ' + JSON.stringify(resp));
                        this.selectedTask.AssigneeUserId = this.assigneeobject;
                    });
                }
                this.assigneechip=true;
            },

            /*
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
            */

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