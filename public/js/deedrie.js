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