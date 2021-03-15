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
						</tr>`
			table.innerHTML += row;
		};
	};
window.addEventListener("load", getData());
