var button = document.getElementById("send_button");
var message = document.getElementById("message");

button.onclick = async function sendData() {

	var message = document.send.message.value;
		const data = { message };
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(data)
	    };
	    const response = await fetch('/sentiment', options); //Might not be picking up the correct response here
	    const json = await response; 
	    console.log(json);

		document.getElementById("result").innerHTML = response;
	};