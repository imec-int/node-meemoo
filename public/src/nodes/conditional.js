// extends src/node-box-native-view.js

$(function(){

  var template = '<div class="info" />';

  Iframework.NativeNodes["conditional"] = Iframework.NodeBoxNativeView.extend({

    template: _.template(template),
    info: {
      title: "Conditional",
      description: "extend me"
    },
    initializeCategory: function() {
    }

  });


});