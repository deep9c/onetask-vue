<template>



<v-card>
    <v-card-actions>                    

        <v-select full-width
                v-bind:items="selectedWs.MemberUserIds"
                item-value="_id" item-text="name"
                v-model="assigneeobject"
                label="Assignee"                
                chips                
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
                      <span>{{selectedTask.AssigneeUserId.name.charAt(0).toUpperCase()}}{{selectedTask.AssigneeUserId.name.split(" ").pop().charAt(0).toUpperCase()}}</span>
                    </v-avatar>
                    {{ selectedTask.AssigneeUserId.name }}
                  </v-chip>
                </template>                            
              </v-select>        

        

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
          v-bind:style="{ width:'140px' }"
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

      <v-btn outline small fab color="teal" v-on:click='$refs.fileInput.click();'>
            <v-icon>attach_file</v-icon>
        </v-btn>

    </v-card-actions>
        


    <input type="file" name="attachment" id="file-upload" v-show="false"
      @change="uploadAttachment($event)" ref="fileInput">
    
    

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

              <div>
                <v-btn left small flat color="primary" v-bind:style="{ textTransform: 'none' }" 
                    v-for="(attachment,index) in selectedTask.attachments" :key="index"
                    v-on:click='downloadAttachment(attachment._id,attachment.filename)'>
                    {{attachment.filename}}
                 </v-btn>
            </div>                 
        </div>
        <v-divider></v-divider>
          
        
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
                modal: false,
                        
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
            downloadAttachment(fileid,filename){
                api.downloadAttachment(fileid,filename)
                    .then((resp)=>{
                        console.log("downloadAttachment resp:- " + JSON.stringify(resp));                                                
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
                        this.selectedTask.AssigneeUserId = resp.data.AssigneeUserId;
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

            uploadAttachment(event) {
                console.log("uploadAttachment called");
                let input = event.target;
                if (input.files[0]) {
                    console.log("aaaaa");
      
      
                    let reader = new FileReader();

                    

                    reader.readAsDataURL(input.files[0]);
                    
                    var formDataVar = new FormData();

                    formDataVar.append('attachment', event.target.files[0], event.target.files[0].name);
                    formDataVar.append('taskid', this.selectedTask._id);

                    api.uploadAttachment(formDataVar)
                    .then((resp)=>{
                        console.log('uploadAttachment resp' + JSON.stringify(resp));
                        this.selectedTask.attachments.push(resp.data);
                    });
                    
                    //this.formData = new FormData();
                }
            },
        },  //end of methods

        beforeUpdate(){
            
        },
    }   
</script>


<style>
</style>