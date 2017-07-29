let express = require('express');
let bodyParser = require('body-parser');
let alexa = require('alexa-app');
let phonecodes = require("./phone.json");
let countries = require("./names.json");

let alexaApp = new alexa.app('alexa');

let expressApp = express();

alexaApp.express({expressApp: expressApp, router: express.Router(), debug: false, checkCert: true});

alexaApp.launch( (request, response) => {
  let content = `Welcome to phone Buddy! Give me a country name and I\'ll give you the international calling code!'

  response.card('Welcome', content);
  response.say(content);
  response.reprompt('Please Give me a country name, for instance, Canada.')
  response.shouldEndSession(false);
});

alexaApp.intent("ColorToHex", {
    slots: {Color: 'AMAZON.Color'},
    utterances: ['What is {-|Color}', 'What is Hex for {-|Color}']
  },
  function (request, response) {
    
  
 //here goes phone anc other var
    let color = request.slot('Color');

    let selectedColor = colors[color];

    console.log('color:', color);

    if (selectedColor) {
      response.say(`The hex value for ${color} is <say-as interpret-as='spell-out'>${selectedColor}</say-as>`);
      response.shouldEndSession(true);
    }
    else {
      response.say(`Sorry, I'm not sure what the hex value is for ${color}`);
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
  var HELP_MESSAGE = "Just ask me for a color's hex value by saying, What is Blue or What is Hex for Blue, and I'll give it to you.";
var HELP_REPROMPT = "Please ask me for a hex value by asking What is Hex for Red?";
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
    response.say("Thank you for trying Palette Buddy. Have a great day!").shouldEndSession(true);
  }
 );

alexaApp.intent("AMAZON.CancelIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Thank you for trying Palette Buddy. Goodbye!").shouldEndSession(true);
  }
 );

alexaApp.sessionEnded( (request, response) => {
  let content = 'Thank you for trying Palette Buddy. Have a great day!';
  response.card('Session Ended', content);
  response.say(content);
});



expressApp.listen(process.env.PORT || 5000, function() {
    console.log('Palette Buddy Running');
});
