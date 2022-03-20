const SEA_LEVEL = .85;
const START_LIVES = 20;

var score;
var startGame = false;
var scoreText;
var infoText;
var graphics;
var backgroundShown = false;
var player;
var sh = 4;
var lives = 20;
var width = 800;
var livesText;
var savedText;
var saved = 0;
var savedPercent = 0;
var height = 500;
var grey = 0xAAAAAA;
var white = 0xFFFFFF;
var yellow = 0xFFFF55;
var blood = 0xAA0000;
var blue = 0x0041FF;
var pink = 0xFF5555;

var scientists;
var sharks;
var stars;
var bloodDrops;
var waterDrops;

const introText = 
'****************************** SPACE STATION ZERO ******************************\n' +
  '                   Yet another awesome game directed and produced by\n' +
  '************************* David Maxwell copyright 10/17/90 *************************\n' +
  'Here\'s the story:\n' +
  'Space Station Zero is an upper atmospheric experimental laboratory containing 20\n' +
  'of the world leading scientists. One chilly December night, ice developed in the\n' +
  'intake valves of the station\'s main support system.The station\'s fuselage was torn\n' +
  'wide open by a oxygen hose that had snapped loose and was thrashing about.\n\n' +
  'The main bay blew open and spilled all of the scientists out into the cold night air,\n' +
  'thousands of feet above the North Atlantic. Sharks, intrigued by the falling debris,\n' +
  'have gathered to inspect in hope of a free late night snack. You are Hans Gruber,\n' +
  'Captain of the S1-50 Air-to-Air Rescue Unit out of Norway. You must catch the\n' +
  'falling scientists and whenever possible, bomb the sharks. If you fail, the world\'s\n'+
  'greatest minds will be shark bait or forever lost in the icy waters.\n\n' +
 
  'To maneuver the S1-50:\n' +
  'Press up arrow to thrust up\n' +
  'Press left arrow to go left\n' +
  'Press right arrow to right\n' +
  'Press spacebar to drop bombs\n' +
  'Good Luck, Captain Gruber. You will need it!!\n\n' +
  '                                        Press SPACE key to begin';

  const GameOverText = 
'              G A M E  O V E R\n\n' +
'YOU HAVE FAILED YOUR MISSION!';
