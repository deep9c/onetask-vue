<template>
  <div>    
    <v-text-field
          v-model="usernameText"
          label="Enter assignee"
          @change="assignTask"          
          :prepend-icon="'account_circle'"
        ></v-text-field>

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
        currentAssignee: {
        type: String,
        required: true,
      },  
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