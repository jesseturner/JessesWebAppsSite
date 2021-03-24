var button = document.getElementById("update_button");


button.onclick = async function updateClassifier() {

	//document.getElementById("loader").style.visibility = "visible";
	const get_response = await fetch('/sentiment_train');
	const data = await get_response.json();
    console.log(data);
    //document.getElementById("loader").style.visibility = "hidden"; //Perhaps because of the async, this doesn't overwrite the "visible"
};
