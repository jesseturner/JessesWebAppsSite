var postivebutton = document.getElementById("positive_button");
var negativebutton = document.getElementById("negative_button");
var classifiertext = document.getElementById("classifiertext");

//Positive

postivebutton.onclick = async function sendData() {

	var classifiertext = document.send.classifiertext.value;
	var category = "positive";
	    const data = { classifiertext, category };
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(data)
	    };
	    const response = await fetch('/sentiment_post', options);
	    const json = await response; 
	    console.log(json);

	};


//Negative

negativebutton.onclick = async function sendData() {

	var classifiertext = document.send.classifiertext.value;
	var category = "negative";
	    const data = { classifiertext, category };
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(data)
	    };
	    const response = await fetch('/sentiment_post', options);
	    const json = await response; 
	    console.log(json);
	};