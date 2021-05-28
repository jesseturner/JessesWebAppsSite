async function getWeather()
	{
	    const get_weather = await fetch('/weather');
		const data = await get_weather.json();
		console.log(data.body.properties.forecast);

		const get_forecast = await fetch('/forecast');
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

window.addEventListener("load", getWeather());

