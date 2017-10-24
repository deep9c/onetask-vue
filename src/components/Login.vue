<template>
  <v-form id="login-form" v-model="valid" ref="form" lazy-validation>
      <v-alert v-if="error" color="error" icon="warning" value="true">
        {{ error }}
      </v-alert>
      <v-text-field
        label="Username"
        v-model="credentials.username"
        :rules="usernameRules"
        required
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="credentials.password"
        hint="At least 4 characters"
        min="4"
        :append-icon="e1 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'password' : 'text'"
        :rules="pwdRules"
        counter
        required
        ></v-text-field>
     
      
  
      <v-btn
        color="primary"
        @click="submit"
        :disabled="!valid"
      >
        Login
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
</template>

<script>

import api from '../utils/api';

export default {
  name: 'Login',
  
  data () {
    return {
       credentials: {
          username: '',
          password: ''
        },
        error: '',

        valid: true,
        e1: true,    
        usernameRules: [
          (v) => !!v || 'Username is required',
          //(v) => v && v.length <= 10 || 'Username must be less than 10 characters'
        ],
        pwdRules: [
          (v) => !!v || 'Password is required',
          //(v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],

    };
  },
  beforeCreate(){
    //api.checkLogin(this,true,'/');

    
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }      

        api.login(credentials)
          .then((resp)=>{
            this.$router.push('/dashboard');   //redirect to dashboard
          })
          .catch((error)=>{
            this.error = error.response.data;
          });  
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  },

}
</script>

<style>


</style>
