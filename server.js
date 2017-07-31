let express = require('express');
let bodyParser = require('body-parser');
let alexa = require('alexa-app');
//let invert = require('lodash.invert');
//let keyBy = require('lodash.keyby');

//const salesTax = require('state-sales-tax');


let alexaApp = new alexa.app('alexa');
let expressApp = express();
alexaApp.express({expressApp: expressApp, router: express.Router(), debug: false, checkCert: true});
///---------
let salestaxes = require('./stax2.json');


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
  var reqdname = request.slot('State'); //state dobe requested 
//var salesarray = salesTax();
 

  
    var selectednq = salestaxes[reqdname];
  
  console.log('selectednq;',selectednq);
 
console.log('selectednq:', selectednq);
  if (selectednq){
      let content = "The state sales tax on consumer purchases in " + reqdname + " is " + selectednq + " percent.";
console.log('content:', content);  
   // response.card(reqdname, selectednq);
      response.say(content);
      response.shouldEndSession(true);
    } else {
      response.say("I'm sorry, I only know sales tax in states. Either " + reqdname + " isn't a US state, or there's something terribly wrong with my servers.");
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
