 <template>
    <div>
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li><router-link to="/login" v-if="!user.authenticated">Login</router-link></li>
          <li><router-link to="/login" v-if="user.authenticated" v-on:click.native="logout">Logout</router-link></li>
        </ul>
      </div>    
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
    </div>
</template>

<script>
  import api from './utils/api'

  export default {
   name: 'app',

   data() {
      return {
        user: api.user
      }
    },

    methods: {
      logout() {
        api.logout(this,'/login');
      }
    }
  }
</script>

<style>

</style>


}