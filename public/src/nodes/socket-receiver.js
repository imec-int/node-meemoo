/*global Whammy:true*/

$(function(){
  var countId = "count"+Date.now();
  var textId = "text"+Date.now();
  var currentId = "current"+Date.now();
  var template =  '<center ><img src="img/sockets.png" title="HTML5 sockets" alt="HTML5 sockets" width="40%"></center>'+
                  '<span id="'+countId+'" style="position: absolute;top: 3px;right: 3px;color: #27729B;">0</span>'+
                  '<form class="textform">'+
                    '<label><span class="label"><b>Change Listening channel</b></span> '+
                      '<input type="text" id="'+textId+'" style="width:90%"></input>'+
                    '</label>'+
                    '<button class="send">update</button>'+
                    '<p style="font-size:9px">Listening to socket: <br /><span style="font-size: 12px; font-weight:bold; color:#05072D" id="'+currentId+'"></span></p>'+
                  '</form>';
  var socket;
  var self;
  Iframework.NativeNodes["socket-receiver"] = Iframework.NativeNodes["socket"].extend({

    template: _.template(template),
    info: {
      title: "Socket receiver",
      description: "Listens to a given socket"
    },
    events: {
      "submit .textform": "submit"
    },
    initializeModule: function(){
      self = this;
      // init socket to listen to Twitter stream
      socket = io.connect(window.location.hostname);
      // on socket newpicture
      //socket.on('newtweet', this.onSocket);
    },
    onSocket: function(data){
      //console.log(data);
      var cnt = parseInt($("#"+countId).text());
      $("#"+countId).text(cnt+1);
      self.send("output",data);
    },
    submit: function(){

      this._val = this.$("#"+textId).val();
      //console.log(this._val);
      this.$("#"+currentId).text(this._val);
      this.$("#"+textId).val("");
      //change socket
      socket.removeAllListeners();
      socket.on(this._val, this.onSocket);
      $("#"+countId).text(0);

      return false;
    },
    inputs: {
    },
    outputs: {
      output: {
        type: "string",
        description: "output of a certain websocket"
      },
    }

  });


});