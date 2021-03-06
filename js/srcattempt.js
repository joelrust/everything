/*
 * Constant, tunable params
 */
var mult = 1.5;
var wordRange = 25;
var wordLowBoundsInitial = 10;
var wordLowBounds = wordLowBoundsInitial;
var expo = 1.25;

// Set up click handlers
const startButton = document.querySelector("#startButton");
startButton.onclick = startText;

//function startTenor() {
//    part = 'tenor'
//    startText();
//}

const audioButton = document.querySelector("#audioButton");
audioButton.onclick = audioLaunch;

// has been checked as far as 'lancashire':
var audio = new Audio();

var isFirstClick = true;

//range of wait time in seconds:
var hi = 10;

//floor of wait time in seconds:
var lo = 5;

// pitch range



const tenorParamsArr = [
    {pitchSetIndex: 0 , nextTimeout: (8000 * mult) },
    {pitchSetIndex: 1 , nextTimeout: (16000 * mult) }
];
const tenorPitchSets = [
    ["49"],                              // 0
    ["51", "49"],                        // 1
    ["53", "51", "49"],
    ["55", "53", "51", "49"],
    ["56", "53", "51"],
    ["56", "54", "53", "51"],
    ["57", "54", "53", "51"],
    ["57", "56"],
    ["57", "56", "52", "50"],
    ["57", "54", "52", "50"],
    ["57", "55", "54", "52"],
    ["57", "55", "52"],
    ["57", "55"],
    ["57"],
    ["60", "57"],
    ["60", "58", "57"],
    ["62", "60", "58", "57"],
    ["60", "58"],
    ["60", "58", "56"],
    ["60", "58", "56", "54"],
    // start of p. 5
    ["64", "62"],
    ["63", "61", "60", "58", "57"],
    ["62", "61", "59", "58", "56", "54"],
];

const bassPitchSets = [
    ["49"],
    ["49", "48"],
    ["49", "48", "46"],
    ["49", "46", "44"],
    ["49", "47", "46", "44"],
    ["49", "47", "44"],
    ["49", "47", "45", "44"],
    ["45", "44"],
    ["50", "48", "45", "44"],
    ["50", "48", "47", "45"],
    ["52", "50", "48", "47"],
    ["52", "50", "48"],
    ["52", "48"],
    ["48"],
    ["50", "48"],
    ["53", "50", "48"],
    ["55", "53", "50", "48"],
    ["53", "51"],
    ["53", "51", "49"],
];

let currentPitchSetIndex = 0;

