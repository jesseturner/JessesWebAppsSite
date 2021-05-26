async function getPhoto()
	{
	    const get_image = await fetch('/apod');
		const data = await get_image.json();
		console.log(data);
		
		var image = document.getElementById('image');
		//image.innerHTML = `<img src= ${data.body.url}/>`; //Of course, image not stored in website root
		image.innerHTML = data.body.url;
	};

window.addEventListener("load", getPhoto());
