<template>
<div class="detailBox">
    <div class="titleBox">
      <!--label>Comments: {{selectedTask.title}}</label-->
      <table> <tr> <td> <b>Assignee:</b> {{selectedTask.AssigneeUserId}} </td><td>
      <AssignTask v-on:assign-task="assignTask"></AssignTask> </td></tr> </table>
        <!--button type="button" class="close" aria-hidden="true">&times;</button-->
    </div>
    <div class="commentBox">
        
        <p class="taskDescription">{{selectedTask.description}}</p>
    </div>
    <div class="actionBox">
        <ul class="commentList">
            <li v-for="(comment,index) in taskComments">
                <div class="commenterImage">
                  <img src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                  <!-- <i class='glyphicon glyphicon-user'></i> -->
                </div>
                <div class="commentText"><strong>{{comment.CommenterUserId}}</strong>
                  <span class="date sub-text">on {{new Date(comment.createdDateTime).toDateString()}}</span>
                    <p class="">{{comment.content}}</p> 

                </div>
            </li>
                                                  
        </ul>
        <form class="form-inline" role="form">
            <div class="form-group">
                <input class="form-control" type="text" id="box" style="width: 300px; height: 20px" placeholder="Your comments" 
                    v-model="newcomment" v-on:focus='textboxFocus($event)' v-on:blur='textboxBlur($event)'/>
            </div>
            <div class="form-group">
                <!-- <button class="btn btn-default" v-on:click='submit($event)'>Add</button> -->
                <input type="submit" class="btn btn-default" 
                        	value="Add" v-on:click='submit($event)'>
            </div>
        </form>
    </div>
</div>

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
				newcomment: ''
			}
		},

		methods: {
			submit(e){
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
    				width: '300px',
    				height: '100px'
  				}, 500, function() {
    			// Animation complete.
  				});
			},

			textboxBlur(e){
				$(e.currentTarget).animate({
     				width: '300px',
     				height: '20px'
   				}, 500, function() {
     			// Animation complete.
   			  });
			},

            assignTask(assigneeusername){
                var assignTaskToUser = {
                    operation: 'update',
                    taskid: this.selectedTask._id,
                    AssigneeUserId: assigneeusername.assigneeusername
                }
                api.assignTaskToUser(assignTaskToUser)
                    .then((resp)=>{
                        console.log('assignTaskToUser response:- ' + JSON.stringify(resp));
                        this.selectedTask.AssigneeUserId = assigneeusername.assigneeusername;
                    });
            },
		},

		beforeUpdate(){
			
		},
	}	

</script>


<style>
.thumbnail {
    padding:0px;
}
.detailBox {
	position:relative;
	border:1px solid #bbb;
}



.titleBox {
    background-color:#fdfdfd;
    padding:10px;
}
.titleBox label{
  color:#444;
  margin:0;
  display:inline-block;
}

.commentBox {
    padding:10px;
    border-top:1px dotted #bbb;
}
.commentBox .form-group:first-child, .actionBox .form-group:first-child {
    width:80%;
}
.commentBox .form-group:nth-child(2), .actionBox .form-group:nth-child(2) {
    width:18%;
}
.actionBox .form-group * {
    width:100%;
}
.taskDescription {
    margin-top:10px 0;
}
.commentList {
    padding:0;
    list-style:none;
    /*max-height:200px;*/
    overflow:auto;
}
.commentList li {
    margin:0;
    margin-top:10px;
}
.commentList li > div {
    display:table-cell;
}
.commenterImage {
    width:30px;
    margin-right:5px;
    height:100%;
    float:left;
}
.commenterImage img {
    width:100%;
    border-radius:50%;
}
.commentText p {
    margin:0;
}
.sub-text {
    color:#aaa;
    font-family:verdana;
    font-size:11px;
}
.actionBox {
    border-top:1px dotted #bbb;
    padding:10px;
}
</style>