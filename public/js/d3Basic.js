var socket;

var width = 1280,
    height = 620;

var debug;
var users;

var svg;

var tweets = [];

var minDate,
	maxDate;

$(function(){
	// init socket
	socket = io.connect(window.location.hostname);
	// listen to socket
	socket.on('tweets', onSocket);
});

function onSocket(data){
	//console.log(data);
	data["timestamp"] = new Date(data["timestamp"]);
	data["followers"] = parseInt(data["followers"]);
	
	tweets.push(data);
	if(tweets.length == 1)
		init();
	draw();
	//rescale();
}

function init(){
	minDate = tweets[0]["timestamp"].getTime();
    maxDate = minDate + 360000;

	svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
	.append("g")
		.attr("transform", "translate(" + 20 + "," + 20 + ")");

	xScale = d3.time.scale()
		.domain([minDate, maxDate])
		.range([0, width]);

	xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom')
		.ticks(15)
		.tickFormat(d3.time.format('%H:%M'))
		.tickSize(0)
		.tickPadding(8);

	yAxis = d3.svg.axis()
	    .ticks(1000)
	    .orient('left')
	    .tickPadding(8);
}

function draw(){
	var tweet = svg.selectAll(".tweet")
      .data(tweets)
    .enter().append("circle")
      .attr("id", function(d) { return d["tweet_id"]})
      .attr("class", "tweet")
      .attr("r", function(d) { return 3})
      //.attr("cx", function(d) { return getTimeinMinutes(d)})
      .attr("cx", function(d) { return xScale(d["timestamp"])})
      .attr("cy", function(d) { return Math.min(1000, d["followers"])})
      .style("fill", function(d) {
        return "rgba(0,0,255,0.8)";
      })
      .append("svg:title")
      .text(function(d) { return d["screen_name"]+": \n"+d["tweet"]});

    svg.append('g')
    .attr('class', 'xaxis')
    .attr('transform', 'translate(0, ' + (height-40) + ')')
    .call(xAxis);

    svg.append('g')
    .attr('class', 'yaxis')
    .call(yAxis);
}

function rescale() {
	minDate = tweets[0]["timestamp"].getTime();
    maxDate = tweets[tweets.length-1]["timestamp"].getTime();
    console.log(minDate+",  "+ maxDate);
    //svg.empty();
    //xScale.domain([scaleMin,scaleMax])  // change scale to 0, to between 10 and 100
    svg.select(".xaxis")
      .transition().duration(10).ease("sin-in-out")  // https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_ease
      .call(xAxis);
    //redraw();

    svg.selectAll(".tweet")
      .data(tweets)
    .transition().duration(10).ease("sin-in-out")
      .attr("cx", function(d) { return xScale(d["timestamp"])});

}

function getYonSeconds(tweet){
  return height - (tweet["timestamp"].getSeconds()*10 + 40);
}

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
