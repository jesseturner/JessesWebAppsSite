var button = document.getElementById("delete_button");

button.onclick = async function deleteData()
	{
		const get_response = await fetch('/delete');
		console.log(get_response);
	}