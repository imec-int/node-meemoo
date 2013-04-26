// extends src/node-box-native-view.js

$(function(){

  var template = '<div class="info" />';

  Iframework.NativeNodes["data"] = Iframework.NodeBoxNativeView.extend({

    template: _.template(template),
    info: {
      title: "data",
      description: "extend me"
    },
    initializeCategory: function() {
    }

  });


});
