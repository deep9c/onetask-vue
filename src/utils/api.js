var axios = require('axios');
axios.defaults.withCredentials = true;	//used to send cookies tokens in request headers
var nodeurl = process.env.NODE_URI; // || 'https://onetasknode.herokuapp.com'; //'http://localhost:3000';

import api from '../utils/api'

export default {

	user: {
    	authenticated: false,
    	username:'',
      userdetails: {}
	},

  chatbot: {
      uri: 'http://10.13.45.48:5000',
      connected: true,
      welcomemsg:"Hi there, how may I help you?",
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
        axios.get(api.chatbot.uri, {withCredentials:false})
          .then((resp)=>{
            console.log("Chatbot initialised: " + JSON.stringify(resp));
            if(resp.status != 200){
              api.chatbot.connected = false;
              api.chatbot.welcomemsg = "We are not online currently. Let's chat later!";// resp.data;
            }
          })
          .catch((error)=>{
            console.log("chatbot URI not working");
            api.chatbot.connected = false;
            api.chatbot.welcomemsg = "We are not online currently. Let's chat later!";// resp.data;
          });
        //console.log("Chatbot initialisation request sent");
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

    getTasks(workspaceId, projId, userId){
      //console.log('getTasks URL --->> '+ nodeurl + '/api/task/' + userId + '/' + workspaceId + '/' + projId);
      return axios.get(nodeurl + '/api/task/' + userId + '/' + workspaceId + '/' + projId);
    },

    getTasksByAssignee(userId){
      //console.log('getTasks URL --->> '+ nodeurl + '/api/task/' + userId + '/' + workspaceId + '/' + projId);
      return axios.get(nodeurl + '/api/task/' + userId);
    },

    createTask(createTaskInputs){
      return axios.post(nodeurl + '/api/task', createTaskInputs);
    },

    updateTask(updateTaskInputs){
      return axios.put(nodeurl + '/api/task', updateTaskInputs);
    },

    /*deleteTask(deleteTaskInputs){
      console.log('deleteTaskInputs:- ' + JSON.stringify(deleteTaskInputs));
      return axios.delete(nodeurl + '/api/task', deleteTaskInputs);
    },*/

    getComments(taskId){
      return axios.get(nodeurl + '/api/comment/' + taskId);
    },

    createComment(createCommentInputs){
      return axios.post(nodeurl + '/api/comment', createCommentInputs);
    },

    createProject(createProjInputs){
      return axios.post(nodeurl + '/api/project', createProjInputs);
    },

    getWorkspace(workspaceId){
      return axios.get(nodeurl + '/api/workspace/' + workspaceId);
    },

    createWorkspace(createWorkspaceInputs){
      return axios.post(nodeurl + '/api/workspace', createWorkspaceInputs);
    },

    addWorkspaceMember(addWorkspaceMemberInputs){
      console.log('addWorkspaceMemberInputs requests= ' + JSON.stringify(addWorkspaceMemberInputs));
      return axios.put(nodeurl + '/api/workspace', addWorkspaceMemberInputs);
    },

    assignTaskToUser(assignTaskToUserInputs){
      console.log('assignTaskToUserInputs requests= ' + JSON.stringify(assignTaskToUserInputs));
      return axios.put(nodeurl + '/api/task', assignTaskToUserInputs);
    },

    uploadAttachment(formdata){      
      return axios.post(nodeurl + '/api/attachment/' + formdata.get('taskid'), formdata);       
    },

    downloadAttachment(fileid,filename){      
      //return axios.get(nodeurl + '/api/attachment/' + fileid);  

      return axios.get(nodeurl + '/api/attachment/' + fileid, { responseType:"blob" })
        .then(function (response) {
        require('downloadjs')(response.data, filename);
  
      });         
    },

    initialiseChat(){
      
    },

    sendChat(message){
      //return axios.get(nodeurl + '/api/chatbot/' + message);
      console.log("sendChat request: " + JSON.stringify(message));
      var querystring = require('querystring');
      return axios.post(this.chatbot.uri+'/predict', querystring.stringify(message), {withCredentials:false});
    },

}