async function getData()
	{
		const get_response = await fetch('/postgres_api');
		const data = await get_response.json();
		console.log(data);

		var table = document.getElementById('addressTable');

		for (var i = 0; i < data.length; i++) {
			var row = 	`<tr>
							<td>${data[i].firstname}</td>
							<td>${data[i].lastname}</td>
							<td>${data[i].address}</td>
							<td> <button class="deleteBtn"> Delete </button> </td>
						</tr>`
			table.innerHTML += row;
		};
	};
window.addEventListener("load", getData());

		var table = document.getElementById('addressTable');

		function onDeleteRow(e) {
			if (!e.target.classList.contains("deleteBtn")) {
				return;
			}
			alert(`clicked ID = ???`);
		}

		table.addEventListener("click", onDeleteRow);
