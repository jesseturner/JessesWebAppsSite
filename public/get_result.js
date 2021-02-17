async function getResult()
	{
		const get_response = await fetch('/sentiment');
		const data = await get_response.json();
		console.log(data);

		document.getElementById('response').innerHTML = "";

	//Displaying data on the screen
		for (item of data) {
			const root = document.createElement('div');
			const message = document.createElement('div');
			message.textContent = 'message: ' + item.message;
			const result = document.createElement('div');
			result.textContent = 'result: ' + item.result;

			root.append(message, result);
			document.getElementById('response').append(root);
		}
	};
window.addEventListener("load", getResult());