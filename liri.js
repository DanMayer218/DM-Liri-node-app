// var dotenv = require("dotenv").config();

var axios = require("axios");
var omdb = require("omdb");
var movie = "";

// var keys = require("./keys.js");

// var omdb = omdb(keys.omdb);

var arg1 = process.argv(4);

var movieQuery = 
axios.get("http://www.omdbapi.com/?t=" + movie + "apikey=91f94af4")
  .then(function (response,JSONdata) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });


// ("http://www.omdbapi.com/?t=" + movie + omdb);







// var Spotify = require('node-spotify-api');

// var spotify = new Spotify(keys.spotify);

// var song = ("");

// var myArgs = process.argv.slice(2);

// spotify
//   .request("https://api.spotify.com/v1/search" + song + spotify)
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });
