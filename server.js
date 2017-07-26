let express = require('express');
let bodyParser = require('body-parser');
let alexa = require('alexa-app');

let alexaApp = new alexa.app('alexa');

let expressApp = express();

alexaApp.express({expressApp: expressApp, router: express.Router(), debug: false, checkCert: true});

alexaApp.launch( (request, response) => {
  let content = `Welcome to Palette Buddy!
    Ask me for a color's hex value by saying, What is Blue or What is Hex for Blue?`;
  response.card('Welcome', content);
  response.say(content);
  response.reprompt('Please ask me for a hex value by asking What is Hex for Red?')
  response.shouldEndSession(false);
});

alexaApp.intent(
  'ColorToHex',
  {
    slots: {Color: 'AMAZON.Color'},
    utterances: ['What is {-|Color}', 'ColorToHex What is Hex for {-|Color}']
  },
  (request, response) => {
    let colors = {
      'black' : '000000',
      'white' : 'ffffff',
      'red'   : 'ff0000',
      'green' : '00ff00',
      'blue'  : '0000ff',
      'maroon' : '800000',
      'violet' : 'EE82EE'
    };

    let color = request.slot('Color');

    let selectedColor = colors[color];

    console.log('color:', color);

    if (selectedColor) {
      response.say(`The hex value for ${color} is <say-as interpret-as='spell-out'>${selectedColor}</say-as>`);
      response.shouldEndSession(true);
    }
    else {
      response.say(`Sorry, I'm not sure what the hex value is for ${color}`);
      response.shouldEndSession(false);
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
    response.say("Ok.").shouldEndSession(true);
  }
 );

alexaApp.intent("AMAZON.CancelIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Cancelling.").shouldEndSession(true);
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
