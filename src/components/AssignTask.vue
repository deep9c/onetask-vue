<template>
  <div class='ui basic content center aligned segment'>    
    <button v-on:click="openForm" v-show="!isCreating">
      <i class='glyphicon glyphicon-plus'></i>
    </button>
    <div class='ui centered card' v-show="isCreating">
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <label>Assign task to </label>
            <input v-model="usernameText" type='text' ref='title' defaultValue="">
          </div>          
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="assignTask">
              Assign
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
import api from '../utils/api'

export default {
  name: 'AssignTask',

  data() {
    return {
      usernameText: '',      
      isCreating: false,
    };
  },

  props: {      
        
    },

  methods: {
    openForm() {
      //console.log("open form");
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    assignTask() {
      //console.log("send form " + this.usernameText.length);
      //take WSID from prop; take userid as input; call Node... Node will respond 404 NotFound is user doesnt exist; or the user details if 200 Success
      if (this.usernameText.length > 0) {
        const assigneeusername = this.usernameText;
        this.$emit('assign-task', {
          assigneeusername,
        });
        /*
        var assignTaskToUser = {
          assigneeusername: this.usernameText
        }
        api.assignTaskToUser(assignTaskToUser)
          .then((resp)=>{
            console.log('assignTaskToUser response');
          });
        */

        this.usernameText='';
      }
      this.isCreating = false;
    },
  },
};
</script>

<style>
#memberIds {
    color: #ffffff;
    font-size:small;
}
</style>