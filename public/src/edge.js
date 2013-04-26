$(function(){

  Iframework.Edge = Backbone.Model.extend({
    defaults: {
      source: [0, "default"], 
      target: [0, "default"]
    },
    initialize: function () {
    },
    initializeView: function () {
      this.view = new Iframework.EdgeView({model:this});
      return this.view;
    },
    Source: null,
    Target: null,
    connectTryCount: 5,
    connected: false,
    connect: function () {
      // Called from graph.connectEdges()
      try {
        this.Source = this.graph.get("nodes").get( this.get("source")[0] ).Outputs.get( this.get("source")[1] );
        this.Target = this.graph.get("nodes").get( this.get("target")[0] ).Inputs.get( this.get("target")[1] );
      } catch (e) {
        console.warn("Edge source or target port not found, try #"+this.connectTryCount+": "+this.toString());
        if (this.connectTryCount > 0) {
          this.connectTryCount--;
          var self = this;
          _.delay(function(){
            self.connect();
          }, 1000);
        }
        return false;
      }
      if (!this.Source || !this.Target) {
        return false;
      }
      this.Source.connect(this);
      this.Target.connect(this);
      this.Source.node.receive({
        connect: { 
          source: [this.Source.node.id, this.Source.id],
          target: [this.Target.node.id, this.Target.id]
        }
      });
      if (this.graph.view) {
        this.graph.view.addEdge(this);
      }
      if (this.Target.node.view && this.Target.node.view.Native) {
        this.Target.node.view.Native.connectEdge(this);
      }
      this.connected = true;

      // Set up listener
      // var sourceNode = this.graph.get("nodes").get( this.get("source")[0] );
      this.Source.node.on( "send:"+this.Source.id, this.send, this );

      return this;
    },
    send: function (value) {
      this.Target.node.receive( this.Target.id, value );
    },
    disconnect: function () {
      // Called from graph.removeEdge()
      if (this.Source && this.Target) {
        this.Source.disconnect(this);
        this.Target.disconnect(this);
        this.Source.node.receive({
          disconnect: { 
            source: [this.Source.node.id, this.Source.id],
            target: [this.Target.node.id, this.Target.id]
          }
        });
        if (this.Target.node.view && this.Target.node.view.Native) {
          this.Target.node.view.Native.disconnectEdge(this);
        }
      }
      if (this.view) {
        this.view.remove();
      }

      // Remove listener
      this.Source.node.off( "send:"+this.Source.id, this.send, this );

      this.connected = false;
    },
    remove: function(){
      this.graph.removeEdge(this);
    },
    toString: function(){
      return this.get("source")[0]+":"+this.get("source")[1]+"->"+this.get("target")[0]+":"+this.get("target")[1];
    }
  });
  
  Iframework.Edges = Backbone.Collection.extend({
    model: Iframework.Edge
  });

});
