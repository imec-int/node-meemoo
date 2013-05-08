/**
 * Creates and outputs an object where new input fields can be dynamically added.
 * 
**/

$(function(){
  var textId = "text"+Date.now();
  var template = 
    '<form class="textform">'+
      '<label><span class="label"><b>New Field</b></span> '+
        '<input type="text" id="'+textId+'" style="width:90%"></input>'+
      '</label>'+
      '<button class="send" type="submit">Add Field</button>'+
    '</form>';

  Iframework.NativeNodes["data-object"] = Iframework.NativeNodes["data"].extend({

    template: _.template(template),
    info: {
      title: "Dynamic Data object",
      description: "A dynamic object to hold data"
    },
    events: {
      "submit .textform": "submit"
    },
    initializeModule: function(){
      this.$(".button").button();
    },
    inputbang: function(){
      var nModels = this.model.Inputs.models.length;
      var outputObj = {};
      for(inp in this.model.Inputs.models){
        //console.log(this.model.Inputs.models[inp].id+": "+this["_"+this.model.Inputs.models[inp].id])
        if(this.model.Inputs.models[inp].id != "bang")
          outputObj[this.model.Inputs.models[inp].id] = this["_"+this.model.Inputs.models[inp].id];
      }
      if(outputObj != {})
        this.sendobject(outputObj);
      return false;
    },
    submit: function(){
      this._val = this.$("#"+textId).val();
      //this.inputsend();
      var toObj = {type:"string"};
      toObj.name = this.$("#"+textId).val();
      this.model.addInput(toObj);
      this.$("#"+textId).val("");
      return false;
    },
    sendobject: function(obj){
      /*console.log("sending: ");
      console.log(obj);
      console.log("");*/
      this.send("object", obj);
    },
    inputs: {
      bang: {
        type: "bang",
        description: "Outputs the object"
      }
    },
    outputs: {
      object: {
        type: "object"
      }
    }

  });


});
