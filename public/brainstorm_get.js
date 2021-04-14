// BRAINSTORM GET TOPICS

async function getTopics()
	{
		const get_response = await fetch('/brainstorm_get_topics');
		const data = await get_response.json();
		console.log(data);

		var tablist = document.getElementById('tabList');

		for (var i = 0; i < data.length; i++) {
			var tab = 	`<div id="${data[i].topic}" onclick="getData('${data[i].topic}')" class="tab"> ${data[i].topic}</div>`
			tablist.innerHTML += tab;
		};
	};
window.addEventListener("load", getTopics());


// BRAINSTORM GET

async function getData(topic)
	{
		var header = document.getElementById('headerActive');
		header.innerHTML = topic;

		var content = document.getElementById('content');
		content.style.display = "block";

		const get_response = await fetch('/brainstorm_get/' + topic);
		const data = await get_response.json();
		console.log(data);

		var table = document.getElementById('brainstormingTable');
		table.innerHTML = "";

		for (var i = 0; i < data.length; i++) {
			var row = 	`<tr>
							<td>${data[i].id}</td>
							<td>${data[i].idea}</td>
							<td>${data[i].topic}</td>
							<td>${data[i].saved}<img class="icons" src="images/heart_outline.png" alt="" /></td>
							<td> <input type="submit" value="Delete" onclick="deleteEntry(${data[i].id})" </input> </td>
						</tr>`
			table.innerHTML += row;
		};
	};


//BRAINSTORM DELETE

async function deleteEntry(id) {

	var header = document.getElementById('headerActive');
	var topic = header.innerHTML;
	const delete_id = id;

	if (delete_id == '') {
		alert(`Error deleting entry. Please notify Jesse.`);
	}
	else {
	    const data = { delete_id };
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(data)
	    };

	    fetch('/brainstorm_delete', options).then(response => {
                            console.log(response);
                            getData(topic);
                            });

		
	};
};


// BRAINSTORM POST

var button = document.getElementById("send_button");
var idea_input = document.getElementById("idea");

idea_input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { // Number 13 is the "Enter" key on the keyboard
    button.click();
  }
}); //resets the screen currently

button.onclick = async function sendData() {

	let date = new Date()

	var header = document.getElementById('headerActive');
	var topic = header.innerHTML;

	var idea = document.send.idea.value;
	    const data = { idea, topic, date };
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(data)
	    };
	    const response = await fetch('/brainstorm_post', options);
	    const json = await response; 
	    console.log(json);

	    getData(topic);
	idea_input.value = '';
	};