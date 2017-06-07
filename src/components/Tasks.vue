<template>
	<div class="panel panel-danger">
                            <div class="panel-heading">
                                    <!-- Panel 1 -->
                                    {{selectedProj.name}} - Tasks
                            </div>
                            <div class="panel-body">
                                <!-- content body -->
                                <todo-list v-bind:todos="tasks.tasks"></todo-list>
                                <create-todo v-on:add-todo="addTodo"></create-todo>
                            </div>
                        </div>
</template>

<script>
	import TodoList from './TodoList'
	import CreateTodo from './CreateTodo'
	import api from '../utils/api'

	export default{
		name: 'Tasks',

		components: {
			TodoList,
			CreateTodo
		},

		props: {
			selectedWsId: {
				//type: Object,
				required: true
			},
			selectedProj: {
				type: Object,
				required: true
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
      					this.tasks.tasks.push(newtodo);
      			});
      			//this.tasks.push(newtodo);
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