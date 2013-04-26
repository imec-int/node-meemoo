/*global Whammy:true*/

$(function(){
  var template = '<img src="img/twitter-logo.png" alt="Twitter" height="100%" width="100%">';


  Iframework.NativeNodes["data-twitter"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "Twitter",
      description: "Gather real-time data from the Twitter Streaming API"
    },
    initializeModule: function(){
      var self = this;
      this.$(".button")
        .click(function(e){
          self.sendTweet();
        });
      // init socket to listen to Twitter stream
      var socket = io.connect(window.location.hostname);
      // on socket newpicture
      socket.on('newpicture', function (data) {
        self.sendImage(data.url)
      });
    },
    inputbang: function(){
      this.send("bang", "!");
      return false;
    },
    sendTweet: function(){
      this.send("tweets", ""+Math.floor(Math.random()*1024));
    },
    sendImage: function(url){
      this.send("images", url);
    },
    inputs: {
      bang: {
        type: "bang",
        description: "manual input bang"
      }
    },
    outputs: {
      tweets: {
        type: "string",
        description: "sends constant stream of tweets"
      },
      images: {
        type: "string",
        description: "sends constant stream of images"
      }
    }

  });



});
