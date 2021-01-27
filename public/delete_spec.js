function enable_delete() { //Needed so get.js creates delete_spec buttons before this runs

	var button = document.getElementById("delete_spec");
	button.onclick = async function deleteSpecData()
	{
	var id = button.getAttribute("entry-id");
	    const data = { id };
	    const options = {
	    	method: 'POST',
	    	headers: {'Content-Type': 'application/json'},
	    	body: JSON.stringify(data)
	    };
		const get_response = await fetch('/deletespec', options);
		console.log(get_response);

	getData();
	}
}