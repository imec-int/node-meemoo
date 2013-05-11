/*global Whammy:true*/

$(function(){
  var countId = "count"+Date.now();
  var template =  '<center><img src="img/rss.gif" alt="RSS" height="30%"></center>'+
                  '<span id="'+countId+'" style="position: absolute;top: 3px;right: 3px;color: #27729B;">0</span>'+
                  '<form style="display: relative" class="textform">'+
                    '<input type="text" id="feed" style="width:100%;" value="http://www.demorgen.be/rss.xml"><br/>'+
                    '<center><button class="start">Start/Update</button></center>'+
                  '</form>';



  Iframework.NativeNodes["data-RSSfeed"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "RSS Feed",
      description: "Gather 'real-time' articles from an RSS feed"
    },
    initializeModule: function(){
      var self = this;
      this.$(".start")
        .click(function(e){
          e.stopPropagation();
          var action = $(this).text();
          if(action.indexOf('/') >= 0) action = 'start'; // start/update -> start
          $.post('/ajax/rss/' + action.toLowerCase(), {feed: $('#feed').val()});
          if(action === 'start'){
            $(this).text('Stop');
          }else{
            $(this).text('Start/Update');
          }
        });
      // init socket to listen to Twitter stream
      var socket = io.connect(window.location.hostname);
      socket.on('newRSSarticle', function (data) {
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
        description: "sends constant stream of RSS articles"
      }
    }

  });



});
