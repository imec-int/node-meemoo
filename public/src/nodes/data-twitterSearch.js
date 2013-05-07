/*global Whammy:true*/

$(function(){
  var template =  '<center ><img src="img/twitter-logo.png" alt="Twitter" width="60%"></center>'+
                  '<span class="count" style="position: absolute;top: 3px;right: 3px;color: #27729B;">0</span>'+
                  '<form style="display: relative" class="textform">'+
                    '<label><span style="font-size: 9px; color:#555" class="label">Hashtags/keywords (comma-seperated)</span> '+
                      '<input type="text" class="text" style="width:90%"></input>'+
                    '</label>'+
                    '<button class="update">Update</button>'+
                  '</form>';


  Iframework.NativeNodes["data-twitterSearch"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "Twitter - Hashtags",
      description: "Gather real-time data from the filtered Twitter Streaming API based on hashtags"
    },
    initializeModule: function(){
      var self = this;
      this.$(".update")
        .click(function(e){
          e.stopPropagation();
          alert("OOOOH NOOOO, You clicked the button!");
          
        });
      // init socket to listen to Twitter stream
      var socket = io.connect(window.location.hostname);
      // on socket newpicture
      socket.on('newtweetsearch', function (data) {
        self.sendTweet(data);
        var cnt = parseInt($('.count').text());
        $('.count').text(cnt+1);
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
