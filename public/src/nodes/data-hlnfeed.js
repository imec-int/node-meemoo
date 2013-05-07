/*global Whammy:true*/

$(function(){
  var template =  '<center><img src="img/hln-logo.png" alt="HLN" height="40%"></center>'+
                  '<form style="display: relative" class="textform">'+
                    '<button class="start">Start</button>'+
                  '</form>';



  Iframework.NativeNodes["data-hlnfeed"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "HLN Feed",
      description: "Gather 'real-time' articles from the HLN syndication feed"
    },
    initializeModule: function(){
      var self = this;
      this.$(".start")
        .click(function(e){
          e.stopPropagation();
          $.post('/rest/hlnfeed/start');
        });
      // init socket to listen to Twitter stream
      var socket = io.connect(window.location.hostname);
      socket.on('newHLNarticle', function (data) {
        self.sendArticle(data);
      });
    },
    sendArticle: function(article){
      this.send("articles", article);
    },
    inputs: {
    },
    outputs: {
      articles: {
        type: "string",
        description: "sends constant stream of HLN articles"
      }
    }

  });



});
