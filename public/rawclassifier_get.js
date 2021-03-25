async function getData()
	{
		const get_response = await fetch('/rawclassifier_get');
		const data = await get_response.json();
		console.log(data);

		var jsonPretty = JSON.stringify(JSON.parse(data),null,2);  
		document.getElementById('data').innerText = jsonPretty;
	};
window.addEventListener("load", getData());
