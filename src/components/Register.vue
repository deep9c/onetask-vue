<template>
<v-form id="register-form" v-model="valid" ref="form" lazy-validation>
      <v-alert v-if="error" color="error" icon="warning" value="true">
        {{ error }}
      </v-alert>
      <v-text-field
        label="Username"
        v-model="user.username"
        :rules="[rules.required]"
        required
      ></v-text-field>
	  <v-text-field
        label="Name"
        v-model="user.name" 
		:rules="[rules.required]"
        required
      ></v-text-field>
	  <v-text-field
        label="Email"
        v-model="user.email"
        :rules="[rules.required, rules.email]"
        required
      ></v-text-field>
	  
      <v-text-field
        label="Enter your password"
        v-model="user.password"
        hint="At least 4 characters"
        min="4"
        :append-icon="e1 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'password' : 'text'"
        :rules="[rules.required]"
        counter
        required
        ></v-text-field>
	  <v-text-field
        label="Re-enter your password"
        v-model="user.cnfpwd"
        hint="Passwords should match"
        :append-icon="e2 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e2 = !e2)"
        :type="e2 ? 'password' : 'text'"
        :rules="[rules.required, rules.confirmPwd]"
        counter
        required
        ></v-text-field>
      
  
      <v-btn
        color="primary"
        @click="submit"
        :disabled="!valid"
      >
        Register
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
</template>

<script>
	import api from '../utils/api';

	export default{
		name: 'Register',
		
		data(){
			return{
				user: {
					username: '',
					name: '',					
					email: '',
					password: '',
					cnfpwd:''					
				},
				error: '',

				valid: true,
        		e1: true,
        		e2: true,
        		rules: {
        			required: (value) => !!value || 'Required.',
        			email: (value) => {
          				const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          				return pattern.test(value) || 'Invalid e-mail.'
        			},
        			confirmPwd: (value) => {
        				return value==this.user.password || 'Passwords do not match'
        			}
      			},
        		
			}
		},

		methods: {			
			submit () {
      			if (this.$refs.form.validate()) {
        			api.register(this.user)
						.then((response)=>{
							console.log('registration success ');
							var credentials = { 												
												username: this.user.username,
												password: this.user.password												
											};							

							//api.login(this,credentials,'/dashboard');
							api.login(credentials)
          						.then((resp)=>{
            						this.$router.push('/dashboard');   //redirect to dashboard
          						})
          						.catch((error)=>{
            						this.error = error.response.data;
          						});  
						})
						.catch((error)=>{
							this.error = error.response.data;
						});
      			}
    		},
    		clear () {
      			this.$refs.form.reset()
    		}			
		}
	}
</script>


<style>

</style>