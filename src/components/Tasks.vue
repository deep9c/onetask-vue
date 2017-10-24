<template>
  <!-- <strong>Tasks: </strong> {{selectedProj.name}} -->
	<v-card>
    <v-card-text class="px-0">                    
      <!-- content body 
      <todo-list v-bind:todos="tasks.tasks" v-on:select-task="selectTask"></todo-list>
      -->
      <!--
    	<p v-if="tasks.tasks">Completed Tasks: {{tasks.tasks.filter(todo => {return todo.status === 'completed'}).length}}</p>
    	<p v-if="tasks.tasks">Pending Tasks: {{tasks.tasks.filter(todo => {return todo.status === 'pending'}).length}}</p>
    	-->

    	<v-list dense>
        <v-subheader>
          <v-btn dark small round color="teal" @click="isCreatingProp=true">Add Task</v-btn>
        </v-subheader>
  
    		<todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-on:edit-todo="editTodo" 
    			v-for="(todo,index) in tasks.tasks" 
      		v-bind:todo="todo" :key="index" :todo.sync="todo" v-on:select-task="selectTask">      
  			</todo>
  			<!-- todo.sync used for completeTodo function to work -->
        <create-todo v-if="selectedWsId && selectedProj" v-on:add-todo="addTodo" v-on:falsify-creatingform="isCreatingProp=false"
          v-bind:isCreatingProp="isCreatingProp"></create-todo>
    	</v-list>
                     
    </v-card-text>
  </v-card>
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
				required: false
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
        isCreatingProp: false,
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