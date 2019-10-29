// REQUIRE .env FILE
require("dotenv").config();

// REQUIRE AXIOS
const axios = require("axios");

// REQUIRE REQUEST
let request = require("request");

// REQUIRE MOMENT
const moment = require('moment');

//REQUIRE FILE SYSTEMS
const fs = require("fs");

// LINK KEY PAGE
const keys = require("./keys.js");





// INITIALIZEs SPOTIFY
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// OMdb
let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);


// ACCEPTS USER COMMANDS
let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");





// SWITCH FUNCTION FOR USERS COMMANDS
function userCommand(userInput, userQuery) {
    // THE DIFFERENT SWITCH CASES
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(userQuery);
            break;
        default:
            console.log("Sorry, I didn't get that.  Try again?");
            break;
    }
}

userCommand(userInput, userQuery);

function concertThis() {
    console.log(`\n - - - - -\n\nI'm looking now..${userQuery}'s next show...`);
    // USER QUERY FOR THE BANDS IN TOWN API
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + bandsintown, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // FORMAT THE JSON RESPONSE
            let userBand = JSON.parse(body);
            // PARSING THE RESPONSE DATA
            if (userBand.length > 0) {
                for (i = 0; i < 1; i++) {
                    // CONSOLE LOGGING THE RESPONSE
                    console.log(`\nLook who just happens to be in town \n\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude},${userBand[i].venue.longitude}\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)

                    // FORMATTING THE DATE AND TIME
                    let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Time: ${concertDate}\n\n- - - - -`);
                };
            } else {
                console.log('Unfortunately I could not find what you were looking for');
            };
        };
    });
};

function spotifyThisSong() {
    console.log(`\n - - - - -\n\nlet me see if I can spot ..."${userQuery}"`);

    // DEFAULT SONG IF USER QUERY NOT FOUND
    if (!userQuery) {
        userQuery = "maneater hall and oates"
    };

    //SPOTIFY SEARCH FORMAT
    spotify.search({
        type: 'track',
        query: userQuery,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('Uh oh an error occurred: ' + error);
        }
        // STORING THE RESPONSE DATA IN AN ARRAY
        let spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nI hope this hits the spot \n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n - - - - -`)
        };
    });
}

function movieThis() {
    console.log(`\n - - - - -\n\nI'm looking now..."${userQuery}"`);
    if (!userQuery) {
        userQuery = "jaws";
    };
    // OMDB REQUEST
    request("http://www.omdbapi.com/?t=" + userQuery + "&apikey=86fe999c", function (error, response, body) {
        let userMovie = JSON.parse(body);
            // GETTING THE RATINGS DATA
        let ratingsArr = userMovie.Ratings;
        if (ratingsArr.length > 2) {}

        if (!error && response.statusCode === 200) {
            console.log(`\nAs you've requested\n\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDb Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}\nCountry: ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n- - - - -`)
        } else {
            return console.log("Error, Error, Error....bst, zap, malfunction. Error:" + error)
        };
    })
};

function doThis() {
        // READFILE METHOD OF FS
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // SEPARATING THE OBJECTS IN ARRAY
        let dataArr = data.split(",");

        // RETRIEVING OBJECTS FROM THE RANDOM TEXT FILE
        userInput = dataArr[0];
        userQuery = dataArr[1];
        // CALL THE FUNCTION 
        userCommand(userInput, userQuery);
    });
};