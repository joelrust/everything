var mult = 1300;

// Set up click handlers
const startButton = document.querySelector("#startButton");
startButton.onclick = startText;

var audio = new Audio();

var isFirstClick = true;

//ceiling of wait time in seconds:
var hi = 2;

//floor of wait time in seconds:
var lo = 2;

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

   var wordRange = 1;
   var wordLowBound = 0;
   const wordInterval = 4.85;
function wordChanges() {
   setTimeout(function () { wordLowBound = 1; }, (1 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 2; }, (2 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 3; }, (3 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 4; }, (4 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 5; }, (5 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 6; }, (6 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 7; }, (7 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 8; }, (8 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 9; }, (10 * wordInterval * mult));   //48.5
   setTimeout(function () { wordLowBound = 10; }, (11 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 11; }, (12 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 12; }, (13 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 13; }, (14 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 14; }, (15 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 15; }, (16 * wordInterval * mult));
   setTimeout(function () { wordLowBound = 16; }, (17 * wordInterval * mult));
//   setTimeout(function () { wordLowBound = 1; },    (17 * wordInterval * mult));
}

function voiceTimeouts() {
   setTimeout(function () { currentPitchSetIndex = 1; hi = 3; lo = 3 }, (24 * mult));
   setTimeout(function () { currentPitchSetIndex = 2; hi = 1; lo = 1 }, (36 * mult));
   setTimeout(function () { hi = 8; lo = 8 }, (43.5 * mult));
   setTimeout(function () { hi = 7; lo = 7 }, (44.5 * mult));
   setTimeout(function () { hi = 5; lo = 5 }, (45.5 * mult));
   setTimeout(function () { hi = 4; lo = 4 }, (46.5 * mult));
   setTimeout(function () { hi = 3; lo = 3 }, (47.5 * mult));
   setTimeout(function () { hi = 2; lo = 2 }, (48.5 * mult));
   setTimeout(function () { currentPitchSetIndex = 3 }, (54 * mult));
   setTimeout(function () { currentPitchSetIndex = 4; hi = 3; lo = 3 }, (66 * mult));
   setTimeout(function () { currentPitchSetIndex = 5; hi = 2; lo = 2 }, (80 * mult));
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
    let volume = document.querySelector("#volu");
    // audio.volume = 0.33;
    volume.addEventListener("change", function(e) {
   audio.volume = e.currentTarget.value / 48;
   });
    audio.play();
    document.getElementById("startButton").innerHTML = "Next";

    // choose the word and show it
    var wn = [( Math.floor(Math.random() * wordRange ) + wordLowBound ) ];
    document.getElementById("demo").innerHTML = wordList[wn];
}

function doNothing() {
	}

function startText() {
    document.getElementById("startButton").innerHTML = "wait";
    startButton.onclick = doNothing;

    var countdownSecondsLeft = ([Math.floor(Math.random() * (hi - lo + 1)) + lo] * 1);
    document.getElementById("demo").innerHTML = countdownSecondsLeft;
    //next two lines to test
   //                   var debugTimer = ((countdownSecondsLeft + 3) * 1000);
     //                 setTimeout(startText, debugTimer);
    // end of test
    if (isFirstClick) {
        audioLaunch();

        // Set off all of the initial timing based stuff on first click only
        isFirstClick = false;
        startPiece();
    }

    var countdownTimer = setInterval(
        function() {
            countdownSecondsLeft -= 1;
            if (countdownSecondsLeft <= 0) {
                // Stop the countdown, and play the audio
                startButton.onclick = startText;

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

 let volume = document.querySelector("#volu");
audio.volume = 0.33;
 volume.addEventListener("change", function(e) {
audio.volume = e.currentTarget.value / 48;
});


    audio.src = "click.mp3";

    audio.play();
}
