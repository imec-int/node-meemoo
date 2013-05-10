/**
 * Emits a given object/value/string to a certain socket.
 * 
**/

$(function(){
  var textId = "text"+Date.now();
  var countId = "count"+Date.now();
  var currentId = "current"+Date.now();
  var template = 
    '<center ><img src="img/sockets.png" title="HTML5 sockets" alt="HTML5 sockets" width="40%"></center>'+
    '<span id="'+countId+'" style="position: absolute;top: 3px;right: 3px;color: #27729B;">0</span>'+
    '<form class="textform">'+
      '<label><span class="label"><b>Change emitting channel</b></span> '+
        '<input type="text" id="'+textId+'" style="width:90%"></input>'+
      '</label>'+
      '<button class="send">Add Field</button>'+
      '<p style="font-size:9px">Emitting on socket: <br /><span style="font-size: 12px; font-weight:bold; color:#05072D" id="'+currentId+'"></span></p>'+
    '</form>';

  var socket;

  Iframework.NativeNodes["socket-emitter"] = Iframework.NativeNodes["socket"].extend({

    template: _.template(template),
    info: {
      title: "Socket emitter",
      description: "Emits an input to a given socket"
    },
    events: {
      "submit .textform": "submit"
    },
    initializeModule: function(){
      var self = this;
      // init socket
      socket = io.connect(window.location.hostname);
    },
    inputobject: function(obj){
      var channel = $("#"+currentId).text();
      //console.log("input obj to "+channel);
      //console.log(obj);
      if(channel && channel != ""){
        socket.emit("message",{channel:channel, data:obj});
        var cnt = parseInt($("#"+countId).text());
        $("#"+countId).text(cnt+1);
      }
      return false;
    },
    inputstring: function(string){
      var channel = $("#"+currentId).text();
      //console.log("input string to "+channel);
      //console.log(string);
      if(channel && channel != ""){
        socket.emit("message",{channel:channel, data:string});
        var cnt = parseInt($("#"+countId).text());
        $("#"+countId).text(cnt+1);
      }
      return false;
    },
    inputvalue: function(value){
      var channel = $("#"+currentId).text();
      //console.log("input string to "+channel);
      //console.log(string);
      if(channel && channel != ""){
        socket.emit("message",{channel:channel, data:value});
        var cnt = parseInt($("#"+countId).text());
        $("#"+countId).text(cnt+1);
      }
      return false;
    },
    submit: function(){

      this._val = this.$("#"+textId).val();
      console.log(this._val);
      this.$("#"+currentId).text(this._val);
      this.$("#"+textId).val("");
      $("#"+countId).text(0);
      return false;
    },
    inputs: {
      object: {
        type: "object",
        description: "Object to emit"
      },
      string: {
        type: "string",
        description: "String to emit"
      },
      value: {
        type: "float",
        description: "Value to emit"
      }
    },
    outputs: {
      
    }

  });


});
