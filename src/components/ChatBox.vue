<template>
    <div>

      <!--<div id="ChatBox">
        <div class="col-md-9 ChatBox__Left">
            <div class="ChatBox__List">
                <chat-message v-for="message in messages" :data="message"></chat-message>
            </div>

            <div class="ChatBox__Input">
                <form @submit="sendMessage" action="/" method="post">
                    <input type="text" v-model="newMessage" placeholder="Enter your message here">
                </form>
            </div>
        </div>
      </div>-->

      <div id="chat">
    <div id="conversation">
      <div id="message-line" v-for="message in messages">
        <div id="message" :class="message.from">{{message.txt}}</div>
      </div>
    </div>
    <div id="texting">
      <input v-model="newMessage" v-on:keyup.enter="sendMessage(newMessage)" placeholder="Say something" type="text">
      <!--<input type="button" v-on:click="sendMessage(newMessage)"  value="Send">-->
    </div>
  </div>
    

   
        
    </div>
</template>

<script>
    //import ChatMessage from './ChatMessage.vue'
    import api from '../utils/api'

    export default {
        //components: { ChatMessage },
        data() {
            return {
                newMessage: '',
                messages: [],
                onlineUsers: [],
                socket: null,

                snackbar: true,
                y: 'bottom',
                x: 'right',
                mode: 'multi-line',
                timeout: 0,
                text: 'Hello, I\'m a snackbar'
            }
        },
        ready() {
            this.socket = io();
            let chatbox = this
            this.socket.on('message received', function(message) {
                chatbox.messages.push(message)
            })
            this.socket.on('user joined', function(message) {
                chatbox.messages.push(message)
                chatbox.onlineUsers.push(message.username)
            })
            this.socket.on('user left', function(message) {
                chatbox.messages.push(message)
                chatbox.onlineUsers.$remove(message.username)
            })
        },
        methods: {
            sendMessage(event) {
                //event.preventDefault()
                //this.socket.emit('send message', this.newMessage)                
                //this.newMessage = ''
                this.messages.push({from:"me",txt:this.newMessage});
                var newMessage = this.newMessage;
                this.newMessage = '';
                api.sendChat(newMessage)
                    .then((resp)=>{
                        console.log('sendChat resp-> ' + JSON.stringify(resp.data));
                        this.messages.push({from:"bot",txt:resp.data.msg});

                        //var element = document.getElementById("conversation");
                        //element.scrollTop = element.scrollHeight;

                        var out = document.getElementById("conversation");
                        // allow 1px inaccuracy by adding 1
                        var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;

                        if(isScrolledToBottom)
                            out.scrollTop = out.scrollHeight - out.clientHeight;
                    });

            },
            kickUser(event) {
                event.preventDefault()
                // Get the username of the user we're kicking
                let usernameToKick = event.target.getAttribute('data-username')
                // Tell the server to kick them from the chat
                this.socket.emit('kick user', usernameToKick)
            }
        },
        computed: {
            // Surely there must be a better way to do this? @TODO
            isAdmin() {
                return this.isAdmin
            }
        }
    }
</script>

<style>
    /* Start Chat TAG */
#chat{
  position:fixed;
  right:0;
  bottom:0;
  display:inline-block;
  box-shadow: 2px 2px 5px black;
  width:200px;
  height:360px;
  background-color:#eee;
  border: 1px solid #fff;
}
/* End Chat TAG */

/* Start Conversation TAG */
#conversation{
  display:block;
  width:100%;
  height:310px;
  overflow:auto;
  background-color:#eee;
}
/* End Conversation TAG */

/* Start Texting TAG */
#texting{
  display:block;
  text-align:center;
  padding:10px;
}
/* End Texting TAG */

/* Start message TAG */
#message-line{
  position:relative;
  display:block;
  width:100%;
  min-height:40px;
}

#message{
  display:block;
  float:left;
  max-width:80%;
  padding:5px 10px;
  margin:5px;
  color:#fff;
  background-color:#00c6da;
  border-radius:10px;
}

.message.me{
  float:right;
  background-color:#EE4622;
}
/* End message TAG */

</style>