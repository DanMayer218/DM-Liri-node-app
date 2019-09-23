var dotenv = require("dotenv").config();



var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var song = ("");

var myArgs = process.argv.slice(2);

spotify
  .get("https://api.spotify.com/v1/search" + song + spotify)
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
