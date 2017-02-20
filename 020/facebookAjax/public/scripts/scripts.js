//EXECUTION HERE AFTER PAGE LOADS
window.addEventListener("load", function () {
	sendRequest("get","/post","",populateFromServer);
	setUpAllEvents();
});

//FUNCTIONS DEFINED HERE

// Adds the events for the entire page

function setUpAllEvents(){
	preventTagsOnPage();
	addLikesToPage();
	addCommentsToPage();
	addModalWindowToPage();
};

// Adds all the preventDefaults

function preventTagsOnPage(){
	preventATags();
	preventInputTags();
};

// Adds all of the like features

function addLikesToPage(){
	addLikeToMainPost();
	addFeaturesToComments();
};

// Adds all of the commenting features

function addCommentsToPage(){
	addFocusToPostComment();
	addCommentablityToPage();
};

// Adds all the features for the modal window

function addModalWindowToPage(){
	addProfileView();
	addModalWindowClose();
	addShare();
};

// Selects all of the 'a' tags and links, and prevents thier default

function preventATags(){
	all_links = document.getElementsByTagName("a");
	for (i=0; i < all_links.length; i++){
		all_links[i].addEventListener("click", prevent)
	};
};

// Selects all input tags and prevents the default

function preventInputTags(){
	all_submits = document.getElementsByTagName("input");
	for (i=0; i < all_submits.length; i++){
		all_submits[i].addEventListener("click", prevent)
	};
};

// Adds the abillity to like the main post

function addLikeToMainPost(){
	postLike = document.getElementsByClassName("action--like")[0];
	postLike.addEventListener("click", likepost);
};

// Adds like and reply features to the comments

function addFeaturesToComments(){
	commentsLike = document.getElementsByClassName("comment__info");
	for (i = 0; i < commentsLike.length; i++){
		commentsLike[i].childNodes[1].addEventListener("click", likeit);
		commentsLike[i].childNodes[3].addEventListener("click", reply_show);
	};
};

// Adds the ability to view profiles

function addProfileView(){
	allNames = document.getElementsByClassName("media__info");
	for (i = 0; i < allNames.length; i++){
		if (allNames[i].getElementsByTagName("a").length > 0){ 
			allNames[i].childNodes[1].addEventListener("click", viewprofile);
		};
	};
};

// Gives the modal window 'close' events

function addModalWindowClose(){
	modal = document.getElementsByClassName("modal")[0];
	modal.addEventListener("click", closeprofile);
	close = document.getElementsByClassName("modal__close")[0];
	close.addEventListener("click", closeprofile);
};

// Allows 'comment button' on main post to scroll to form

function addFocusToPostComment(){
	comment_link = document.getElementsByClassName("action--comment")[0];
	comment_link.addEventListener("click", commentOnPost);
};

// Finds all submit buttons and when clicked will 'comment'

function addCommentablityToPage(){
	submits = document.getElementsByTagName("input");
	for (i = 0; i < submits.length; i++){
		submits[i].addEventListener("click", submitComment);
	};
};

// Lets the modal window show a share view

