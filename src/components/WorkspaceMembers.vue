<template>
  <div class='ui basic content center aligned segment'>
    <label v-for="(members,index) in selectedWs.MemberUserIds" :key="index">
      <label id="memberIds" v-if="members!=username"> {{members}} &nbsp; </label>
    </label>
    <button v-on:click="openForm" v-show="!isCreating">
      <v-icon>add</v-icon>
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
              Add
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
      username: {
        type: String,
        required: true,
      },    
    },

  methods: {
    openForm() {
      //console.log("open form");
      this.isCreating = true;
      console.log('selectedws= '+JSON.stringify(this.selectedWs));
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
            console.log('addWorkspaceMember response:- ' + JSON.stringify(resp));
            this.selectedWs.MemberUserIds.push(name);
          });


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