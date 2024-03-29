async function getPhoto()
	{
	    const get_image = await fetch('/apod');
		const data = await get_image.json();
		console.log(data);
		
		var title = document.getElementById('title');
		title.innerHTML = data.body.title;

		var date = document.getElementById('date');
		date.innerHTML = data.body.date;

		var image = document.getElementById('image');
		image.innerHTML = `<img src= ${data.body.url} alt="APOD not available - Contact Jesse" class="apod_image">`;

		var source = document.getElementById('source');
		if (data.body.copyright !== undefined) {
			source.innerHTML = "Copyright: " + data.body.copyright;
		}

		var desc = document.getElementById('desc');
		desc.innerHTML = data.body.explanation;
	};

window.addEventListener("load", getPhoto());
