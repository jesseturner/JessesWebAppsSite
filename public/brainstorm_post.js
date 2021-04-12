var button = document.getElementById("send_button");
var idea = document.getElementById("idea");

//Positive

button.onclick = async function sendData() {

	let date = new Date()

	var idea = document.send.idea.value;
	var topic = "testing";
	    const data = { idea, topic, date };
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(data)
	    };
	    const response = await fetch('/brainstorm_post', options);
	    const json = await response; 
	    console.log(json);

	    location.reload();

	};
