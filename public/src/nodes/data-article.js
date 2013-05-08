/*global Stats:true*/

// extends src/nodes/time.js which extends src/node-box-native-view.js

$(function(){

  var template =
    '<form class="textform">'+
      '<label><span class="label"><b>ID</b></span> <br />'+
        '<input type="text" class="id" style="width:90%"></input>'+
      '</label>'+
      '<label><span class="label"><b>Title</b></span><br /> '+
        '<input type="text" class="title" style="width:90%"></input>'+
      '</label>'+
      '<label><span class="label"><b>Uri</b></span><br /> '+
        '<input type="text" class="uri" style="width:90%"></input>'+
      '</label>'+
      '<label><span class="label"><b>Creation Date</b></span> '+
        '<input type="text" class="creationDate" style="width:90%"></input>'+
      '</label>'+
      '<label><span class="label"><b>Introduction</b></span><br /> '+
        '<input type="text" class="introduction" style="width:90%"></input>'+
      '</label>'+
      '<label><span class="label"><b>Image Url</b></span><br /> '+
        '<input type="text" class="image" style="width:90%"></input>'+
      '</label>'+
    '</form>';

  Iframework.NativeNodes["data-article"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "Article",
      description: "Represents an article object"
    },
    initializeModule: function(){

    },
    inputarticle: function(article){
      this._val = article;
      for(var key in article){
        this.$("." + key).val( article[key] );


        this.model.addOutput({name:key,type:"string"});
      }
      this.sendArticle(article)
    },
    sendArticle: function(article){
      for(var key in article){
        this.send(""+key, this.$("."+key).val());
      }
    },
    inputs: {
      article: {
        type: "string",
        description: "Raw Article object (JSON)"
      }
    },
    outputs: {
      id: {
        type: "string"
      },
      title: {
        type: "string"
      },
      uri: {
        type: "string"
      },
      creationDate: {
        type: "string"
      },
      introduction: {
        type: "string"
      },
      image: {
        type: "string"
      }
    }

  });


});
