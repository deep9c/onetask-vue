<template>  
    <!--// JavaScript expressions in Vue are enclosed in double curly brackets.-->
    
     <div class='ui centered card'>
     <a href="#" class="list-group-item" v-on:click="selectTask(todo)">
      <div class='content' v-show="!isEditing">
        <div class='header'>
          {{ todo.title }}
        </div>
        <div class='meta'>
          {{ todo.description }}
        </div>
        <div class='extra content'>
          <span class='right floated edit icon' v-on:click="showForm">
            <i class='edit icon'></i>
          </span>
          <!-- add the trash icon in below the edit icon in the template -->
          <span class='right floated trash icon' v-on:click="deleteTodo(todo)">
            <i class='trash icon'></i>
          </span>
        </div>
      </div>
    </a>

    <!-- form is visible when we are in editing mode -->
    <div class="content" v-show="isEditing">
      <div class='ui form'>
        <div class='field'>
          <label>Title</label>
          <input type='text' v-model="todo.title" >
        </div>
        <div class='field'>
          <label>description</label>
          <input type='text' v-model="todo.description" >
        </div>
        <div class='ui two button attached buttons'>
          <button class='ui basic blue button' v-on:click="hideForm">
            Close X
          </button>
        </div>
      </div>
    </div>

      <div class='ui bottom attached green basic button' v-if="todo.status==='completed'">	<!--show if v-show is true-->
        Completed
      </div>
      <div class='ui bottom attached red basic button' v-if="todo.status=='pending'" v-on:click="completeTodo(todo)">
        Complete
      </div>
  	</div>  
</template>

<script type = "text/javascript" >

export default {
	props: ['todo'],
  data() {
    return {
      isEditing: false,
    };
  },
   methods: {
    showForm() {
      this.isEditing = true;
    },
    hideForm() {
      this.isEditing = false;
    },
    deleteTodo(todo) {
      this.$emit('delete-todo', todo);
    },
    completeTodo(todo) {
        this.$emit('complete-todo', todo);
    },
    selectTask(todo){
      //console.log('showcom called todo');  
      this.$emit('select-task', todo);
    }
  },
};
</script>
