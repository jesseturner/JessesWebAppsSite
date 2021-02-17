var button = document.getElementById("send_button");
var message = document.getElementById("message");

button.onclick = async function sendMessage() {

	var message = document.send.message.value;
		const data = { message };
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(data)
	    };
	    
	    const response = await fetch('/sentiment', options); 
	    const json = await response; 
	    console.log(json);
	
	GetResult();//Error here
	};
