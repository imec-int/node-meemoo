// extends src/node-box-native-view.js

$(function(){

  var template = '<div class="info" />';

  Iframework.NativeNodes["socket"] = Iframework.NodeBoxNativeView.extend({

    template: _.template(template),
    info: {
      title: "Socket",
      description: "extend me"
    },
    initializeCategory: function() {
    }

  });


});
