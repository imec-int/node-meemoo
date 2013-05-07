/*global Stats:true*/

// extends src/nodes/time.js which extends src/node-box-native-view.js

$(function(){

  var template = 
    '<form class="textform">'+
      '<label><span class="label"><b>Tweet</b></span> '+
        '<input type="text" class="tweet" style="width:90%"></input>'+
      '</label>'+
      '<button class="send" type="submit">send</button>'+
    '</form>';

  Iframework.NativeNodes["data-object"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "Dynamic Data object",
      description: "A dynamic obje'ct to hold data"
    },
    events: {
      "submit .textform": "submit"
    },
    initializeModule: function(){
      this.$(".button").button();
    },
    submit: function(){
      this._val = this.$(".text").val();
      //this.inputsend();
      
      this.model.addInput({name:this._val,type:"string"});
      return false;
    },
    inputtweet: function(twt){
      this._val = twt;
      this.$(".tweet").val(twt.text);
      this.$(".user").val(twt.user.screen_name);
      this.sendTweet(twt)
    },
    sendTweet: function(tweet){
      this.send("text", tweet.text);
      this.send("user", tweet.user.screen_name);
    },
    inputs: {
      tweet: {
        type: "string",
        description: "manual input of text"
      }
    },
    outputs: {
      text: {
        type: "string"
      },
      user: {
        type: "string"
      }
    }

  });


});
