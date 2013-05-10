/*global Stats:true*/



$(function(){

  var template =
    '<form class="textform">'+
      '<label><span class="label"><b>Text</b></span> <br />'+
        '<textarea class="text" rows=10 cols=25></textarea>'+
      '</label>'+
    '</form>';

  Iframework.NativeNodes["data-fulltextfromPGuri"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "fulltextfromPGuri",
      description: "retrieves the full text of an article, given its uri as an input"
    },
    initializeModule: function(){

    },
    inputuri: function(uri){
      var that = this;
      $.get('/ajax/fullarticletext', {uri: uri}, function(data){
        if(data.error) console.log(data.error);
        else{
          $('.text').val(data.text);
          that.send('text', data.text);
        }
      });
    },

    inputs: {
      uri: {
        type: "string",
        description: "article uri"
      }
    },
    outputs: {
      text: {
        type: "string",
        description: "full article text"
      }
    }

  });


});
