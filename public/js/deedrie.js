var socket;

$(function(){
	// init socket
	socket = io.connect(window.location.hostname);
	// listen to socket
	socket.on('tweets', onSocket);

	//init packery
	$('#container').packery();

});

function onSocket(data){
	//console.log(data.followers);
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
