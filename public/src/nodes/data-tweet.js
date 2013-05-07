/*global Stats:true*/

// extends src/nodes/time.js which extends src/node-box-native-view.js

$(function(){

  var template = 
    '<form class="textform">'+
      '<div><span class="label"><b>Tweet ID</b></span> '+
        '<input type="text" class="tweetId" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>Tweet</b></span> '+
        '<input type="text" class="tweet" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>Timestamp</b></span> '+
        '<input type="text" class="created_at" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>Geo</b></span> '+
        '<input type="text" class="geo" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>Reply to</b></span> '+
        '<input type="text" class="replyTo" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>Retweet of to</b></span> '+
        '<input type="text" class="retweetOf" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>User | ID</b></span> '+
        '<input type="text" class="userId" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>User | Screen Name</b></span> '+
        '<input type="text" class="screen_name" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>User | Name</b></span> '+
        '<input type="text" class="name" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>User | Followers</b></span> '+
        '<input type="text" class="followers_count" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>User | Following</b></span> '+
        '<input type="text" class="friends_count" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>User | Location</b></span> '+
        '<input type="text" class="userLocation" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>User | Time Zone</b></span> '+
        '<input type="text" class="timeZone" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>User | Language</b></span> '+
        '<input type="text" class="userLanguage" style="width:90%"></input>'+
      '</div>'+
      '<div><span class="label"><b>User | Profile image (URL)</b></span> '+
        '<input type="text" class="userImage" style="width:90%"></input>'+
      '</div>'+
    '</form>';

  Iframework.NativeNodes["data-tweet"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "text",
      description: "a text box to save and send text"
    },
    events: {
      "submit .textform": "submit"
    },
    initializeModule: function(){
      this.$(".button").button();
    },
    submit: function(){
      this._val = this.$(".text").val();
      this.inputsend();
      
      this.model.addOutput({name:"test",type:"pol"});
      return false;
    },
    inputtweet: function(twt){
      this._val = twt;
      this.$(".tweetId").val(twt.id);
      this.$(".tweet").val(twt.text);
      this.$(".created_at").val(twt.created_at);
      this.$(".geo").val(twt.geo);
      this.$(".replyTo").val(twt.in_reply_to_status_id);
      if("retweeted_status" in twt)
        this.$(".retweetOf").val(twt.retweeted_status.id);
      else
        this.$(".retweetOf").val("");
      this.$(".userId").val(twt.user.id);
      this.$(".screen_name").val(twt.user.screen_name);
      this.$(".name").val(twt.user.name);
      this.$(".followers_count").val(twt.user.followers_count);
      this.$(".friends_count").val(twt.user.friends_count);
      this.$(".userLocation").val(twt.user.location);
      this.$(".timeZone").val(twt.user.time_zone);
      this.$(".userLanguage").val(twt.user.lang);
      this.$(".userImage").val(twt.user.profile_image_url);
      this.sendTweet(twt)
    },
    sendTweet: function(tweet){
      this.send("tweetId", this.$(".tweetId").val());
      this.send("tweet", this.$(".tweet").val());
      this.send("timestamp", this.$(".timestamp").val());
      this.send("geo", this.$(".geo").val());
      this.send("replyTo", this.$(".replyTo").val());
      this.send("retweetOf", this.$(".retweetOf").val());
      this.send("userId", this.$(".userId").val());
      this.send("screenName", this.$(".screen_name").val());
      this.send("name", this.$(".name").val());
      this.send("followers", this.$(".followers_count").val());
      this.send("following", this.$(".friends_count").val());
      this.send("location", this.$(".userLocation").val());
      this.send("language", this.$(".userLanguage").val());
      this.send("profileImage", this.$(".userImage").val());
    },
    inputs: {
      tweet: {
        type: "string",
        description: "Raw Tweet object (JSON)"
      }
    },
    outputs: {
      tweetId: {
        type: "string"
      },
      tweet: {
        type: "string"
      },
      timestamp: {
        type: "string"
      },
      geo: {
        type: "string"
      },
      replyTo: {
        type: "int"
      },
      retweetOf: {
        type: "int"
      },
      userId: {
        type: "int"
      },
      screenName: {
        type: "string"
      },
      name: {
        type: "string"
      },
      followers: {
        type: "string"
      },
      following: {
        type: "string"
      },
      location: {
        type: "string"
      },
      timeZone: {
        type: "string"
      },
      language: {
        type: "string"
      },
      profileImage: {
        type: "string"
      }
    }

  });


});
