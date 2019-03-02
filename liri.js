
require("dotenv").config();

var inquirer = require("inquirer");
var axios = require("axios");
var spotify = require("node-spotify-api")
var moment = require("moment")
var operator;
var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);


var query;

// beta version 0.0.1
// function liri(){
//     if(operator === "movie"){
//         var movieName = process.argv[3];


//         var queryUrl = "http://www.omdbapi.com/?t=" +movieName +"&y=&plot=short&apikey=trilogy";


//         axios
// .get(queryUrl)
// .then(function(response) {
//   // If the axios was successful...
//   // Then log the body from the site!
//   console.log(response.data);
// })
// .catch(function(error) {
//   if (error.response) {
//     // The request was made and the server responded with a status code
//     // that falls out of the range of 2xx
//     console.log(error.response.data);
//     console.log(error.response.status);
//     console.log(error.response.headers);
//   } else if (error.request) {
//     // The request was made but no response was received
//     // `error.request` is an object that comes back with details pertaining to the error that occurred.
//     console.log(error.request);
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.log("Error", error.message);
//   }
//   console.log(error.config);
// });
//     }
//     if( operator === "song"){
//         var songName = process.argv[3];
//     }
//     if ( operator === "band"){
//         var artist = process.argv[3];

//         var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

//         axios
//         .get(queryUrl)
//         .then(function(response) {
//           // If the axios was successful...
//           // Then log the body from the site!
//           console.log(response.data);
//         })
//         .catch(function(error) {
//           if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.log(error.response.data);
//             console.log(error.response.status);
//             console.log(error.response.headers);
//           } else if (error.request) {
//             // The request was made but no response was received
//             // `error.request` is an object that comes back with details pertaining to the error that occurred.
//             console.log(error.request);
//           } else {
//             // Something happened in setting up the request that triggered an Error
//             console.log("Error", error.message);
//           }
//           console.log(error.config);
//         });


//     }else{
//         console.log("Dummy, please try again a different thing");
//     }
// }

inquirer.prompt([
  {
    type: "list",
    name: "operator",
    message: "Choose your search query from the list provided:",
    choices: ["movies", "artist events", "songs"]

  }, {
    type: "input",
    name: "query",
    message: "Input your search parameter:"

  }
]).then(function (inquirerResponse) {

  console.log("\nYou chose " + inquirerResponse.operator);
  console.log("\nSearching for " + inquirerResponse.query);
  operator = inquirerResponse.operator;
  query = inquirerResponse.query;
  getInfo();

});

function getInfo() {
  if (operator === "movies") {

    axios
      .get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy")
      .then(function (response) {
        // If the axios was successful...
        // Then log the body from the site!


        console.log("\nTitle: " + response.data.Title);
        console.log("\nYear: " + response.data.Year);
        console.log("\nRating: " + response.data.Rated);
        console.log("\nRotten Tomatoes: " + response.data.Ratings[1].Value);
        console.log("\nCountry: " + response.data.Country);
        console.log("\nLanguage: " + response.data.Language);
        console.log("\nPlot: " + response.data.Plot);
        console.log("\nActors: " + response.data.Actors);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

  }
  if (operator === "artist events") {


    axios
      .get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp")
      .then(function (response) {
        // If the axios was successful...
        // Then log the body from the site!

        for (var i = 0; i < response.data.length; i++) {
          console.log("\n===============" + i + "===================");
          console.log("\nVenue: " + response.data[i].venue.name);
          console.log("\nVenue location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
          console.log("\nDate of the event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
        }
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }
  if (operator === "songs"){
    if( query === ""){
      spotify
      .search({ type: 'track', query: "The Sign Ace of Base", limit: 1 }, function (err, data){
    console.log("\nArtist: " + data.tracks.items[0].artists[0].name)
    console.log("\nSong: " + data.tracks.items[0].name)
    console.log("\nAlbum: " + data.tracks.items[0].album.name)
    console.log("\nPreview: " + data.tracks.items[0].preview_url);
  })}else{

    spotify
      .search({ type: 'track', query: query, limit: 1 }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
      else{
        console.log("\nArtist: " + data.tracks.items[0].artists[0].name)
        console.log("\nSong: " + data.tracks.items[0].name)
        console.log("\nAlbum: " + data.tracks.items[0].album.name)
        console.log("\nPreview: " + data.tracks.items[0].preview_url);

      }

    })
  }

  }
}




