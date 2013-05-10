/*global Stats:true*/



$(function(){
  var tagsId = "text"+Date.now();
  var template =
    '<form class="textform">'+
      '<select name= "menu"id= "menu">'+
        '<option value= "openCalais">openCalais</option>'+
        '<option value= "keywords">keywords</option>'+
        '<option value= "category">category</option>'+
        '<option value= "concepts">concepts</option>'+
        '<option value= "namedEntities">namedEntities</option>'+
        '<option value= "semiTags">semiTags</option>'+
      '<label><span class="label"><b>Tags</b></span> <br />'+
        '<input type="text" id="'+tagsId+'" style="width:90%"></input>'+
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
      var preferred = $('select').find('option:selected').val();
      $.post('/ajax/generatetagsfromtext/'+preferred, {text: text}, function(data){
        if(data.error) console.log(data.error);
        else{
          data = JSON.parse(data).join(',');
          $('#'+tagsId).val(data);
          that.send('tags', data);
          return false;
        }
      });

      // temp: return random word
      // var terms = text.split(" ");
      // if (terms.length>0){

      //   var rnd = Math.floor(Math.random()*terms.length);
      //   $('#'+tagsId).val(terms[rnd]);
      //   that.send('tags', terms[rnd]);
      // }
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
