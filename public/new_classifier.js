var trainbutton = document.getElementById("train");


trainbutton.onclick = async function train() {

	const get_response = await fetch('/classifier_train');
	const data = await get_response.json();
	console.log(data);
}