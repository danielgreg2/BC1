var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

//This function handles what happens when the website is accessed
var requestHandler = function(request, response) {
	var parsedUrl = url.parse(request.url);
  
	//DEBUGGING - Console output to check extension of localhost that is being accessed
	//console.log("Website extension: " + parsedUrl.pathname + " was received.");
  
	//If "listings" extension is accessed, print listings.json
	//Else produce 404 error code and corresponding message
	if(parsedUrl.pathname == '/listings'){
	  //DEBUGGING
	  //console.log("Listings directory was entered");
	  
	  //write header that says status is okay, and that a json file is about to be delivered
	  response.writeHead(200, {"Content-Type": "application/json"});
	  response.write(listingData);
	  response.end();}
	  else{
		  //DEBUGGING
		  //console.log("Some other directory was entered");
		  
		  //write header that says 404, file is missing at this extension
		  response.writeHead(404);
		  response.write("Bad gateway error");
		  response.end();}
  /*
    Your request handler should send listingData in the JSON format as a response if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: Explore the request object and its properties 
    HINT: Explore the response object and its properties
    https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
    
    HINT: Explore how callback's work 
    http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4
    
    HINT: Explore the list of MIME Types
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
   */
};


fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 

    HINT: Check out this resource on fs.readFile
    //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

    HINT: Read up on JSON parsing Node.js
   */

	//Check for errors
    if (err) {return console.log(err);}

	//Save the sate in the listingData variable already defined
	listingData = data;
  
	//DEBUGGING - making sure the above code has been exceuted, and verifying what it should look like
	//console.log("The JSON has been saved");
	//console.log("The JSON looks like this:\n" + listingData);

	//Creates the server
	var server = http.createServer(requestHandler);
  
	//Start the server, which is now listening for an event to happen
	server.listen(port, function() {
	console.log('Server listening on: http://127.0.0.1:' + port);
});

});
