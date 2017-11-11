<template>
  <v-layout row justify-center>
    <v-tooltip bottom  v-for="(members,index) in selectedWs.MemberUserIds" :key="index" v-if="members._id!=username" class="pa-1">
    <v-avatar size="30px" class="indigo" slot="activator">
      <span class="white--text">
        {{members.name.charAt(0).toUpperCase()}}{{members.name.split(" ").pop().charAt(0).toUpperCase()}}
      </span>
    </v-avatar>
    <span>{{members.name}} </br> {{members.email}}</span>
    </v-tooltip>


    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" fab small flat class='text-xs-center' v-on:click="openForm">        
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Member</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>              
              <v-flex xs12>
                <v-text-field label="Enter Name" v-model="usernameText" required></v-text-field>
              </v-flex>              
                            
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeForm">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addMember">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>



<script>
import api from '../utils/api'

export default {
  name: 'WorkspaceMembers',

  data() {
    return {
      usernameText: '',      
      isCreating: false,
      dialog: false,
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
      //this.isCreating = false;
      this.dialog = false;
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
            this.selectedWs.MemberUserIds.push(resp.data);
          });


        this.usernameText='';
      }
      //this.isCreating = false;
      this.dialog = false;
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