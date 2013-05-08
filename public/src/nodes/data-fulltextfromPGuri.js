/*global Stats:true*/



$(function(){

  var template =
    '<form class="textform">'+
      '<label><span class="label"><b>Text</b></span> <br />'+
        '<input type="text" class="text" style="width:90%"></input>'+
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
      $.get('/ajax/fullarticletext', {uri: uri}, function(data){
        if(data.error) console.log(data.error);
        else{
          this.$('.text').val(data);
          this.send('text', data);
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
