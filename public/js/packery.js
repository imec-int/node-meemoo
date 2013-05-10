var socket;

$(function(){
	// init socket
	socket = io.connect(window.location.hostname);
	// listen to socket
	socket.on('colors', onSocket);

	var container = document.querySelector('#container');
	var pckry = new Packery( container, {
	  // options
	  itemSelector: '.item',
	  gutter: 10
	});
});

function onSocket(data){
	console.log(data);
	
	//var date = new Date(data["date"]);

	var max = Math.max(data["red"],data["green"], data["blue"]);
	var ratio = max/255 +0.1;

	var nR = Math.floor(data["red"]/ratio);
	var nG = Math.floor(data["green"]/ratio);
	var nB = Math.floor(data["blue"]/ratio);

	$("#red").text(nR);
	$("#green").text(nG);
	$("#blue").text(nB);

	//console.log("rgb("+nR+","+nG+","+nB+")");
	// bg color
	$("body").css("background-color","rgb("+nR+","+nG+","+nB+")");
}