async function getTopics()
	{
		const get_response = await fetch('/brainstorm_get_topics');
		const data = await get_response.json();
		console.log(data);

		var list = document.getElementById('list');

		for (var i = 0; i < data.length; i++) {
			var row = 	`<ul>
							<li><button id="${data[i].topic}" onclick="getData('${data[i].topic}')"> ${data[i].topic}</button></li>
						</ul>`
			list.innerHTML += row;
		};
	};
window.addEventListener("load", getTopics());


async function getData(topic)
	{
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



async function deleteEntry(id) {
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
                            location.reload();
                            });

		
	};
};