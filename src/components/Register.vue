<template>
<form id="register-form" role="form" style="display: none;">
                  <div class="alert alert-danger" v-if="error">
    				<p>{{ error }}</p>
  				  </div>
                  <div class="form-group">
                    <input type="text"required name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="" v-model="user.username">
                  </div>
                  <div class="form-group">
                    <input type="text"required name="name" id="name" tabindex="1" class="form-control" placeholder="Name" value="" v-model="user.name">
                  </div>
                  <div class="form-group">
                    <input type="email"required name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address" value="" v-model="user.email">
                  </div>
                  <div class="form-group">
                    <input type="password"required name="password" id="password" tabindex="2" class="form-control" placeholder="Password" v-model="user.password">
                  </div>
                  <div class="form-group">
                    <input type="password"required name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password" ref="confirmpwd" v-on:keyup='validateForm'>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-6 col-sm-offset-3">
                        <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now" v-on:click='submit($event)'>
                      </div>
                    </div>
                  </div>
                </form>
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
				},
				error: ''
			}
		},

		methods: {
			validateForm(){
				if(this.user.password != this.$refs.confirmpwd.value){
						this.$refs.confirmpwd.setCustomValidity('Passwords do not match');
						
					}
					else{
						this.$refs.confirmpwd.setCustomValidity('');
					}
			},
			submit(e){				
				if($('#register-form')[0].checkValidity()){					
					e.preventDefault();	
					api.register(this,this.user,'/dashboard')
						.then((response)=>{
							console.log('register response-> '+ JSON.stringify(response));
							var credentials = { 												
												username: this.user.username,
												password: this.user.password												
											};
							console.log('register credentials:: ' + JSON.stringify(credentials));

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
				
			}
		}
	}
</script>


<style>
.btn-register {
	background-color: #1CB94E;
	outline: none;
	color: #fff;
	font-size: 14px;
	height: auto;
	font-weight: normal;
	padding: 14px 0;
	text-transform: uppercase;
	border-color: #1CB94A;
}
.btn-register:hover,
.btn-register:focus {
	color: #fff;
	background-color: #1CA347;
	border-color: #1CA347;
}
</style>