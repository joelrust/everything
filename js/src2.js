/*
 * Constant, tunable params
 */
var mult = 1200;


// Set up click handlers
const startButton = document.querySelector("#startButton");
startButton.onclick = startText;


const audioButton = document.querySelector("#audioButton");
audioButton.onclick = audioLaunch;

var audio = new Audio();

var isFirstClick = true;

//range of wait time in seconds:
var hi = 3;

//floor of wait time in seconds:
var lo = 2;

// pitch range



const wordList= ["In", "this", "short", "Life", "that", "only", "lasts", "an", "hour",
"How", "much", "how", "little", "is", "within", "our", "power"];

const sopranoPitchSets = [
    ["64"],                //0
    ["62", "66"],          //1
    ["66", "69", "69"],    //2
    ["62", "66"],          //3
    ["64"],                //4
    ["64"],                //5
    ];


const altoPitchSets = [
    ["64", "60", "60"],    //0
    ["62", "66"],          //1
    ["66", "62", "62"],    //2
    ["62", "66"],          //3
    ["62"],                //4
    ["61", "61", "64"],    //5

];


const tenorPitchSets = [
    ["57", "60", "60"],    //0
    ["59", "55"],          //1
    ["55", "59", "59"],    //2
    ["59", "55"],          //3
    ["59"],                //4
    ["61", "61", "57"],    //5

];

const bassPitchSets = [
    ["57"],                //0
    ["55", "59"],          //1
    ["55", "52", "52"],    //2
    ["55", "59"],          //3
    ["57"],                //4
    ["57"],                //5

    
];

let currentPitchSetIndex = 0;

function startPiece() {
   
   
    wordChanges();
    voiceTimeouts()
    
   

}
   
   var wordRange = 2;
   var wordLowBound = 0;
   const wordInterval = 4.9;
function wordChanges() {
   setTimeout(function () { wordRange = 3; },    (1 * wordInterval * mult));
   setTimeout(function () { wordRange = 4; },    (2 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 1; }, (3 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 2; }, (4 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 3; }, (5 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 4; }, (6 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 5; }, (7 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 6; }, (8 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 7; }, (9 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 8; }, (10 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 9; }, (11 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 10; }, (12 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 11; }, (13 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 12; }, (14 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 13; }, (15 * wordInterval * mult));
   setTimeout(function () { wordRange = 3; },    (16 * wordInterval * mult));
   setTimeout(function () { wordRange = 2; },    (17 * wordInterval * mult));   
}

function voiceTimeouts() {
   setTimeout(function () { currentPitchSetIndex = 1 }, (24 * mult));
   setTimeout(function () { currentPitchSetIndex = 2 }, (36 * mult));
   setTimeout(function () { currentPitchSetIndex = 3 }, (54 * mult));
   setTimeout(function () { currentPitchSetIndex = 4 }, (66 * mult));
   setTimeout(function () { currentPitchSetIndex = 5 }, (78 * mult));

   setTimeout( function () {
                var e = document.getElementById("demo");
                e.id = "fin";
                document.getElementById("fin").innerHTML = "[stop]";
                document.getElementById("startButton").innerHTML = "Reset";
                countdownTimer = 0;
                countdownSecondsLeft = 0;
                document.getElementById('startButton').setAttribute("onClick", "window.location.reload(true)");
                audio = 0;
            },
            (90 * mult)
        );
   
   //; lo = 5; hi = 9
}

function playAudioChooseWord() {
    // select audio file and play it
    let pitchSets;
    if (part === 'tenor') {
        pitchSets = tenorPitchSets;
    } else if (part === 'bass') {
        pitchSets = bassPitchSets;
    } else if (part === 'alto') {
        pitchSets = altoPitchSets;
    } else if (part === 'soprano') {
        pitchSets = sopranoPitchSets;
    }

    const currentPitchSet = pitchSets[currentPitchSetIndex];
    const pitchNumIndex = Math.floor(Math.random() * currentPitchSet.length);
    const nam = `audio/${currentPitchSet[pitchNumIndex]}.m4a`;
    audio.src = nam;
    audio.play();
    document.getElementById("startButton").innerHTML = "Next";


    
    // choose the word and show it
    var wn = [( Math.floor(Math.random() * wordRange ) + wordLowBound ) ];
    document.getElementById("demo").innerHTML = wordList[wn];
    // uncomment next line for word debugging
    //  + " | " + wn + "/" + wordRange + " | " + nam + " | " + x +"/" + y
}

function startText() {
    document.getElementById("startButton").innerHTML = "wait";

    var countdownSecondsLeft = ([Math.floor(Math.random() * (hi - lo + 1)) + lo] * 1);
    document.getElementById("demo").innerHTML = countdownSecondsLeft;

    if (isFirstClick) {
        // Set off all of the initial timing based stuff on first click only
        isFirstClick = false;
        startPiece();
    }

    var countdownTimer = setInterval(
        function() {
            countdownSecondsLeft -= 1;
            if (countdownSecondsLeft <= 0) {
                // Stop the countdown, and play the audio
                playAudioChooseWord();
                clearInterval(countdownTimer);
            } else {
                // Show the new value of the countdown
                document.getElementById("demo").innerHTML = countdownSecondsLeft;
            }
        },
        1000
    );
};

function audioLaunch() {
    audio.src = "click.mp3";
    audio.play();
}
