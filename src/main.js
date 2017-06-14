// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

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
