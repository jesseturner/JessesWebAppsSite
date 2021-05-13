async function getPrice()
	{
		const get_response = await fetch('/bitcoin');
		const data = await get_response.json();
		console.log(data);

		var price = document.getElementById('price');
		price.innerHTML = "$" + commaSeparateNumber(Math.round(data.content[0].price));

	};
window.addEventListener("load", getPrice());


function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
    	val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}