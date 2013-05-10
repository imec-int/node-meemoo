var socket;

$(function(){
	// init socket
	socket = io.connect(window.location.hostname);
	// listen to socket
	socket.on('newtweet', onSocket);
});

function onSocket(data){
	console.log(data);
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
