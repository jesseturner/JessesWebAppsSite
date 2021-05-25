async function getPrice()
	{
	    const get_token = await fetch('/bitcoin_token');
		const token = await get_token.json();
	   	
		const get_price = await fetch('/bitcoin/'+token);
		const data = await get_price.json();
		
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