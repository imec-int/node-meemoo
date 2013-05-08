/*global Stats:true*/



$(function(){

  var template =
    '<form class="textform">'+
      '<label><span class="label"><b>Tags</b></span> <br />'+
        '<input type="text" class="tags" style="width:90%"></input>'+
      '</label>'+
    '</form>';

  Iframework.NativeNodes["data-taggenerator"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "TagGenerator",
      description: "generates tags from text"
    },
    initializeModule: function(){

    },
    inputtext: function(text){
      var that = this;
      $.post('/ajax/generatetagsfromtext', {text: text}, function(data){
        if(data.error) console.log(data.error);
        else{
          data = JSON.parse(data).join(',');
          $('.tags').val(data);
          that.send('tags', data);
        }
      });
    },

    inputs: {
      text: {
        type: "string",
        description: "full text"
      }
    },
    outputs: {
      tags: {
        type: "string",
        description: "tags (comma separated)"
      }
    }

  });


});
