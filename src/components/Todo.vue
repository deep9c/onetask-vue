<template>  
    <!--// JavaScript expressions in Vue are enclosed in double curly brackets.-->
    
  <div>
    

    <a id="todoanchor" href="#" class="list-group-item" v-on:click="selectTask(todo,$event)" v-show="!isEditing">
      <div class='glyphicon glyphicon-ok-circle' v-if="todo.status==='completed'"> <!--show if v-show is true-->
        <!-- Completed -->
      </div>
      <div class='glyphicon glyphicon-time' v-if="todo.status=='pending'" v-on:click="completeTodo(todo)">
        <!-- Complete -->
      </div>
        
          {{ todo.title }}
        
        <!--<div class='meta'>
          {{ todo.description }}
        </div>-->
                
          <span class='badge' v-on:click="deleteTodo(todo)">
            <i class='trash icon'></i>
          </span>

          <span class='badge' v-on:click="showForm">
            <i class='edit icon'></i>
          </span>              
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
          <button class='ui basic blue button' v-on:click="hideForm(todo)">
            Close X
          </button>
        </div>
      </div>
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
    hideForm(todo) {
      this.isEditing = false;
      this.$emit('edit-todo', todo);
    },
    deleteTodo(todo) {
      this.$emit('delete-todo', todo);
    },
    completeTodo(todo) {
        this.$emit('complete-todo', todo);
    },
    selectTask(todo,e){
      //console.log('showcom called todo');  
      $("a").removeClass("active");
      $(e.currentTarget).addClass('active');
      this.$emit('select-task', todo);
      
    }
  },
};
</script>
