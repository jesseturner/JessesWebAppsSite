const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-modal-close]')
const overlay = document.getElementById('overlay')

// Bypassed currently by directly calling the closeModal function, will need to target specific modals
openModalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const modal = document.querySelector(button.dataset.modalTarget)
		openModal(modal)
	})
})

overlay.addEventListener('click', () => {
	const modals = document.querySelectorAll('.modal.active')
	modals.forEach(modal => {
		closeModal(modal)
	})
})

closeModalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const modal = button.closest('.modal')
		closeModal(modal)
	})
})

function openModal(modal) {
	if (modal == null) return
	modal.classList.add('active');
	overlay.classList.add('active');
}

function closeModal(modal) {
	if (modal == null) return
	modal.classList.remove('active');
	overlay.classList.remove('active');
}


//CREATE NEW TOPIC

var new_topic = document.getElementById("new_topic");

async function sendNewTopic() {
	
	let date = new Date()

	var topic = new_topic.value;

	var idea = "";
	    
	    const data = { idea, topic, date };
	    const options = {
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify(data)
	    };
	    const response = await fetch('/brainstorm_post', options);
	    const json = await response; 
	    console.log(json);

	    getData(new_topic);
	new_topic.value = '';
	closeModal(modal);
	};