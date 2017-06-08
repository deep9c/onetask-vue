<template>
  <div>
    <!--// JavaScript expressions in Vue are enclosed in double curly brackets.-->
    <!--
    <p v-if="todos">Completed Tasks: {{todos.filter(todo => {return todo.status === 'completed'}).length}}</p>
    <p v-if="todos">Pending Tasks: {{todos.filter(todo => {return todo.status === 'pending'}).length}}</p>
    -->
    <div class="list-group">
    <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="(todo,index) in todos" 
      v-bind:todo="todo" :key="index" :todo.sync="todo" v-on:select-task="selectTask">      
  	</todo>
  	<!-- todo.sync used for completeTodo function to work -->
    </div>
  </div>
</template>

<script type = "text/javascript" >
import Todo from './Todo';

export default {
	props: ['todos'],
	components: {Todo,},
	methods: {
    	deleteTodo(todo) {
      		const todoIndex = this.todos.indexOf(todo);
      		this.todos.splice(todoIndex, 1);
    	},
    	completeTodo(todo){
    		console.log("completeTodo() called");
    		this.todos[this.todos.indexOf(todo)].status = 'completed'; 
    	},
      selectTask(task){      
        //console.log('showcom called todolist' + JSON.stringify(task));    
        this.$emit('select-task', task);
      }
  	},
}
</script>

<style scoped>
p.tasks {
  text-align: center;
}
</style>