<template>
  <div>
    <!--// JavaScript expressions in Vue are enclosed in double curly brackets.-->
    <p>Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}</p>
    <p>Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}</p>
    <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="(todo,index) in todos" v-bind:todo="todo" :key="index" :todo.sync="todo">      
  	</todo>
  	<!-- todo.sync used for completeTodo function to work -->
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
    		this.todos[this.todos.indexOf(todo)].done = true; 
    	}
  	},
}
</script>

<style scoped>
p.tasks {
  text-align: center;
}
</style>