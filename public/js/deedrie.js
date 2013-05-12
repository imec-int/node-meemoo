var socket;
var svg;
var params = {
    impact: 10,
    duration: 1000,
    fattyness: 10
};

$(function(){
	// init socket
	socket = io.connect(window.location.hostname);
	// listen to socket
	socket.on('tweets', onSocket);

	//init packery
	// $('#container').packery();
	var w = 1920,
    h = 1080,
   // z = d3.scale.category20c(),
    i = 0;
    impact=10;
	svg = d3.select("#container").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .style("pointer-events", "all");
});



function onSocket(data){
	//console.log(data.followers);
	addTwarticle(data);
};


///DAT.gui stuff



var FizzyText = function() {
  //this.impact = 10;
  this.dataHoseToggle = false;
  this.dataHose = function() {
	//impact = 50;
	console.log(params.impact);
	};
};


window.onload = function() {
  var text = new FizzyText();	
  var gui = new dat.GUI();
  //gui.add(params, 'impact');
  //gui.add(text, 'speed');
  var controller = gui.add(params, 'impact', 1, 20);
  controller.onChange(function(value) {
	  // Fires on every change, drag, keypress, etc.
	  params.impact = value;
  });
  var DurController = gui.add(params, 'duration', 100, 2000);
  DurController.onChange(function(value) {
	  // Fires on every change, drag, keypress, etc.
	  params.duration = value;
  });
  var FatController = gui.add(params, 'fattyness', 1, 20);
  FatController.onChange(function(value) {
	  // Fires on every change, drag, keypress, etc.
	  params.fattyness = value;
  });


};

function packeryTweet(data) {
	console.log(data);
	if (data.followers > 100) {
		$('#container').append('<div class="item w2">' + data.tweet + '</div>');
		// var item = '<div class="item w2">' + data.tweet + '</div>'
	} else {
		$('#container').append('<div class="item">' + data.tweet + '</div>');
		// var item = '<div class="item>' + data.tweet + '</div>'
	}
	// $('#container').append(item)
	// 	.packery( 'appended', item );

	$('#container').packery();
}

function addTwarticle(data) {

  //var m = d3.svg.mouse(this);
console.log(impact)
  svg.append("svg:circle")
      .attr("cx", 1800)
      .attr("cy", 500)
      .attr("r", data.radius/params.impact)
      .style("opacity", 1)
      .style("stroke", "#"+data.color)
      .style("stroke-width", data.strokeWidth/params.fattyness)
      .style("stroke-opacity", 1)
    .transition()
      .duration(params.duration)
      .ease(Math.sqrt)
      .attr("r", 0)
      .attr("cx", 100)
      .style("stroke-opacity", 0)
      .remove();

}
