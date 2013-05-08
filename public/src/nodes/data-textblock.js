/*global Whammy:true*/

$(function(){
  var template =
                 '<form class="textform">'+
                  '<label><span class="label"><b>Text</b></span> <br />'+
                    '<textarea class="text" rows=10 cols=25></textarea>'+
                  '</label>'+
                    '<button class="submit">Submit</button>'+
                  '</form>';



  Iframework.NativeNodes["data-textblock"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "Text Block",
      description: "Enter some text for submission to other modules"
    },
    initializeModule: function(){
      var self = this;
      this.$(".submit")
        .click(function(e){
          e.stopPropagation();
          var text = $('.text').val();
          self.send('text', text);
        });
    },

    inputs: {
    },
    outputs: {
      text: {
        type: "string",
        description: "text from input field"
      }
    }

  });



});
