<template>
  <div class='ui basic content center aligned segment'>
    <button v-on:click="openForm" v-show="!isCreating">
      <i class='glyphicon glyphicon-plus'></i>
    </button>
    <div class='ui centered card' v-show="isCreating">
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <label>Name</label>
            <input v-model="nameText" type='text' ref='title' defaultValue="">
          </div>
          <div class='field'>
            <label>Description</label>
            <input v-model="description" type='text' ref='project' defaultValue="">
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="sendForm">
              Create
            </button>
            <button class='ui basic red button' v-on:click="closeForm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateProject',

  data() {
    return {
      nameText: '',
      description: '',
      isCreating: false,
    };
  },
  methods: {
    openForm() {
      //console.log("open form");
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      //console.log("send form " + this.nameText.length);
      if (this.nameText.length > 0 && this.description.length > 0) {
        const name = this.nameText;
        const description = this.description;
        this.$emit('add-project', {
          name,
          description,
        });
        //console.log("add-todo event emitted");
        this.newTodoText = '';
        this.nameText='';
        this.description='';
      }
      this.isCreating = false;
    },
  },
};
</script>