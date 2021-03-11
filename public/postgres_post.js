var button = document.getElementById("send_button");
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var address = document.getElementById("address");

button.onclick = async function sendData() {

	var firstname = document.send.firstname.value;
	var lastname = document.send.lastname.value;
	var address = document.send.address.value;
	    const data = { firstname, lastname, address };
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(data)
	    };
	    const response = await fetch('/postgres_api', options);
	    const json = await response; 
	    console.log(json);

	getData();
	};