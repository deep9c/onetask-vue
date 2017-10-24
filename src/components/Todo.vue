<template>  
    <!--// JavaScript expressions in Vue are enclosed in double curly brackets.-->
    
  <div>
    

    <v-list-tile id="todoanchor" v-on:click="selectTask(todo,$event)" v-show="!isEditing">
      <!--
      <v-list-tile-action v-if="todo.status==='completed'"> 
        <v-icon>check_circle</v-icon>
      </v-list-tile-action>
      <v-list-tile-action v-if="todo.status=='pending'" v-on:click="completeTodo(todo)">
        <v-icon>schedule</v-icon>
      </v-list-tile-action>
      -->
      
      <v-list-tile-content>
        <v-text-field
          v-model="todo.title"              
          single-line
          full-width
          hide-details
          @change="hideForm(todo)"
          :append-icon="'delete'"
          :append-icon-cb="() => deleteTodo(todo)"
          :prepend-icon="todo.status=='pending' ? 'check_box_outline_blank' : 'check_box'"
          :prepend-icon-cb="() => completeTodo(todo)"
        ></v-text-field>
      </v-list-tile-content>
                
      <!--<div class='meta'>
        {{ todo.description }}
      </div>
      -->

      <!--
      <v-list-tile-action v-on:click="deleteTodo(todo)">
        <v-icon>delete</v-icon>
      </v-list-tile-action>
      -->
          
      <!--
      <span class='badge' v-on:click="showForm">
        <i class='edit icon'></i>
      </span>       
      -->       
    </v-list-tile>

    <!-- form is visible when we are in editing mode 
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
    -->
    <v-divider inset></v-divider>
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
      if(this.todo.status=='pending'){
        this.$emit('complete-todo', todo);
      }
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
