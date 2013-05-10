/*global Whammy:true*/

$(function(){
  var TRACKT_HRESHOLD = 200;

  var countId = "count"+Date.now();

  var template =  '<center ><img src="img/twitter-logo.png" alt="Twitter" width="60%"></center>'+
                  '<span id="'+countId+'" style="position: absolute;top: 3px;right: 3px;color: #27729B;">0</span>'+
                  '<form style="display: relative" class="textform">'+
                    '<label><span style="font-size: 9px; color:#555" class="label">Hashtags/terms (comma-seperated)</span> '+
                      '<input id="hashtags" type="text" class="text" style="width:90%"></input>'+
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
          var data = {
            hashtags:$('#hashtags').val()
          };
          $.post("/startSearch", data, function(dat){
            console.log(dat);
          });
        });
      // init socket to listen to Twitter stream
      var socket = io.connect(window.location.hostname);
      // on socket newpicture
      socket.on('newtweetsearch', function (data) {
        self.sendTweet(data);
        var cnt = parseInt($("#"+countId).text());
        $("#"+countId).text(cnt+1);
        //console.log(data);
      });
    },
    inputterms: function(terms){
      var totalArray = [];
      // check existing terms
      var old = $('#hashtags').val();
      var oldArray = old.split(",");
        // trim terms
        for(t in oldArray){
          var n = oldArray[t].trim();
          if (/^[0-9A-Za-z]+$/.test(n))
              totalArray.push(n);
        }
      // check new terms
      var newArray = terms.split(",");
        // trim terms remove non-alphanumeric
        for(t in newArray){
          var n = newArray[t].trim();
          if (/^[0-9A-Za-z]+$/.test(n)){
            // check for doubles
            if($.inArray(n,totalArray) == -1)
              totalArray.push(n);
          }
        }

      // if terms reach a certain threshold, delete the older ones

      var totalString = totalArray.join();

      $('#hashtags').val(totalString);

      //$('#hashtags').val(terms);
      $.post("/startSearch", {hashtags: totalString}, function(dat){
        console.log(dat);
      });
    },
    sendTweet: function(tweet){
      this.send("tweets", tweet);
    },
    sendImage: function(url){
      this.send("images", url);
    },
    inputs: {
      terms: {
        type: "string",
        description: "list of terms (comma separated)"
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
