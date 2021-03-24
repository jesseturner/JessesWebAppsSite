var button = document.getElementById("update_button");


button.onclick = async function updateClassifier() {

	const get_response = await fetch('/sentiment_train');
	const data = await get_response.json();
    document.getElementById("done_icon").style.display = "flex";
};
