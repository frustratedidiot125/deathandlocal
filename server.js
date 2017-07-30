let express = require('express');
//let bodyParser = require('body-parser');
let alexa = require('alexa-app');
//let invert = require('lodash.invert');
//let keyBy = require('lodash.keyby');

let statesages = require("./ages2.json");


let alexaApp = new alexa.app('alexa');
let expressApp = express();
alexaApp.express({expressApp: expressApp, router: express.Router(), debug: false, checkCert: true});
///---------


alexaApp.launch( (request, response) => {
  let content = `Hi there! Name a state and  I'll  tell you the minimum driving age there.`;

  response.card('Welcome', content);
  response.say(content);
  response.reprompt('Name a state or say stop to exit.')
  response.shouldEndSession(false);
});

 

alexaApp.intent("Startstate", {
    slots: {State: 'AMAZON.US_STATE'}, //fullname??
    utterances: ['what\'s the driving age in {-|State}', '{-|State}']
  },
           
    function (request, response) {            
  var reqdname = request.slot('State');
 
    var selectednq = statesages[reqdname];
  
  //console.log('selectednq:', selectednq);
  if (selectednq){
      let content = "The minimum driving age in " + reqdname + " is " + selectednq + " years old, with a learner's permit.";
  //console.log('content:', content);  
   // response.card(reqdname, selectednq);
      response.say(content);
      response.shouldEndSession(true);
    } else {
      response.say("I'm sorry, I only know US states. I don't think " + reqdname + " is a valid US state.");
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
  var HELP_MESSAGE = "Name a US state and  I'll try to tell you the minimum driving age there, or You can also say stop to exit. ";
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
