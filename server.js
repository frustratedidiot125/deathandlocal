let express = require('express');
let bodyParser = require('body-parser');
let alexa = require('alexa-app');
let invert = require('lodash.invert');
let keyBy = require('lodash.keyby');
//let phonecodes = require("./phone.json");
//let countries = require("./names.json");
//let quotesall = require("./quotes1.json");
let quotesall = require("./quotesfbig.json");


let alexaApp = new alexa.app('alexa');
let expressApp = express();
alexaApp.express({expressApp: expressApp, router: express.Router(), debug: false, checkCert: true});
///---------


alexaApp.launch( (request, response) => {
  let content = `Hi there! Give me a famous name and I'll read you one of their quotes! You can also say random, for a random quote, or stop to exit.`;

  response.card('Welcome', content);
  response.say(content);
  response.reprompt('I\m waiting. Just say a notable name or say random quote, or say stop to exit.')
  response.shouldEndSession(false);
});

alexaApp.intent("Randomquote", {
    slots: {},
    utterances: ['Give me a quote', 'random', 'random quote', 'another', 'hit me again']
  },
  function (request, response) {
  var randomQuoteskey = Object.keys(quotesall)[Math.floor(Math.random()*Object.keys(quotesall).length)]; //randomQuoteskey is the quote itself
   let speaker = quotesall[randomQuoteskey]; //quote itself serves are key for value speaker of quote
  let content =  speaker + "said" + randomQuoteskey;
  //let prompt = "Would you like to hear more? You can say another, or stop to exit."
  // **888 --WE NEED TO FIGURE OYT SESSION VARIABLES IE ALEXAAPP SET SESSION OR .SET SESSION VAR OR RES.
  response.card(randomQuoteskey + "-" + speaker);
  response.say(content);
  response.shouldEndSession(true);  
  
  
  
  
 //here goes phone anc other var
//    let givencountry = request.slot('Country');

  //  let selabrev = newcountries[givencountry];
//console.log('speaker:', speaker);

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

alexaApp.intent("Namedquote", {
    slots: {Famousname: 'AMAZON.Name'}, //fullname??
    utterances: ['Give me a {-|Famousname} quote', '{-|Famousname}']
  },
           
    function (request, response) {            
  var reqdname = request.slot('Famousname');
  var quotesome = invert(quotesall);
  var selectednq = quotesome[reqdname];
    if (selectednq){
      let content = reqdname + " once said."+selectednq;
      response.card(selectednq + " -" + reqdname]);
      response.say(content);
      response.shouldEndSession(true);
    } else {
      response.say("I'm sorry, I don't have any quotes from " + reqdname);
      response.shouldEndSession(true);
    }
}
                );

alexaApp.intent("AMAZON.HelpIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
  var HELP_MESSAGE = "Give me a famous name and I'll read you one of their quotes! You can also say random, for a random quote, or stop to exit.";
var HELP_REPROMPT = "Please give me a name, say random, or say stop to exit.";
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
