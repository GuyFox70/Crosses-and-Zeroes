let socket = new WebSocket("ws://localhost:7777");		

const cells = document.querySelectorAll('.field-cell');

socket.onopen = function(e) {

	// socket.send(answer.innerHTML);

};

socket.onmessage = function(event) {
  const msg = event.data;
  console.log(msg);
};

socket.onclose = function(event) {
			
};

socket.onerror = function(error) {
			
};