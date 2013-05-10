// extends src/nodes/util.js which extends src/node-box-native-view.js

$(function(){

  Iframework.NativeNodes["util-convert-int2float"] = Iframework.NativeNodes["util"].extend({

    info: {
      title: "convert int 2 float",
      description: "so you can use it to connect other outlets"
    },
    initializeModule: function(){
    },
    _float: 0.0,
    inputint: function(){
      this.send("float", this);
      this._triggerRedraw = true;
    },
    inputs: {
      _int: {
        type: "int",
        description: "data to convert"
      }
    },
    outputs: {
      _float: {
        type: "float"
      }
    }

  });


});
