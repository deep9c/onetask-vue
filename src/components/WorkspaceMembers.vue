<template>
  <div class='ui basic content center aligned segment'>
    <button v-on:click="openForm" v-show="!isCreating">
      <i class='glyphicon glyphicon-plus'></i>
    </button>
    <div class='ui centered card' v-show="isCreating">
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <label>Username</label>
            <input v-model="usernameText" type='text' ref='title' defaultValue="">
          </div>          
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="addMember">
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
import api from '../utils/api'

export default {
  name: 'WorkspaceMembers',

  data() {
    return {
      usernameText: '',      
      isCreating: false,
    };
  },

  props: {      
      selectedWs: {
        type: Object,
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
    addMember() {
      //console.log("send form " + this.usernameText.length);
      //take WSID from prop; take userid as input; call Node... Node will respond 404 NotFound is user doesnt exist; or the user details if 200 Success
      if (this.usernameText.length > 0) {
        const name = this.usernameText;
        /*this.$emit('add-project', {
          name,
        });*/

        var addWorkspaceMemberInputs = {
          wsid: this.selectedWs._id,
          userid: this.usernameText
        }
        api.addWorkspaceMember(addWorkspaceMemberInputs)
          .then((resp)=>{
            console.log('addWorkspaceMember response');
          });


        this.usernameText='';
      }
      this.isCreating = false;
    },
  },
};
</script>