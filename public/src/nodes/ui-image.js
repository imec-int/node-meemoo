/*global Stats:true*/

// extends src/nodes/time.js which extends src/node-box-native-view.js

$(function(){

  var template =
    '<form class="textform">'+
      '<label><span class="label"></span> '+
        '<img src="/prox?url=http://2.bp.blogspot.com/-V12IHKad5yI/UEUF4ahxWcI/AAAAAAAAAXE/7fsFoty31GI/s1600/wittgenstein_duck_rabbit.jpg" class="image" alt="Twitter" width="128px">'+
      '</label>'+
    '</form>';

  Iframework.NativeNodes["ui-image"] = Iframework.NativeNodes["ui"].extend({

    template: _.template(template),
    info: {
      title: "Image tag",
      description: "a fast image box with a src attribute"
    },
    initializeModule: function(){
      this.$(".button").button();
    },
    inputsrc: function(val){
      this._val = val;
      this.$(".image").attr("src",val);
      this.send("src", this._val);
    },
    inputlabel: function(label){
      this.$(".label").text(label);
    },
    inputs: {
      src: {
        type: "string",
        description: "src of the image"
      },
      label: {
        type: "string",
        description: "label of the image"
      }
    },
    outputs: {
      src: {
        type: "string"
      }
    }

  });


});
