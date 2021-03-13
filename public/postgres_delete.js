var button = document.getElementById("delete_button");
var delete_id = document.getElementById("delete_id");

button.onclick = async function deleteData() {
	var delete_id = document.send.delete_id.value;
	if (delete_id == '') {
		alert(`Enter an ID of an entry to delete`);
	}
	else {
	    const data = { delete_id };
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(data)
	    };
	    const response = await fetch('/postgres_delete', options);
	    const json = await response; 
	    console.log(json);

		getData();
	};
};