var button = document.getElementById("send_button");
var name = document.getElementById("name");
var address = document.getElementById("address");

button.onclick = async function sendData() {

	var name = document.send.name.value;
	var address = document.send.address.value;
	    const data = { name, address };
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(data)
	    };
	    const response = await fetch('/api', options);
	    const json = await response; 
	    console.log(json);

	getData();
	};