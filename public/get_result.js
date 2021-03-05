async function getSentimentResult(id)
	{
		/*fetch('/sentiment/7aKAMTiTn0VN9XQC')
			.then(response => response.json())
			.then(data => console.log(data));*/

		const get_response = await fetch('/sentiment/'+id);
		console.log('Fetching /sentiment/'+id);
		const data = await get_response.json();
		console.log(data);

		document.getElementById('response').innerHTML = "";

	//Displaying data on the screen
		for (item of data) {
			const root = document.createElement('div');
			root.append(item.result);
			document.getElementById('response').append(root);
		}
	};