function startPiece() {
    setInterval(
        function () { wordRange *= expo; wordLowBounds *= expo },
        (15000 * mult)
    );

    if (part === 'tenor') {
        var paramsArr = tenorParamsArr ;
    } else if (part === 'bass') {
        var paramsArr = bassParamsArr ;
    } else if (part === 'alto') {
        var paramsArr = altoParamsArr ;
    } else if (part === 'soprano') {
        var paramsArr = sopranoParamsArr ;
    }
    constructSetTimeout();

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
    const nam = `audio/${currentPitchSet[pitchNumIndex]}.mp3`;
    audio.src = nam;
    audio.play();
    document.getElementById("startButton").innerHTML = "Next";

    // choose the word and show it
    var wn = [( Math.floor(Math.random() * (wordRange - wordLowBounds + wordLowBoundsInitial)
        + wordLowBounds - wordLowBoundsInitial)) % wordlist.length
    ];
    document.getElementById("demo").innerHTML = wordlist[wn];
    // uncomment next line forword debugging
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


function constructSetTimeout() {
     if (paramsArr.length === 0) {
         resetPiece();
     } else {
         const currentParams = paramsArr.shift();  // this might be wrong
         // set the params for the globals
         const currentPitchSetIndex = currentParams.pitchSetIndex;
         // call myself
         setTimeout(function() { constructSetTimeOut(paramsArr) }, currentParams.nextTimeout);
     }
 }


function resetPiece() {
    var e = document.getElementById("demo");
    e.id = "fin";
    document.getElementById("fin").innerHTML = "[stop]";
    document.getElementById("startButton").innerHTML = "Reset";
    countdownTimer = 0;
    countdownSecondsLeft = 0;
    document.getElementById('startButton').setAttribute("onClick", "window.location.reload(true)");
    audio = 0;
    document.getElementById("dyn").innerHTML = "—";
}

function doTenorTimeouts() {
    setTimeout(function () {
        setTimeout(function () { currentPitchSetIndex = 1 }, (8000 * mult));
        setTimeout(function () { currentPitchSetIndex = 2 }, (16000 * mult));
        setTimeout(function () { currentPitchSetIndex = 3}, (28000 * mult));
        setTimeout(function () { lo = 4; hi = 9 }, (30000 * mult));
        setTimeout(function () { currentPitchSetIndex = 4 }, (36000 * mult));
        setTimeout(function () { currentPitchSetIndex = 5; hi = 8; lo = 4 }, (42000 * mult));
        setTimeout(function () { currentPitchSetIndex = 6; }, (48000 * mult));
        setTimeout(function () { currentPitchSetIndex = 7; hi = 7 }, (60000 * mult));
        setTimeout(function () { currentPitchSetIndex = 8; }, (68000 * mult));
        setTimeout(function () { currentPitchSetIndex = 9; }, (76000 * mult));
        setTimeout(function () { currentPitchSetIndex = 10; hi = 6; lo = 3 }, (84000 * mult));
        setTimeout(function () { currentPitchSetIndex = 11; hi = 5 }, (90000 * mult));
        setTimeout(function () { currentPitchSetIndex = 12; }, (96000 * mult));
        setTimeout(function () {
            currentPitchSetIndex = 13;
            hi = 4;
            document.getElementById("dyn").innerHTML = "mp"
        }, (102000 * mult));
        setTimeout(function () {
            currentPitchSetIndex = 14;
        }, (114000 * mult));
        setTimeout(function () {
            hi = 4;
            lo = 2
        }, (120000 * mult));
        setTimeout(function () {
            currentPitchSetIndex = 15;
        }, (130000 * mult));
        setTimeout(function () {
            currentPitchSetIndex = 16;
            hi = 3
        }, (142000 * mult));
        setTimeout(function () {
            currentPitchSetIndex = 17;
            lo = 1
        }, (150000 * mult));
        setTimeout(function () {
            currentPitchSetIndex = 18;
        }, (166000 * mult));
        setTimeout(function () {
            currentPitchSetIndex = 19;
        }, (172000 * mult));
        setTimeout(function () {
            currentPitchSetIndex = 20;
            hi = 18;
            lo = 18
        }, (180000 * mult));
        setTimeout(function () {
            hi = 17;
            lo = 17
        }, (181000 * mult));
        setTimeout(function () {
            hi = 15;
            lo = 15
        }, (182000 * mult));
        setTimeout(function () {
            hi = 14;
            lo = 14
        }, (183000 * mult));
        setTimeout(function () {
            hi = 12;
            lo = 12
        }, (184000 * mult));
        setTimeout(function () {
            hi = 11;
            lo = 11
        }, (185000 * mult));
        setTimeout(function () {
            hi = 9;
            lo = 9
        }, (186000 * mult));
        setTimeout(function () {
            hi = 8;
            lo = 8
        }, (187000 * mult));
        setTimeout(function () {
            hi = 6;
            lo = 6
        }, (188000 * mult));
        setTimeout(function () {
            hi = 5;
            lo = 5
        }, (189000 * mult));
        setTimeout(function () {
            hi = 3;
            lo = 3
        }, (190000 * mult));
        setTimeout(function () {
            hi = 2;
            lo = 2
        }, (191000 * mult));
        setTimeout(function () {
            hi = 27;
            lo = 27
        }, (192000 * mult));
        setTimeout(function () {
            hi = 26;
            lo = 26
        }, (193000 * mult));
        setTimeout(function () {
            hi = 24;
            lo = 24
        }, (194000 * mult));
        setTimeout(function () {
            hi = 23;
            lo = 23
        }, (195000 * mult));
        setTimeout(function () {
            hi = 21;
            lo = 21
        }, (196000 * mult));
        setTimeout(function () {
            hi = 20;
            lo = 20
        }, (197000 * mult));
        setTimeout(function () {
            currentPitchSetIndex = 21;
            hi = 18;
            lo = 18
        }, (198000 * mult));
        setTimeout(function () {
            hi = 17;
            lo = 17
        }, (199000 * mult));
        setTimeout(function () {
            hi = 15;
            lo = 15
        }, (200000 * mult));
        setTimeout(function () {
            hi = 14;
            lo = 14
        }, (201000 * mult));
        setTimeout(function () {
            hi = 12;
            lo = 12
        }, (202000 * mult));
        setTimeout(function () {
            hi = 11;
            lo = 11
        }, (203000 * mult));
        setTimeout(function () {
            hi = 9;
            lo = 9
        }, (204000 * mult));
        setTimeout(function () {
            hi = 8;
            lo = 8
        }, (205000 * mult));
        setTimeout(function () {
            hi = 6;
            lo = 6
        }, (206000 * mult));
        setTimeout(function () {
            hi = 5;
            lo = 5
        }, (207000 * mult));
        setTimeout(function () {
            hi = 3;
            lo = 3
        }, (208000 * mult));
        setTimeout(function () {
            hi = 2;
            lo = 2
        }, (209000 * mult));
        setTimeout(function () {
            document.getElementById("dyn").innerHTML = "mf"
        }, (210000 * mult));
        setTimeout(function () {
            currentPitchSetIndex = 22;
            hi = 18;
            lo = 18
        }, (218000 * mult));
        setTimeout(function () {
            hi = 17;
            lo = 17
        }, (219000 * mult));
        setTimeout(function () {
            hi = 15;
            lo = 15
        }, (220000 * mult));
        setTimeout(function () {
            hi = 14;
            lo = 14
        }, (221000 * mult));
        setTimeout(function () {
            hi = 12;
            lo = 12
        }, (222000 * mult));
        setTimeout(function () {
            hi = 11;
            lo = 11
        }, (223000 * mult));
        setTimeout(function () {
            hi = 9;
            lo = 9
        }, (224000 * mult));
        setTimeout(function () {
            hi = 8;
            lo = 8
        }, (225000 * mult));
        setTimeout(function () {
            hi = 6;
            lo = 6
        }, (226000 * mult));
        setTimeout(function () {
            hi = 5;
            lo = 5
        }, (227000 * mult));
        setTimeout(function () {
            hi = 3;
            lo = 3
        }, (228000 * mult));
        setTimeout(function () {
            hi = 2;
            lo = 2
        }, (229000 * mult));
        setTimeout(function () {
            document.getElementById("dyn").innerHTML = "f"
        }, (230000 * mult));
        setTimeout(
            function () {
                var e = document.getElementById("demo");
                e.id = "fin";
                document.getElementById("fin").innerHTML = "[stop]";
                document.getElementById("startButton").innerHTML = "Reset";
                countdownTimer = 0;
                countdownSecondsLeft = 0;
                document.getElementById('startButton').setAttribute("onClick", "window.location.reload(true)");
                audio = 0;
                document.getElementById("dyn").innerHTML = "—";
            },
            (240000 * mult)
        );
    }, 5000);
}

function doBassTimeouts()  {
    setTimeout(function(){
        setTimeout(function(){y += x; x = 2},  (6000 * mult));
        setTimeout(function(){y += x; x = 3; hi = 9}, (12000 * mult));
        setTimeout(function(){y += x; x = 3}, (24000 * mult));
        setTimeout(function(){y += x; x = 4; hi = 8; lo = 4}, (30000 * mult));
        setTimeout(function(){y += x; x = 3}, (42000 * mult));
        setTimeout(function(){y += x; x = 4; hi = 7}, (48000 * mult));
        setTimeout(function(){y += x; x = 2; hi = 6; lo = 3}, (60000 * mult));
        setTimeout(function(){y += x; x = 4}, (68000 * mult));
        setTimeout(function(){y += x; x = 4; hi = 5}, (80000 * mult));
        setTimeout(function(){y += x; x = 4}, (88000 * mult));
        setTimeout(function(){hi = 4; lo = 2; document.getElementById("dyn").innerHTML = "mp" }, (90000 * mult));
        setTimeout(function(){y += x; x = 3}, (93000 * mult));
        setTimeout(function(){y += x; x = 2}, (99000 * mult));
        setTimeout(function(){y += x; x = 1; hi = 3}, (105000 * mult));
        setTimeout(function(){y += x; x = 2}, (117000 * mult));
        setTimeout(function(){hi = 3; lo = 1}, (120000 * mult));
        setTimeout(function(){y += x; x = 3; hi = 2}, (132000 * mult));
        setTimeout(function(){y += x; x = 4;}, (144000 * mult));
        setTimeout(function(){y += x; x = 2; hi = 1}, (150000 * mult));
        setTimeout(function(){y += x; x = 3; hi = 2}, (166000 * mult));
        setTimeout(function() {var e = document.getElementById("demo"); e.id = "fin"; document.getElementById("fin").innerHTML = "[stop]"; document.getElementById("clicker").innerHTML = "Reset"; countdownTimer = 0; countdownSecondsLeft = 0; document.getElementById('clicker').setAttribute( "onClick", "window.location.reload(true)" ) ; audio = 0;  document.getElementById("dyn").innerHTML = "—";   }, (180000 * mult));
    }, 5000);
}
