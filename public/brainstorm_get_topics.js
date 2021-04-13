async function getTopics()
	{
		const get_response = await fetch('/brainstorm_get_topics');
		const data = await get_response.json();
		console.log(data);

		var list = document.getElementById('list');

		for (var i = 0; i < data.length; i++) {
			var row = 	`<ul>
							<li><input type="submit" value="${data[i].topic}" onclick="getData(${data[i].topic})" </input></li>
						</ul>`
			list.innerHTML += row;
		};
	};
window.addEventListener("load", getTopics());