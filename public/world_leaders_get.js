//WORLD LEADERS GET

var button = document.getElementById("random_button");
var score = 0;
var total = 0;

button.onclick = async function getInfo()
	{
		//Reset choice containers and photo
		document.getElementById('leader_image').innerHTML = '';

		for (var i = 0; i < 4; i++) {
			document.getElementById('leader_info_'+i).innerHTML = '';
			document.getElementById('leader_info_'+i).className = "answer_leader";
		}
		
		//In-game updates
		document.getElementById('game').style="display: flex";
		button.value = "Next";


		//Set correct answer and photo
		var correct_id = Math.floor(Math.random() * 134);

		const get_response = await fetch('/world_leaders/' + correct_id);
		const data = await get_response.json();
		console.log(data);

		var img = `<img class="leader_image" src="images/leaders/${data[0].imagesrc}" alt="" />`;

		document.getElementById('leader_image').innerHTML += img;

		var name = data[0].name;
		var title = data[0].title;
		var country = data[0].country;

		document.getElementById('leader_info_0').innerHTML += (name + ", " + title + ", " + country);

		//Set incorrect answers
		var i;
		for (i = 1; i < 4; i++) {
			var id = Math.floor(Math.random() * 134);

			const get_response = await fetch('/world_leaders/' + id);
			const data = await get_response.json();
			console.log(data);

			var name = data[0].name;
			var title = data[0].title;
			var country = data[0].country;

			document.getElementById('leader_info_'+i).innerHTML += (name + ", " + title + ", " + country);
		}

		//Shuffle the answers
		var ul = document.querySelector('.leader_options_wrapper');
		for (var i = ul.children.length; i >= 0; i--) {
    		ul.appendChild(ul.children[Math.random() * i | 0]);
		}

	};


var answer_0 = document.getElementById("leader_info_0");
var answer_1 = document.getElementById("leader_info_1");
var answer_2 = document.getElementById("leader_info_2");
var answer_3 = document.getElementById("leader_info_3");

answer_0.onclick = function CorrectAnswer() {
	answer_0.className = "answer_correct"
	score++;
	total++;
	document.getElementById('score').innerHTML = Math.round(score/total*100)+ "% (" + score + "/" + total + ")";
}
answer_1.onclick = function IncorrectAnswer() {
	answer_1.className = "answer_incorrect"
	total++;
	document.getElementById('score').innerHTML = Math.round(score/total*100)+ "% (" + score + "/" + total + ")";
}
answer_2.onclick = function IncorrectAnswer() {
	answer_2.className = "answer_incorrect"
	total++;
	document.getElementById('score').innerHTML = Math.round(score/total*100)+ "% (" + score + "/" + total + ")";
}
answer_3.onclick = function IncorrectAnswer() {
	answer_3.className = "answer_incorrect"
	total++;
	document.getElementById('score').innerHTML = Math.round(score/total*100)+ "% (" + score + "/" + total + ")";
}





