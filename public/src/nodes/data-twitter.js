/*global Whammy:true*/

$(function(){
  var template = '<center><img src="img/twitter-logo.png" alt="Twitter" width="80%"></center>';


  Iframework.NativeNodes["data-twitter"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "Twitter - 1%",
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
      socket.on('newtweet', function (data) {
        self.sendTweet(data);
        //console.log(data);
      });
    },
    sendTweet: function(tweet){
      this.send("tweets", tweet);
    },
    sendImage: function(url){
      this.send("images", url);
    },
    inputs: {
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
