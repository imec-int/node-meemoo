/*global Stats:true*/

var debug;
$(function(){
  var textId = "text"+Date.now();
  var checkId = "check"+Date.now();
  var template = 
    '<form class="textform">'+
      '<p style="font-size:9px">Checking on: <br /><span style="font-size: 12px; font-weight:bold; color:#05072D" id="'+checkId+'">mix</span></p>'+
      '<label><span class="label">Input String</span> '+
        '<input id="'+textId+'" type="text" class="text" style="width:90%" disabled></input>'+
      '</label>'+
    '</form>';

  Iframework.NativeNodes["conditional-contains"] = Iframework.NativeNodes["conditional"].extend({

    template: _.template(template),
    info: {
      title: "Contains condition",
      description: "Checks if a given string contains a word (and outputs that string if check is succeeded)"
    },
    initializeModule: function(){
      this._case = true;
    },
    inputstring: function(val){
      this._val = val;
      this.$("#"+textId).val(val);
      var check = this.$("#"+checkId).text();

      var input = val;
      if(!this._case){
        input = val.toLowerCase();
        check = check.toLowerCase();
      }
      
      if(val.length == 0){
        // if string is empty: turn white
        $("#"+textId).css("background-color","#FFF");
      }else if(input.indexOf(check)>-1){
        // if check succeeds: turn green
        $("#"+textId).css("background-color","#CAE7B6");
        this.send("string",val);
      }else if(input.indexOf(check)==-1){
        // if check fails: turn red
        $("#"+textId).css("background-color","#E0A8A3");
      }
      console.log(this._case);
    },
    inputcheck: function(val){
      this._check = val;
      this.$("#"+checkId).text(val);
    },
    inputcase: function(val){
      this._case = val;
    },
    inputs: {
      string: {
        type: "string",
        description: "manual input of text"
      },
      check: {
        type: "string",
        description: "word on which you want to check",
        "default": "mix"
      },
      case: {
        type: "boolean",
        description: "Case-sensitive checking",
        "default": "true"
      }
    },
    outputs: {
      string: {
        type: "string"
      }
    }

  });


});
