// Once window loads, selects the submit button and adds a click event
// Also sets current to 0 (current is the current viewed result)

window.addEventListener("load",function(){
	submit = document.getElementsByTagName("input")[1];
	submit.addEventListener("click",getResults)	
	current = 0;
});

// Prevents reloading of the page from the submit, and sends a request server side
//
// e --Click event on the submit button

function getResults(e){
	event.preventDefault();
	params = "?query="+e.target.parentElement.children[2].value;
	sendRequest("get","/results"+params,'',doesRequestDataExist)
};

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

// Sets the current to zero, incase its another search, and check the response status
//
// e --Load event of the xmlhttprequest object
//
//	Examples
//
//		e.target.status => 500
//
//		doesRequestDataExist();
//			=>"No results"

function doesRequestDataExist(e){
	current = 0;
	if (e.target.status > 199 && e.target.status < 201){
		queryData = JSON.parse(e.target.response);
		buildResults(queryData);
	}
	else{
		console.log("No results");
	};
};

// Builds all the html elements for results and shows only one
//
// json --Object/array from server response 

function buildResults(json){
	buildPreviousNext();
	buildHTML(json);
	hideAllButOne();
};

// Builds the previous and next links and adds events to each

function buildPreviousNext(){
	document.getElementById('container').innerHTML='<a href="#">previous</a><a href="#">next</a>';
	previous = document.getElementsByTagName("a")[0];
	next = document.getElementsByTagName("a")[1];
	previous.addEventListener("click",goBack);
	next.addEventListener("click",goForward);
};

// Goes to the previous result and shows only that

function goBack(){
	current -= 1;
	if (current < 0){
		current = all.length - 1;
	};
	hideAllButOne();
};

// Goes to the next result and shows only that

function goForward(){
	current += 1;
	if (current > all.length - 1){
		current = 0;
	};
	hideAllButOne();
};

// Hides all the results and then only displays the one at the current index

function hideAllButOne(){
	all = document.getElementsByClassName("movie_result");
	for (i=0; i<all.length; i++){
		all[i].style.display="none";
	}
	all[current].style.display="block"
};

// Builds the json data into a html formated string
//
// json --Object/array from server response

function buildHTML(json){
	html = ['<h1>' + json.totalResults + ' total results.</h1>',[]]; 
	json.Search.forEach(buildEachMoviesHTML);
	html[1].forEach(insertMoviesHTML);
};

// Takes each movie object from the json and one by one formats it to html
// Then pushes it into the html string array
//
// item --Object of the current movie

function buildEachMoviesHTML(item){
	string = "<div class='movie_result'><h2>"+ item.Title +"</h2>";
	string += "<p>" + item.Year + ", " + item.Type + ", imdbID: " + item.imdbID + "</p>";
	string += "<img src='"+item.Poster+"'></img></div>";
	html[1].push(string);
};

// Goes through each item in the movie html array and adds it to the body
//
// item --The html formatted string for a single movie

function insertMoviesHTML(item){
	container = document.getElementById('container');
	container.insertAdjacentHTML('beforeend',item);
};
