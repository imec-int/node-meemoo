

$(function(){

  var template =
  '<form class="textform">'+
      '<label><span class="label"><b>Fill Ratio</b></span> '+
        '<input type="text" class="fillrate" style="width:30%"></input>'+
      '</label>'+
  '</form>';

  Iframework.NativeNodes["time-buffer"] = Iframework.NativeNodes["time"].extend({

    template: _.template(template),
    info: {
      title: "buffer",
      description: "buffers up to size values and emits them at rate/s"
    },
    initializeModule: function(){
    },
    _data: [],
    _ms: 500,
    _length: 50,
    _intervalHandle: 0,
    inputsize: function(size){
      this._length = size;
    },
    inputdata: function (data) {
      this._data.unshift(data);
      if (this._data.length > this._length) {
        // drop oldest stuff
        this._data.pop();
      }
    },
    inputrate: function (rate) {
      this._ms = Math.round(1000.0 / rate);
      if(this._intervalHandle)
        clearInterval(this._intervalHandle);
      var that = this;
      this._intervalHandle = setInterval(function(){
        that.$(".fillrate").val( that._data.length + '/' + that._length);
        var lastElem = that._data.pop();
        if(lastElem)
          that.send("data", lastElem);
      }, this._ms);
    },

    inputs: {
      data: {
        type: "all",
        description: "data to hold"
      },
      size: {
        type: "int",
        description: "maximum buffer size",
        "default": 50
      },
      rate: {
        type: "float",
        description: "emitting rate/s",
        "default": 2.0
      }
    },
    outputs: {
      data: {
        type: "all"
      }
    }

  });


});
