//WORLD LEADERS GET

var button = document.getElementById("random_button");

button.onclick = async function getInfo()
	{
		document.getElementById('leader_image').innerHTML = '';
		document.getElementById('leader_name').innerHTML = '';
		document.getElementById('leader_title').innerHTML = '';
		document.getElementById('leader_country').innerHTML = '';

		var id = Math.floor(Math.random() * 47);

		const get_response = await fetch('/world_leaders/' + id);
		const data = await get_response.json();
		console.log(data);

		var img = `<img class="leader_image" src="images/leaders/${data[0].imagesrc}" alt="" />`;
		var name = data[0].name;
		var title = data[0].title;
		var country = data[0].country;

		document.getElementById('leader_image').innerHTML += img;
		document.getElementById('leader_name').innerHTML += name;
		document.getElementById('leader_title').innerHTML += title;
		document.getElementById('leader_country').innerHTML += country;

	};