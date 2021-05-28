async function getBEA()
	{
	    const get_bea = await fetch('/bea');
		const data = await get_bea.json();
		console.log(data);
		
		
		var table = document.getElementById('bea_table');
		table_data = data.body.BEAAPI.Results.Data

		for (var i = 0; i < table_data.length; i++) {
			var row = 	`<tr>
							<td>${table_data[i].CL_UNIT}</td>
							<td>${table_data[i].Code}</td>
							<td>${table_data[i].DataValue}</td>
							<td>${table_data[i].GeoFips}</td>
							<td>${table_data[i].GeoName}</td>
							<td>${table_data[i].NoteRef}</td>
							<td>${table_data[i].TimePeriod}</td>
						</tr>`
			table.innerHTML += row;
		};
	}

window.addEventListener("load", getBEA());

