var socket;

$(function(){
	// init socket
	socket = io.connect(window.location.hostname);
	// listen to socket
	socket.on('newtweet', onSocket);

	var container = document.querySelector('#container');
	var pckry = new Packery( container, {
	  // options
	  itemSelector: '.item',
	  gutter: 10
	});
});

function onSocket(data){
	console.log(data);
}