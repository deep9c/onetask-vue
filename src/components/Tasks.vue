<template>
	<div class="panel panel-warning">
                            <div class="panel-heading">
                                    <!-- Panel 1 -->
                                    <strong>Tasks: </strong> <!-- {{selectedProj.name}} -->
                            </div>
                            <div class="panel-body">
                                <!-- content body 
                                <todo-list v-bind:todos="tasks.tasks" v-on:select-task="selectTask"></todo-list>
                                -->
                                <!--
    							<p v-if="tasks.tasks">Completed Tasks: {{tasks.tasks.filter(todo => {return todo.status === 'completed'}).length}}</p>
    							<p v-if="tasks.tasks">Pending Tasks: {{tasks.tasks.filter(todo => {return todo.status === 'pending'}).length}}</p>
    							-->

    							<div class="list-group">
    							<todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-on:edit-todo="editTodo" 
    								v-for="(todo,index) in tasks.tasks" 
      								v-bind:todo="todo" :key="index" :todo.sync="todo" v-on:select-task="selectTask">      
  								</todo>
  								<!-- todo.sync used for completeTodo function to work -->
    							</div>


                                <create-todo v-on:add-todo="addTodo"></create-todo>
                            </div>
                        </div>
</template>

<script>
	import Todo from './Todo'
	import CreateTodo from './CreateTodo'
	import api from '../utils/api'

	export default{
		name: 'Tasks',

		components: {
			Todo,
			CreateTodo
		},

		props: {
			selectedWsId: {
				//type: Object,
				required: true
			},
			selectedProj: {
				type: Object,
				required: false
			},
			username: {
				type: String,
				required: true
			},
			tasks: {
				type: Object,
				required: true
			},
		},

		data(){
			return{
				/*todosarray:  [
                {
                  title: 'Todo A',
                  description: 'Project 1',
                  status: 'completed'
                },
                {
                  title: 'Todo B',
                  description: 'Project 2',
                  status: 'pending'
                },
                {
                  title: 'Todo C',
                  description: 'Project 2',
                  status: 'completed'
                },
                {
                  title: 'Todo D',
                  description: 'Project 3',
                  status: 'completed'
                }
              ],*/
			};
		},

		methods: {
			selectTask(task){      
    			console.log('showcom called tasks: ' + JSON.stringify(task));  
        		this.$emit('select-task', task);
      		},

			addTodo(newtodo) {
      			//console.log("addTodo() called");
      			var createTaskInputs = {
      				workspaceid: this.selectedWsId,
      				projectid: this.selectedProj._id,
      				username: this.username,
      				title: newtodo.title,
      				description: newtodo.description
      			};
      			api.createTask(createTaskInputs)
      				.then((resp)=>{
      					console.log('createTask resp:- ' + JSON.stringify(resp));
      					this.tasks.tasks.push(resp.data);
      					this.selectTask(resp.data);
      					console.log('createTask ends');
      			});
      			//this.tasks.push(newtodo);
    		},

    		deleteTodo(todo) {
      			const todoIndex = this.tasks.tasks.indexOf(todo);
      			this.tasks.tasks.splice(todoIndex, 1);
      			var updateTaskInputs = {
      				operation: 'delete',
      				workspaceid: this.selectedWsId,
      				projectid: this.selectedProj._id,
    				taskid: todo._id,
    			};
      			api.updateTask(updateTaskInputs)
    				.then((resp)=>{
    					console.log('updateTask resp');
    				});
    		},

    		editTodo(todo) {
      			console.log("editTodo() called");    			
    			var updateTaskInputs = {
    				operation: 'update',
    				taskid: todo._id,
    				title: todo.title,
    				description: todo.description
    			};
    			api.updateTask(updateTaskInputs)
    				.then((resp)=>{
    					console.log('updateTask resp');
    				});
    		},

    		completeTodo(todo){
    			console.log("completeTodo() called");
    			this.tasks.tasks[this.tasks.tasks.indexOf(todo)].status = 'completed'; 
    			var updateTaskInputs = {
    				operation: 'update',
    				taskid: todo._id,
    				status: 'completed'
    			};
    			api.updateTask(updateTaskInputs)
    				.then((resp)=>{
    					console.log('updateTask resp');
    				});
    		},
		},

		created(){
			//console.log('beforeMount of Tasks starts');
			//console.log('Tasks beforeMount() -->> ' + this.selectedWsId + ' .... ' + JSON.stringify(this.selectedProj) + '....' + this.username);
			/*api.getTasks(this.selectedWsId,this.selectedProj._id, this.username)
				.then((resp)=>{
					console.log('getTasks resp::- ' + JSON.stringify(resp));
			});*/

			//console.log('beforeMount of Tasks ends');
		},
	}

</script>

<style scoped>
p.tasks {
  text-align: center;
}
</style>