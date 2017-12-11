// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import 'vue-material/dist/vue-material.css'
import('../node_modules/vuetify/dist/vuetify.min.css')

import Vuetify from 'vuetify'
Vue.use(Vuetify)

Vue.config.productionTip = false
var cors = require('cors');
//Vue.use(cors({ origin: "http://localhost:8080", credentials: false}));   //used for cross-domain requests
//Vue.http.options.xhr = {withCredentials: false};
//Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://http://192.168.0.3:8080'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

/*import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)*/

//var VueMaterial = require('vue-material')
//Vue.use(VueMaterial)
//Vue.use(VueMaterial.MdCore)

/*Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'aaa',
  warn: 'red',
  background: 'white'
})*/


