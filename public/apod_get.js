async function getPhoto()
	{
	    const get_image = await fetch('/apod');
		const data = await get_image.json();
		console.log(data);
		
		var image = document.getElementById('image');
		image.innerHTML = `<img src= ${data.body.url} alt="APOD not available - Contact Jesse">`;

		var desc = document.getElementById('desc');
		desc.innerHTML = data.body.explanation;
	};

window.addEventListener("load", getPhoto());
