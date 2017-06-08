var axios = require('axios');
axios.defaults.withCredentials = true;	//used to send cookies tokens in request headers
var nodeurl = 'http://localhost:3000';

import api from '../utils/api'

export default {

	user: {
    	authenticated: false,
    	username:'',
      userdetails: {}
	},

	login(creds) {
		return axios.post(nodeurl + '/auth/login', creds)	//{ username: credentials.username, password: credentials.password }
          .then((response)=>{
            console.log('login success ');            
            //login success
            this.user.authenticated = true;
            this.user.username = response.data.user._id;
            //return response;
            //context.$router.push(redirect);		//redirect to dashboard
            
          });
  	},

  	getLoginStatus(){
  		return axios.get(nodeurl + '/api/me')
  			.then((response)=>{
  				if(response.data.user){	//already loggedin
  					this.user.authenticated = true;
  					this.user.username = response.data.user._id;
            //console.log('getLoginStatus response -> '+ JSON.stringify(response));
            this.user.userdetails = response.data;            
  				}
  				else{
  					this.user.authenticated = false;
  				}  	
  				return response;
  			});
  			
  	},

  	logout(){
  		return axios.get(nodeurl + '/auth/logout')
  			.then(function(response){
  				//if(response.data.message='loggedout'){
            console.log('logout success');
  					this.user.authenticated = false;
  					//return response;
            //context.$router.push(redirect);
  				//}  				
  			}.bind(this));
  	},

  	checkLoggedin(to, from, next){
  		api.getLoginStatus()
  			.then((response)=>{
  				console.log('checkLogin Response: ');
  							
  				next(response.data.user ? true : {		////go to login if not loggedin
      				path: '/login',
      				query: {
       				 redirect: to.fullPath
      				}
    			})
  			});

  	},

  	checkLoggedout(to, from, next){
  		api.getLoginStatus()
  			.then(function(response){
  				console.log('checkLoggedout Response: ');
  							
  				next(response.data.user ? {		//go to dashboard if already loggedin
      				path: '/dashboard',
      				query: {
       				 redirect: to.fullPath
      				}
    			} : true)
  			}.bind(this));
  	},
    
    register(userdetails){
      return axios.post(nodeurl + '/auth/register', userdetails);       
    },

    getWorkspace(workspaceId){
      return axios.get(nodeurl + '/api/workspace/' + workspaceId);
    },

    getTasks(workspaceId, projId, userId){
      //console.log('getTasks URL --->> '+ nodeurl + '/api/task/' + userId + '/' + workspaceId + '/' + projId);
      return axios.get(nodeurl + '/api/task/' + userId + '/' + workspaceId + '/' + projId);
    },

    createTask(createTaskInputs){
      return axios.post(nodeurl + '/api/task', createTaskInputs);
    },

    getComments(taskId){
      return axios.get(nodeurl + '/api/comment/' + taskId);
    },

    createComment(createCommentInputs){
      return axios.post(nodeurl + '/api/comment', createCommentInputs);
    },

    createProject(createProjInputs){
      return axios.post(nodeurl + '/api/project', createProjInputs);
    },

}