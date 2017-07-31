let express = require('express');
let bodyParser = require('body-parser');
let alexa = require('alexa-app');
//let taxes = require("./stax2.json");
//let invert = require('lodash.invert');
//let keyBy = require('lodash.keyby');

//const salesTax = require('state-sales-tax');


let alexaApp = new alexa.app('alexa');
let expressApp = express();
alexaApp.express({expressApp: expressApp, router: express.Router(), debug: false, checkCert: true});
///---------
var taxes = {'Alabama': '4', 'Alaska': '0', 'Arizona': '5.6', 'Arkansas': '6.5', 'California': '7.25', 'Colorado': '2.9', 'Connecticut': '6.35', 'Delaware': '0', 'Florida': '6', 'Georgia': '4', 'Hawaii': '4', 'Idaho': '6', 'Illinois': '6.25', 'Indiana': '7', 'Iowa': '6', 'Kansas': '6.5', 'Kentucky': '6', 'Louisiana': '5', 'Maine': '5.5', 'Maryland': '6', 'Massachusetts': '6.25', 'Michigan': '6', 'Minnesota': '6.875', 'Mississippi': '7', 'Missouri': '4.225', 'Montana': '0', 'Nebraska': '5.5', 'Nevada': '6.85', 'New Hampshire': '0', 'New Jersey': '6.875', 'New Mexico': '5.125', 'New York': '4', 'North Carolina': '4.75', 'North Dakota': '5', 'Ohio': '5.75', 'Oklahoma': '4.5', 'Oregon': '0', 'Pennsylvania': '6', 'Rhode Island': '7', 'South Carolina': '6', 'South Dakota': '4.5', 'Tennessee': '7', 'Texas': '6.25', 'Utah': '5.95', 'Vermont': '6', 'Virginia': '5.3', 'Washington': '6.5', 'West Virginia': '6', 'Wisconsin': '5', 'Wyoming': '4', 'D.C.': '5.75' };


alexaApp.launch( (request, response) => {
  let content = `Name a state and  I'll  tell you the current sales tax!`;

  response.card('Welcome', content);
  response.say(content);
  response.reprompt('Name a state or say stop to exit.')
  response.shouldEndSession(false);
});

 

alexaApp.intent("Taxedstate", {
    slots: {State: 'AMAZON.US_STATE'}, //fullname??
    utterances: ['what\'s the {-|State sales tax','whst\'s tge sales tax in {-|State}', '{-|State}']
  },
           
    function (request, response) {            
  var state = request.slot('State'); //state dobe requested 
//var salesarray = salesTax();
 

  
    var tax = taxes[state]; //magic?
  console.log('state:',state);
  console.log('taxes:',taxes);
  console.log('tax;',tax);
 

  if (tax){
      let content = "The state sales tax on consumer purchases in " + state + " is " + tax + " percent.";
console.log('content:', content);  
   // response.card(reqdname, selectednq);
      response.say(content);
      response.shouldEndSession(true);
    } else {
      response.say("I can't seem to find the sales tax for the state of " + state + " at the moment. I'm sorry,");
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
  var HELP_MESSAGE = "Name a US state and  I'll tell you the sales tax, You can also say stop to exit. ";
var HELP_REPROMPT = "Name a state or say stop to exit.";
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
