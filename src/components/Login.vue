<template>
  <form id="login-form" role="form" style="display: block;">
  <div class="alert alert-danger" v-if="error">
    <p>{{ error }}</p>
  </div>
  <div class="form-group">
    <input type="text"required name="username" id="username" tabindex="1" class="form-control" placeholder="Username" v-model="credentials.username">
  </div>
    <div class="form-group">
      <input type="password"required name="password" id="password" tabindex="2" class="form-control" placeholder="Password" v-model="credentials.password">
    </div>
      <div class="form-group text-center">
        <input type="checkbox" tabindex="3" class="" name="remember" id="remember">
          <label for="remember"> Remember Me</label>
      </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
              <button name="login-submit" id="login-submit"  tabindex="4" class="form-control btn btn-primary" v-on:click="submit($event)">Log In</button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center">
                <a href="#" tabindex="5" class="forgot-password">Forgot Password?</a>
              </div>
            </div>
          </div>
        </div>
  </form>
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
        error: ''
    };
  },
  beforeCreate(){
    //api.checkLogin(this,true,'/');

    
  },
  methods: {
    submit(e) {
        if($('#login-form')[0].checkValidity()){  //checkValidity() is HTML5 thingy that validates the checks in all textboxes within the said form
          e.preventDefault();
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
      }
  },

}
</script>

<style>
.btn-login {
  background-color: #59B2E0;
  outline: none;
  color: #fff;
  font-size: 14px;
  height: auto;
  font-weight: normal;
  padding: 14px 0;
  text-transform: uppercase;
  border-color: #59B2E6;
}
.btn-login:hover,
.btn-login:focus {
  color: #fff;
  background-color: #53A3CD;
  border-color: #53A3CD;
}
.forgot-password {
  text-decoration: underline;
  color: #888;
}
.forgot-password:hover,
.forgot-password:focus {
  text-decoration: underline;
  color: #666;
}

</style>
