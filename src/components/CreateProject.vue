<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" fab small flat class='text-xs-center' v-on:click="openForm">
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New Project</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>              
              <v-flex xs12>
                <v-text-field label="Project Name" v-model="nameText" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Project Description" v-model="description" multi-line></v-text-field>
              </v-flex>
                            
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeForm">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="sendForm">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'CreateProject',

  data() {
    return {
      nameText: '',
      description: '',
      dialog: false,
    };
  },
  methods: {
    openForm() {
      //console.log("open form");
      this.isCreating = true;
    },
    closeForm() {
      //this.isCreating = false;
      this.dialog = false;
    },
    sendForm() {
      //console.log("send form " + this.nameText.length);
      if (this.nameText.length > 0) {
        const name = this.nameText;
        const description = this.description;
        this.$emit('add-project', {
          name,
          description,
        });
        //console.log("add-todo event emitted");
        this.nameText='';
        this.description='';
      }
      //this.isCreating = false;
      this.dialog = false;
    },
  },
};
</script>