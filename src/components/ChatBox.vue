<template>
    <div>      

      <div id="chat">
    <div id="conversation">
      <div id="message-line" v-for="message in messages">
        <div id="message" :class="message.from"><span v-html="message.txt"></span></div>
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
                messages: [{from:'bot', txt:api.chatbot.welcomemsg}],
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
                var newMessage = {passage:this.newMessage};
                this.newMessage = '';
                var flightsarray = [];
                api.sendChat(newMessage)
                    .then((resp)=>{
                        console.log('sendChat resp-> ' + JSON.stringify(resp.data));
                        var bot_reply = resp.data['Question: '];
                        if(bot_reply==null){ 
                          bot_reply='OK, I will send you some flights to choose from.'
                          //End of conversation! Call 3rd party Flights API.
                          var fromcity = resp.data['From where do you want to leave?'].answer;
                          var tocity = resp.data['Where do you want to go?'].answer;
                          var passengers = resp.data['How many tickets do you want?'].answer;
                          var traveldate = resp.data['When do you want to depart?'].answer;
                          api.getFlights(fromcity,tocity,passengers,traveldate)
                            .then((flightresp)=>{
                              //console.log('getFlights resp-> '+JSON.stringify(flightresp.data));
                              flightresp.data.data.map((flightdata)=>{
                                var flightarrayEntry = '';
                                flightdata.route.map((route)=>{
                                  flightarrayEntry += route.cityFrom + ' to ' + route.cityTo + ' (' + route.airline+' '+route.flight_no +') <br/>';
                                });
                                flightarrayEntry += 'Price:- USD ' + flightdata.price;
                                flightsarray.push(flightarrayEntry);

                                this.messages.push({from:"bot",txt:flightarrayEntry});
                              });



                            });

                        }
                        this.messages.push({from:"bot",txt:bot_reply});

                        var element = document.getElementById("conversation");
                        element.scrollTop = element.scrollHeight;

                        
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
  width:400px;
  height:420px;
  background-color:#eee;
  border: 1px solid #fff;
}
/* End Chat TAG */

/* Start Conversation TAG */
#conversation{
  display:block;
  width:100%;
  height:370px;
  overflow:auto;
  background-color:#eee;
}
/* End Conversation TAG */

/* Start Texting TAG */
#texting{
  display:block;
  text-align:center;
  padding:10px;
  background-color:#FBFBFB;
}
#texting * {width:100%;}
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
  max-width:80%;
  padding:5px 10px;
  margin:5px;
  color:#fff;
  border-radius:10px;
}

.bot{
  float:left;
  max-width:80%;
  background-color:#00c6da;
}

.me{
  float:right;
  max-width:80%;
  background-color:#ee591f;
}
/* End message TAG */

</style>