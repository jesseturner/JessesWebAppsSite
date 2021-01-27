var button = document.getElementById("send_button");
var message = document.getElementById("message");

button.onclick = function sendData() {

	var message = document.send.message.value;
	    const data = { message };
	    const options = {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(data)
	    };
	    const response = fetch('/api', options);
	    const json = response.json(); //needs some sort of await, throwing error
	    console.log(json);
	};