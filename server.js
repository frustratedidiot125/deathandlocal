let express = require('express');
let bodyParser = require('body-parser');
let alexa = require('alexa-app');
let invert = require('lodash.invert');
let keyBy = require('lodash.keyby');
//let phonecodes = require("./phone.json");
//let countries = require("./names.json");
let quotesall = require("./quotes1.json");
//let quotesall = require("./quotesfbig.json");


let alexaApp = new alexa.app('alexa');
let expressApp = express();
alexaApp.express({expressApp: expressApp, router: express.Router(), debug: false, checkCert: true});
///---------


alexaApp.launch( (request, response) => {
  let content = `Welcome to Common Quotes Quiz! I'll give you a quote and you tell me who you think it's from! Just say give me a quote to start, or stop to exit!`;

  response.card('Welcome', content);
  response.say(content);
  response.reprompt('I\m waiting. Just say give me a quote, or stop to exit.')
  response.shouldEndSession(false);
});

alexaApp.intent("Givemeaquote", {
    slots: {},
    utterances: ['Give me a quote', 'Try again', 'Hit me', 'Quote me', 'Yes', 'Start']
  },
  function (request, response) {
  var randomQuoteskey = Object.keys(quotesall)[Math.floor(Math.random()*Object.keys(quotesall).length)]; //randomQuoteskey is the quote itself
   let speaker = quotesall[randomQuoteskey]; //quote itself serves are key for value speaker of quote
  let contentq = 'Who said. " + randomQuoteskey
  // **888 --WE NEED TO FIGURE OYT SESSION VARIABLES IE ALEXAAPP SET SESSION OR .SET SESSION VAR OR RES.
  
  
  
  
  
 //here goes phone anc other var
//    let givencountry = request.slot('Country');

  //  let selabrev = newcountries[givencountry];
console.log('speaker:', speaker);

  // could be useful:  if (selabrev) {

   // let callingcode = phonecodes[selabrev];

    
// console.log('callingcode:', callingcode);

    //if (callingcode) {
    //  response.say(`The international calling code for ${givencountry} is <say-as interpret-as='spell-out'>${callingcode}</say-as>`);
     // response.shouldEndSession(true);
    
//   } else {
  //    response.say(`I\'m sorry, I do not have a calling code on file for ${givencountry}. Though I do recognize the country, they might not have international calling capabilities yet. `);
  //response.shouldEndSession(true);
//}
   //  } else {
     // response.say(`I\'m sorry, I do not recognize ${givencountry}. Speaking literally, of course, not diplomatically.`);
// response.shouldEndSession(true);
      //}
  }
  
  
);

alexaApp.intent("AMAZON.HelpIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
  var HELP_MESSAGE = "Give me a country name and I'll give you the international calling code! Try saying Canada, or say stop to exit.";
var HELP_REPROMPT = "Please give me a country name, or say stop to exit.";
 response.say(HELP_MESSAGE).reprompt(HELP_REPROMPT).shouldEndSession(false);
  }
 );

alexaApp.intent("AMAZON.StopIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Ok. Goodbye!").shouldEndSession(true);
  }
 );

alexaApp.intent("AMAZON.CancelIntent", {
  "slots": {} },
//"utterances": [
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Ok. Goodbye!").shouldEndSession(true);
  }
 );

alexaApp.sessionEnded( (request, response) => {
  let content = 'Thank you. Goodbye!';
  response.card('Session Ended', content);
  response.say(content);
});



expressApp.listen(process.env.PORT || 5000, function() {
    console.log('Call buddy Running');
});
