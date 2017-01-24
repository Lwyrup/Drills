function changer(amount){
	var q = 0;
	var d = 0;
	var n = 0;
	var p = 0;

	for(;0.24 < amount; q ++){
		amount = amount - 0.25;
	}
		for(;0.09 < amount; d ++){
		amount = amount - 0.10;
	}
		for(;0.04 < amount; n ++){
		amount = amount - 0.05;
	}
		for(;0 < amount; p ++){
		amount = amount - 0.01;
	}
	return amount
}
console.log(changer(4.17));