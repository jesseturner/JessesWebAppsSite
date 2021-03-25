async function getSentimentResult(id)
	{
		const get_response = await fetch('/sentiment/'+id);
		console.log('Fetching /sentiment/'+id);
		const data = await get_response.json();
		console.log(data);

		document.getElementById('response').innerHTML = "";

	//Displaying data on the screen
		for (item of data) {
			const root = document.createElement('div');
			var percent = Math.round(item.value*100);
			root.append(item.result, " (", percent, "%)");
			document.getElementById('response').append(root);
		}
		if (item.result == "positive") {
			document.getElementById('response').className = 'result_box--positive';
		}
		if (item.result == "negative") {
			document.getElementById('response').className = 'result_box--negative';
		}
	};
