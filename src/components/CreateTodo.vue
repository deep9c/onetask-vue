<template>
  <div>
  <!--
  <v-btn fab flat small class='text-xs-center' v-on:click="openForm" v-show="!isCreating">
    <v-icon>add</v-icon>
  </v-btn>
  -->
  <v-list-tile>
  <v-list-tile-content>
    
  <v-text-field ref="createtaskinput"
    v-if="isCreating"
    v-model="titleText"              
    label="Write a new task name"
    @change="sendForm"
    @blur="closeForm"
    single-line
    full-width
    hide-details
    autofocus
  ></v-text-field>

  </v-list-tile-content>

    <!--
    <div class='ui centered card' v-show="isCreating">
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <label>Title</label>
            <input v-model="titleText" type='text' ref='title' defaultValue="">
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
    -->
  </v-list-tile>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleText: '',
      description: '',
      isCreating: false,
    };
  },

  props: {
    isCreatingProp: {
      type: Boolean,
      required: true
    },      
  },

  watch : {
    isCreatingProp : function (value) {
      //console.log('drawer changed to '+value);

      this.isCreating = value;      
      //this.$refs.createtaskinput.focus();
    }
  },

  methods: {
    openForm() {
      //console.log("open form");
      
      this.isCreating = true;
      this.$refs.createtaskinput.focus();
    },
    closeForm() {
      if (this.titleText.length == 0) {
        this.isCreating = false;
        this.$emit('falsify-creatingform', false);
      }
    },
    sendForm() {
      //console.log("send form " + this.titleText.length);
      if (this.titleText.length > 0) {
        const title = this.titleText;
        const description = this.description;
        this.$emit('add-todo', {
          title,
          description,
          status: 'pending',
        });
        //console.log("add-todo event emitted");
        this.titleText='';
        this.description='';
      }
      this.isCreating = false;
    },
  },
};
</script>