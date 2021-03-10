async function getData()
	{
		const get_response = await fetch('/postgres_api');
		const data = await get_response.json();
		console.log(data);

		document.getElementById('data').innerHTML = "";

	//Displaying data on the screen
	/*	for (item of data) {
			const root = document.createElement('div');
			const name = document.createElement('div');
			name.textContent = 'name: ' + item.name;
			const address = document.createElement('div');
			address.textContent = 'address: ' + item.address;

			var del_button = document.createElement("input");
			del_button.type = "reset";
			del_button.value = "Delete";
			del_button.id = "delete_spec";
			del_button.setAttribute("entry-id", item._id);

			root.append(name, address, del_button);
			document.getElementById('data').append(root);
		}
		enable_delete(); */
	};
window.addEventListener("load", getData());