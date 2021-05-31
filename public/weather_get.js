async function getWeather()
	{
		const coords = await getCoords();
		const get_weather = await fetch('/weather/'+ coords);

		const data = await get_weather.json();
		const forecast_url = data.body.properties.forecast;
		console.log(forecast_url);

		const body_url = {forecast_url};
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(body_url)
	    };
		const get_forecast = await fetch('/forecast', options);
		const forecast = await get_forecast.json();
		console.log(forecast);
		

		
		var table = document.getElementById('forecast_table');
		table_data = forecast.body.properties.periods

		for (var i = 0; i < table_data.length; i++) {
			var row = 	`<tr>
							<td>${table_data[i].name}</td>
							<td>${table_data[i].shortForecast}</td>
							<td>${table_data[i].temperature}</td>
						</tr>`
			table.innerHTML += row;
		};
	}

getCoords = () => {
	return new Promise((resolve, reject) => {
		if ('geolocation' in navigator) {
		console.log('geolocation available');
		navigator.geolocation.getCurrentPosition(async position => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			document.getElementById('position').textContent = Math.round(lat) + "," + Math.round(lon);
			console.log("Results of getCoords: " + lat + "," + lon);
			resolve(lat + "," + lon);
		})
	}
		else {
			reject('Geolocation not available');
		}
	}
)}

window.addEventListener("load", getWeather());

