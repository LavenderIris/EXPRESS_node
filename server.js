// Load the express module (Where do you think this comes from?)
var express = require("express");
var session = require('express-session');
// original code:
var app = express();
// more new code:
app.use(session({secret: 'encryptionkey'}));  // string for encryption

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get("/", function (request, response){
    // hard-coded user data
    
    if ("counter" in request.session){
        request.session.counter+= 1;
    } else {
        request.session.counter = 0;
    }  
    response.render('index', {counter: request.session.counter} );
})

app.get("/add", function (request, response){
    // hard-coded user data
    if ("counter" in request.session){
        request.session.counter+= 1;
    } 
    response.redirect('/');
})

app.get("/reset", function (request, response){
    // hard-coded user data
    
    request.session.counter = -1;  
    response.redirect('/');
})

app.use(express.static(__dirname + "/static"));
  // Tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
  })
  // this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)
  