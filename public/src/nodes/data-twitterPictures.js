/*global Whammy:true*/

$(function(){
  var countId = "count"+Date.now();

  var template =  '<center ><img src="img/twitter-logo.png" alt="Twitter" width="60%"></center>'+
                  '<span id="'+countId+'" style="position: absolute;top: 3px;right: 3px;color: #27729B;">0</span>'


  Iframework.NativeNodes["data-twitterPictures"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "Twitter - Pictures",
      description: "Gather real-time images from the Twitter Streaming API"
    },
    initializeModule: function(){
      var self = this;
      $.post("/startOnepercentImages", {}, function(dat){
          console.log(dat);
        });
      // init socket to listen to Twitter stream
      var socket = io.connect(window.location.hostname);
      // on socket newpicture
      socket.on('newpicture', function (data) {
        self.sendImage(data["url"]);
        var cnt = parseInt($("#"+countId).text());
        $("#"+countId).text(cnt+1);
        //console.log(data);
      });
    },
    sendImage: function(url){
      this.send("images", url);
    },
    inputs: {
    },
    outputs: {
      images: {
        type: "string",
        description: "sends constant stream of images"
      }
    }

  });



});
