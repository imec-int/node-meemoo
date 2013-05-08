/*global Whammy:true*/

$(function(){
  var countId = "count"+Date.now();
  var template =  '<center><img src="img/hln-logo.png" alt="HLN" height="40%"></center>'+
                  '<span id="'+countId+'" style="position: absolute;top: 3px;right: 3px;color: #27729B;">0</span>'+
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
          var action = $(this).text();
          $.post('/ajax/hlnfeed/' + action.toLowerCase());
          if(action === 'Start'){
            $(this).text('Stop');
          }else{
            $(this).text('Start');
          }
        });
      // init socket to listen to Twitter stream
      var socket = io.connect(window.location.hostname);
      socket.on('newHLNarticle', function (data) {
        var cnt = parseInt($("#"+countId).text());
        $("#"+countId).text(cnt+1);
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
