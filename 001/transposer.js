var arr = ["Panda", "Crow", "Ant"];
var narr = ["", "", "", "", ""];

for(var w = 0; w < arr[0].length; w++){
	for(var i = 0; i < arr.length; i++){
		if(arr[i].charAt(w) == ""){
			narr[w] += " ";
		}
	}
}