function addShare(){
	post = document.getElementsByClassName("action action--share")[0];
	post.addEventListener("click", share);
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
//		sendRequest("POST", "/home", "color=red&flavor=watermelon", myOwnFunction)

function sendRequest(method, file, params, afterLoad){
	request = new XMLHttpRequest();
	request.open(method, file, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
	request.send(params);
	request.addEventListener("load", afterLoad);
};

// Populates the page with content from the servers response
//
// e --Event of the XMLhttprequest loading/response	

function populateFromServer(e){
	postData = JSON.parse(e.target.response);
	postMain = postData["post"]["post_main"];
	postComments = postData["post"]["post_comments"]
	populateMainPost(postMain);
	populateComments(postComments);
}

// Populates the main post from part of the servers response
//
// data --A associative array from the servers json string

function populateMainPost(data){
	document.getElementsByClassName("post__body")[0].children[0].textContent = data["body"];
	document.getElementsByClassName("media__info")[0].children[0].textContent = data["name"];
	document.getElementsByClassName("like--count")[0].textContent = data["likes"];
	document.getElementsByClassName("post__info")[0].children[1].textContent = data["comments"];
	document.getElementsByClassName("media__info")[0].children[1].textContent = data["time"];
}

// Populates the comments to the main post
//
// data --Associative array from servers json string
// n    --Used to track, within the next function, which comment from comments to use

function populateComments(data){
	comments = document.getElementsByClassName("comment media");
	n = 0;
	loopThroughNestedData(data);
}

// Goes through the entire data chunck reading all the way through the layers
//
// data --Associative array from servers json string

function loopThroughNestedData(data, q){
	for (q = 0; q < data.length; q++){
		fillCommentFromJSON(comments[n], data[q]);
	
		n++
		if (data[q]["replys_comments"].length > 0){
			loopThroughNestedData(data[q]["replys_comments"]);
		}
	}
};

// Takes the current comment from comments and fills it using the data from server
//
// comment --The current dom element to be filled
// json    --The server data object containing the posts info

function fillCommentFromJSON(comment, json){
	comment.children[1].childNodes[2].textContent = json["body"]
	comment.children[1].children[0].textContent = json["name"];
	comment.children[1].children[1].children[2].textContent = json["likes"];
	comment.children[1].children[1].children[1].textContent = json["replies"];
	comment.children[1].children[1].childNodes[6].textContent = json["time"];
	
};

// Updates the like link and number of likes when link is clicked
//
// this --node of the like link

function likeit(){
	count = parseInt(this.parentNode.childNodes[5].textContent.split(" ")[0])
	likeValid(this)
};

// Checks if there is NaN likes if not acts normal
// 
// locale --The node containing '_ likes' and if NaN it is the first like

function likeValid(locale){
	if (Object.is(count,NaN)){
		locale.innerHTML="Unlike"
		locale.parentNode.childNodes[5].innerHTML = "1 likes"
	}
	else{
		decideLike(locale)
	};
};

// Gets the string of likes in html and sets it equal to (it + 1)
// If comment is unliked and is clicked turns to like
// Gets the string of likes in html and sets it equal to (it - 1)
// 
// current --The node containing '_ likes'

function decideLike(current){
	if (current.innerHTML=="Like"){
		current.innerHTML="Unlike";
		current.parentNode.childNodes[5].innerHTML = count + 1 + " likes";
	}
	else if (current.innerHTML=="Unlike"){
		current.innerHTML="Like";
		current.parentNode.childNodes[5].innerHTML = count - 1 + " likes";
	};
};

// Likes/unlikes main post
// 
// this --The 'like' node below the main post

function likepost(){
	count = parseInt(document.getElementsByClassName("like--count")[0].textContent.split(" ")[0]);
	if (this.innerHTML=="Like"){
		this.innerHTML="Unlike";
		document.getElementsByClassName("like--count")[0].innerHTML = count + 1 + " likes";
	}
	else if (this.innerHTML=="Unlike"){
		this.innerHTML="Like";
		document.getElementsByClassName("like--count")[0].innerHTML = count - 1 + " likes";
	}
};

// Displays modal window and person/friends
// Gets the modal, name, and generates friends
// Displays the modal with the name and # of friends
// 
// e --Event of clicking on the username link node

function viewprofile (e){
	modal = document.getElementsByClassName("full__modal")[0];
	name = e.target.textContent;
	friends = Math.ceil(Math.random()*5000);
	modal.style.display="block";
	document.getElementsByClassName("modal__title")[0].textContent = name;
	document.getElementsByClassName("modal__body")[0].innerHTML = "Has " + friends + " friends.";
};

// Closes modal window

function closeprofile(){
	modal = document.getElementsByClassName("full__modal")[0];
	modal.style.display="none";
};

// Shows or hides replies
//
// this --The node that says '_ replies' below the comment

function reply_show(){
	replies = this.parentNode.parentNode.children[2];
	if (replies.style.display=="none"){
		replies.style.display="block";
	}
	else if (replies.style.display=="block"){
		replies.style.display="none"
	}
};

// Moves the users mouse to the bottom form for commenting on the main post

function commentOnPost(){
	comment_forms = document.getElementsByClassName("commentForm media");
	main_comment = comment_forms[comment_forms.length - 1].children[1].children[0].children[0];
	main_comment.focus();
};

// Prevents default behavior

function prevent(){
	event.preventDefault();
};

// Gets the users comment, sends it to validation, then resets the form
// 
// this --The submit button

function submitComment(){
	comment = this.parentNode.children[0].value
	isCommentValid(this, comment);
	this.parentNode.reset(); 
};

// Checks if the comment is empty or not, if so alerts user
// else begins the process of adding the comment to page
// 
// Area    --The submit button with the event trigger 
// Comment --The actual text from user as a string

function isCommentValid(area, comment){
	if (comment == ""){
		alert("Cannot submit a comment with no content.\n Please try again.");
	}
	else{
		writeComment(comment);
		addComment(area);
	};
};

// Writes the users input to the hidden template
// 
// comment --The users input from the form as a string

function writeComment(comment){
	comments = document.getElementsByClassName("comment media");
	comment_format = comments[comments.length-1];
	comment_format.children[1].childNodes[2].textContent = " " + comment;
};

// Defines the users comment, the thread, and the pos to aid the next function adding the comment
//
// current          --The submit button with trigger
// comments         --All of the comments in page
// comment_format   --last comment in page that is always hidden
// replies_box      --the replies area associated with the submit button
// new_comment_pos  --the last comment before the text field

function addComment(current){
	comments = document.getElementsByClassName("comment media");
	comment_format = comments[comments.length-1].cloneNode(true);
	replies_box = current.parentElement.parentElement.parentElement.parentElement;
	new_comment_pos = replies_box.childNodes.length - 2
	insertShowAndIntegrate(replies_box, comment_format, new_comment_pos);
	countReplies(current);
};

// Adds users comment to the post above the form used for submission
// 
// where   --The replies area for that thread
// what    --The actual string of what user typed
// toWhere --The second to last item in the replies area (aka new_comment_pos)

function insertShowAndIntegrate(where, what, toWhere){
	where.insertBefore(what, where.childNodes[toWhere]);
	where.childNodes[toWhere].style.display = "flex";
	addEventsToNew(where.childNodes[toWhere])
};

// Gets all the new comments buttons and passes it to eventTime
//
// pos --The last comment node before the form field (is now the users comment)

function addEventsToNew(pos){
	like_button = pos.children[1].children[1].children[0];
	profile_button = pos.children[1].children[0];
	reply_button = pos.children[1].children[1].children[1];
	buttons = [like_button, profile_button, reply_button];
	eventTime(buttons);
};

// Adds the functionality of all the comments to the new comment
//
// arrOfButtons --All the 'buttons' of the new post <array

function eventTime(arrOfButtons){
	arrOfButtons[0].addEventListener("click", likeit);
	arrOfButtons[1].addEventListener("click", viewprofile);
	//arrOfButtons[2] (could add a reply form here in the future)
	arrOfButtons.forEach(function(item){
		item.addEventListener("click", prevent);
	});
};

// Gets the number of replies relative to the form that was submited
//
// current  --The submit button node with a trigger

function countReplies(current){
	reply_count =current.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1]
	new_count = parseInt(reply_count.textContent.split(" ")[0]) + 1;
	whereToAddReply(reply_count, new_count);
};

// Changes the html to the new count and determines if a post or comment was replied to
//
// reply_count --The node containing '_ replies'
// new_count   --The new number of replies

function whereToAddReply(reply_count, new_count){
	if (Object.is(NaN, new_count)){
		if (reply_count.textContent == "Reply"){ reply_count.textContent = "1 replies"; }
		else{ countComments(); };
	}
	else{
		reply_count.textContent = new_count + " replies";
	};
};

// Updates the number of commnets on the main post

function countComments(){
	count_string = document.getElementsByClassName("post__info")[0].children[1];
	new_count = parseInt(count_string.textContent.split(" ")[0]) + 1;
	count_string.textContent = new_count + " comments";
};

// Opens the modal window, set the content to the post info, and add share text

function share(){
	modal = document.getElementsByClassName("full__modal")[0];
	modal.style.display="block"
	name = "Share " + document.getElementsByClassName("media__info")[0].children[0].textContent + "'s post";
	body = document.getElementsByClassName("post__main")[0].childNodes[3].textContent;
	document.getElementsByClassName("modal__title")[0].textContent = name;
	document.getElementsByClassName("modal__body")[0].textContent = body;
};
