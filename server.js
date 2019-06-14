// Constants
const express = require('express');
const app = new express();
const port = process.env.PORT || 4800;
const path = require("path");
const bodyParser = require('body-parser');

// To load static files
express.static('/public');
app.use(express.static('public'));
// Tell express to use the body-parser middleware and to not parse extended bodies
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: false }));

// Start on index.html file
app.get('/', function(request, response){
  response.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/order', function(request, response, next) {
  const body = request.body;
  let date = new Date();
  console.log('* ' + date.getHours() + 'h' + ('0' + date.getMinutes()).slice(-2) + ' - ' + body.commande);

  response.send();
});

// Listen to the port
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log('--------------------------------------------');
  console.log('Start server');
  console.log('--------------------------------------------');
})