var socket;
var svg;

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

var params = {
    interation: 5000
};

var FizzyText = function() {
  this.speed = 0.8;
  this.dataHoseToggle = false;
  this.dataHose = function() {
	speed = 50;
	console.log(this.speed);
	};
};


window.onload = function() {
  var text = new FizzyText();	
  var gui = new dat.GUI();
  gui.add(params, 'interation');
  gui.add(text, 'speed');

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

  svg.append("svg:circle")
      .attr("cx", 100)
      .attr("cy", 100)
      .attr("r", data.radius/10)
      .style("opacity", 1)
      .style("stroke", "#"+data.color)
      .style("stroke-width", data.strokewidth)
      .style("stroke-opacity", 1)

    .transition()
      .duration(1000)
      .ease(Math.sqrt)
      .attr("r", 0)
      .style("stroke-opacity", 0)
      .remove();

}
