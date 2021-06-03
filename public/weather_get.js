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
		

		calendar = document.getElementById('calendar');
		table_data = forecast.body.properties.periods
		for (var i = 0; i < table_data.length; i++) {
			var div = document.createElement('div');
    		div.id = 'day'+i;
    		div.className = 'day';

    		var date = document.createElement('div');
    			date.innerHTML = table_data[i].name;
    			date.className = 'date';
    			div.appendChild(date);

    		var fc = document.createElement('div');
    			fc.innerHTML = table_data[i].shortForecast;
    			fc.className = 'fc';
    			div.appendChild(fc);

    		var temp = document.createElement('div');
    			temp.innerHTML = table_data[i].temperature + '&deg;';
    			temp.className = 'temp';
    			div.appendChild(temp);

    		calendar.appendChild(div);
    	}

		// Hide loaders and show content
		//table.style.display = "table";
		var header = document.getElementById("location_header");
		header.style.display = "inline";
		var loader = document.getElementById("loader");
		loader.style.display = "none";
		
	}

getCoords = () => {
	return new Promise((resolve, reject) => {
		if ('geolocation' in navigator) {
		console.log('geolocation available');
		navigator.geolocation.getCurrentPosition(async position => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			document.getElementById('position').textContent = Math.round(lat) + ", " + Math.round(lon);
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

