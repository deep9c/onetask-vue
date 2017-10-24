<template>
<v-container fluid>
  <v-flex xs12 sm6 offset-sm3>
  <v-card>
  <v-card-title primary-title>
    <v-tabs dark fixed centered>
      <v-tabs-bar class="teal">
        <v-tabs-slider class="yellow"></v-tabs-slider>
        <v-tabs-item
          v-for="i in items"
          :key="i"
          :href="'#tab-' + i"
        >
          {{ i }}
        </v-tabs-item>
      </v-tabs-bar>

      <v-tabs-items>
        <v-tabs-content
          :key="'Login'"
          :id="'tab-Login'"
        >
          <Login></Login>
        </v-tabs-content>
      </v-tabs-items>
      
      <v-tabs-items>
        <v-tabs-content
          :key="'Register'"
          :id="'tab-Register'"
        >
          <Register></Register>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
    </v-card-title>         
    </v-card>
  </v-flex>
  </v-container>
</template>

<script>
import Login from './Login';
import Register from './Register';

export default {
  name: 'GetStarted',
  components: {Login, Register},

  data () {
    return {
      items: ['Login', 'Register'],      
    }
  },

  methods: {
    
  }
}



</script>

<style>

</style>