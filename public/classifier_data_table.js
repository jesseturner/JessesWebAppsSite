async function getData()
	{
		const get_response = await fetch('/sentiment_get');
		const data = await get_response.json();
		console.log(data);

		var table = document.getElementById('sentimentTable');

		for (var i = 0; i < data.length; i++) {
			var row = 	`<tr>
							<td>${data[i].id}</td>
							<td>${data[i].text}</td>
							<td>${data[i].category}</td>
							<td> <input type="submit" value="Delete" onclick="deleteEntry(${data[i].id})" </input> </td>
						</tr>`
			table.innerHTML += row;
		};
	};
window.addEventListener("load", getData());

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
	    /*const response = await fetch('/sentiment_delete', options);
	    const json = await response; 
	    console.log(json);
	    getData();*/
	    fetch('/sentiment_delete', options).then(response => {
                            console.log(response);
                            location.reload();
                            });

		
	};
};