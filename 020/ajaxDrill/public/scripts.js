window.addEventListener("load",function(){
	sendRequest('get','/people','', showNewHtml);
});

// Creates, opens, and sends a request, then does a thing once response is recieved
//
// method    --Is the method of request ex(POST/GET) <string
// file   --The server side script you wish to run <string
// params    --Information you wish to pass with the request <string 
// afterLoad --A function you wish to execute after the server responds
//
//	Examples
//
//		sendRequest("GET","stringCheese.php","",function(e){ console.log(e.target.repsonse) })
//
//		sendRequest("POST", "sinatra.rb", "color=red&flavor=watermelon", myOwnFunction)

function sendRequest(method, file, params, afterLoad){
	request = new XMLHttpRequest();
	request.open(method, file, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
	request.send(params);
	request.addEventListener("load", afterLoad);
};

// Sets the html body html to servers response string
//
// e is the event of the xmlhttprequest object loading

function showNewHtml(e){
	string = e.target.response
	document.getElementsByTagName("body")[0].innerHTML = string
};
