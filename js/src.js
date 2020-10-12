/*
 * Constant, tunable params
 */
var mult = 1500;
var wordRange = 25;
var wordLowBoundsInitial = 10;
var wordLowBounds = wordLowBoundsInitial;
var expo = 1.25;

// Set up click handlers
const startButton = document.querySelector("#startButton");
startButton.onclick = startText;

function startTenor() {
    part = 'tenor';
    startText();
}

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

const lengthSets = [
    ["·"],          // 0
    ["·","·","—"],  // 1
    ["·","—","—"],  // 2
    ["—"],          // 3
    ["—","—","𝄐"],  // 4
    ["—","𝄐","𝄐"],  // 5
    ["𝄐"],          // 6
    ["·","—","𝄐"],  // 7
];

const sopranoPitchSets = [
    ["61"],                     //0
    ["63", "61"],
    ["65", "63", "61"],         //2
    ["67", "65", "63", "61"],
    ["68", "65", "63"],         //4
    ["68", "66", "65", "63"],
    ["69", "66", "65", "63"],   //6
    ["69", "68"],
    ["69", "68", "64", "62"],   //8
    ["69", "66", "64", "62"],
    ["69", "67", "66", "64"],   //10
    ["67", "66", "64"],
    ["66", "64"],               //12
    ["66"],
    //
    ["67", "66"],               //14
    ["69", "67"],
    ["69", "67", "65"],         //16
    ["70", "69", "67"],
    ["72", "70"],               //18
    ["73", "72", "70"],
    ["73"],                     //20
    ["74", "73"],
    ["76", "74", "73"],         //22
    ["76", "74"],               //23
    ["76"],                     //24
    ["76", "71"],               //25
    ["71", "65"],               //26
    ["61"],                     //27
    ["63"],                     //28
    ["61", "65", "65"],         //29
    ["63", "65"],               //30   
    ["63", "67", "67"],         //31
    ["67", "65"],               //32
    ["69", "65"],               //33
    ["71", "67"],               //34
    ["67h", "69h"],     
    ["73h", "74h", "75h"]       //36
    ];


const altoPitchSets = [
    ["61"],                         // 0
    ["61", "60"],                   // 1                                                
    ["61", "60", "58"],             //2
    ["61", "58", "56"],             // 3
    ["61", "59", "58", "56"],        //4
    ["61", "59", "56"],
    ["61", "59", "57", "56"],       // 6
    ["57", "56"],
    ["62", "60", "57", "56"],       // 8
    ["62", "60", "59", "57"],
    ["64", "62", "60", "59"],       // 10
    // diverge
    ["64", "62", "59"],
    ["62", "59"],                   // 12
    ["59"],
    ["64", "59"],                   // 14
    ["65", "64"],
    ["65", "64", "62"],             // 16
    ["67", "65", "62"],
    ["65", "63"],                   // 18
    ["66", "65", "63"],
    ["68", "66", "65", "63"],       // 20
    ["73"],
    ["65", "67", "69", "71"],
    ["73"],
    ["65", "67", "69", "70", "72"], // 24
    ["73"],
    ["64", "66", "68", "70", "71"], // 26
    ["73", "74"],
    ["74"],
    ["65", "60"],                   // 29
    ["60"],
    ["60", "61"],                   // 31
    ["60", "63"],
    ["60", "62"],                   // 33
    ["60", "64"],
    ["62h", "65h"],                 // 35
    ["67h", "69h", "71h"]
];


const tenorPitchSets = [
    ["49"],                              // 0
    ["51", "49"],                        // 1
    ["53", "51", "49"],                  // 2
    ["55", "53", "51", "49"],            // 3
    ["56", "53", "51"],                  // 4
    ["56", "54", "53", "51"],            // 5
    ["57", "54", "53", "51"],            // 6
    ["57", "56"],                        // 7
    ["57", "56", "52", "50"],            // 8
    ["57", "54", "52", "50"],            // 9
    ["57", "55", "54", "52"],            // 10
    ["57", "55", "52"],                  // 11
    ["57", "55"],                        // 12
    ["57"],                              // 13
    ["60", "57"],                        // 14
    ["60", "58", "57"],                  // 15
    ["62", "60", "58", "57"],            // 16
    ["60", "58"],                        // 17
    ["60", "58", "56"],                  // 18
    ["60", "58", "56", "54"],            // 19
    ["64", "62"],                        // 20
    ["63", "61", "60", "58", "57"],      // 21
    ["62", "61", "59", "58", "56", "54"],// 22
    ["60", "55"],                        // 23
    ["60"],                              // 24
    ["60", "58"],                        // 25
    ["60", "56"],                        // 26
    ["60", "58"],                        // 27
    ["60", "57"],                        // 28
    ["59h", "55h"],                      // 29
    ["59h", "62h", "65h"]                // 30
];

const bassPitchSets = [
    ["49"],                             // 0
    ["49", "48"],                       // 1
    ["49", "48", "46"],
    ["49", "46", "44"],                 // 3
    ["49", "47", "46", "44"],
    ["49", "47", "44"],                 // 5
    ["49", "47", "45", "44"],
    ["45", "44"],                       // 7
    ["50", "48", "45", "44"],
    ["50", "48", "47", "45"],           // 9
    ["52", "50", "48", "47"],
    ["52", "50", "48"],                 // 11
    ["52", "48"],
    ["48"],                             // 13
    ["50", "48"],
    ["53", "50", "48"],                 // 15
    ["55", "53", "50", "48"],
    ["53", "51"],                       // 17
    ["53", "51", "49"],
    ["61", "59", "57"],              // p4 19
    ["48", "49", "51", "53", "55"],
    ["44", "46", "47", "49", "50", "52"],   // 21
    ["45", "50"],                    // p5
    ["50", "55"],                       // 23
    ["58"],
    ["56"],                             // 25
    ["54", "54", "58"],
    ["53", "53", "56"],                 // 27
    ["51", "55"],
    ["50", "53"],                       // 29
    ["43h", "50h"],     
    ["43h", "50h", "55h"]               //31
    
];

let currentPitchSetIndex = 0;
let currentLengthSetIndex = 3;

function startPiece() {
    setInterval(
        function () { wordRange *= expo; wordLowBounds *= expo },
        (15 * mult)
    );
    doLengthTimeouts();
    if (part === 'tenor') {
        doTenorTimeouts();
    } else if (part === 'bass') {
        doBassTimeouts();
    }else if (part === 'alto') {
        doAltoTimeouts();
    }else if (part === 'soprano') {
        doSopranoTimeouts();
    }

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

   const currentLengthSet = lengthSets[currentLengthSetIndex];

    var ln = [Math.floor(Math.random() * currentLengthSet.length)];
    document.getElementById("length").innerHTML = currentLengthSet[ln];
    
    // choose the word and show it
    var wn = [( Math.floor(Math.random() * (wordRange - wordLowBounds + wordLowBoundsInitial)
        + wordLowBounds - wordLowBoundsInitial)) % wordlist.length
    ];
    document.getElementById("demo").innerHTML = wordlist[wn];
    // uncomment next line for word debugging
    //  + " | " + wn + "/" + wordRange + " | " + nam + " | " + x +"/" + y
}

function startText() {
    document.getElementById("startButton").innerHTML = "wait";
    document.getElementById("length").innerHTML = "&nbsp;";

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






// function constructSetTimeout(paramsArr) {
//     if (paramsArray.length === 0) {
//         return;
//     } else {
//         const currentParams = paramsArr.pop();  // this might be wrong
//         // set the params for the globals
//         currentPitchSetIndex = currentParams.pitchSetIndex;
//         // call myself
//         setTimeout(function() { constructSetTimeOut(paramsArr) }, currentParams.nextTimeout)
//     }
// }

function doLengthTimeouts() {
    setTimeout(function () {
       setTimeout(function () { currentLengthSetIndex = 3 }, (0 * mult));
       setTimeout(function () { currentLengthSetIndex = 2 }, (42 * mult));
       setTimeout(function () { currentLengthSetIndex = 1 }, (76 * mult));
       setTimeout(function () { currentLengthSetIndex = 2 }, (90 * mult));
       setTimeout(function () { currentLengthSetIndex = 3 }, (102 * mult));
       setTimeout(function () { currentLengthSetIndex = 4 }, (120 * mult));
       setTimeout(function () { currentLengthSetIndex = 7 }, (144 * mult));
       setTimeout(function () { currentLengthSetIndex = 3 }, (180 * mult));
       setTimeout(function () { currentLengthSetIndex = 0 }, (248 * mult));
       setTimeout(function () { currentLengthSetIndex = 1 }, (254 * mult));
       setTimeout(function () { currentLengthSetIndex = 2 }, (264 * mult));
       setTimeout(function () { currentLengthSetIndex = 3 }, (276 * mult));
       setTimeout(function () { currentLengthSetIndex = 4 }, (286 * mult));
       setTimeout(function () { currentLengthSetIndex = 5 }, (300 * mult));
       setTimeout(function () { currentLengthSetIndex = 6 }, (316 * mult));
    }, 5000);
}    

function doSopranoTimeouts() {
    setTimeout(function () {
        setTimeout(function () { currentPitchSetIndex = 1 }, (8 * mult));
        setTimeout(function () { currentPitchSetIndex = 2 }, (16 * mult));
        setTimeout(function () { currentPitchSetIndex = 3}, (28 * mult));
        setTimeout(function () { hi = 9 }, (30 * mult));
        setTimeout(function () { currentPitchSetIndex = 4 }, (36 * mult));
        setTimeout(function () { currentPitchSetIndex = 5; }, (42 * mult));
        setTimeout(function () { currentPitchSetIndex = 6; }, (48 * mult));
        setTimeout(function () { currentPitchSetIndex = 7; hi = 8; lo = 4 }, (60 * mult));
        setTimeout(function () { currentPitchSetIndex = 8; }, (68 * mult));
        setTimeout(function () { currentPitchSetIndex = 9; }, (76 * mult));
        setTimeout(function () { currentPitchSetIndex = 10; }, (84 * mult));
        setTimeout(function () { currentPitchSetIndex = 11; hi = 7; lo = 4 }, (90 * mult));
        setTimeout(function () { currentPitchSetIndex = 12; }, (96 * mult));
        setTimeout(function () { currentPitchSetIndex = 13; }, (102 * mult));
        setTimeout(function () { currentPitchSetIndex = 14}, (110 * mult));
        setTimeout(function () { currentPitchSetIndex = 15}, (118 * mult));        
        setTimeout(function () { hi = 6; lo = 3;document.getElementById("dyn").innerHTML = "mp"}, (120 * mult));
        setTimeout(function () { currentPitchSetIndex = 16}, (124 * mult));
        setTimeout(function () { currentPitchSetIndex = 17; hi = 5 }, (130 * mult));
        setTimeout(function () { currentPitchSetIndex = 18; lo = 2; hi = 4 }, (150 * mult));
        setTimeout(function () { currentPitchSetIndex = 19 }, (166 * mult));

        setTimeout(function () { currentPitchSetIndex = 20; hi = 3}, (180 * mult));
        setTimeout(function () { lo = 1}, (192 * mult));
        setTimeout(function () { document.getElementById("dyn").innerHTML = "mf"}, (204 * mult));
        setTimeout(function () { hi = 2}, (210 * mult));
        setTimeout(function () { document.getElementById("dyn").innerHTML = "f"}, (222 * mult));
        setTimeout(function () { currentPitchSetIndex = 21 }, (232 * mult));
        setTimeout(function () { currentPitchSetIndex = 22 }, (236 * mult));
        // 23 not in use
        setTimeout(function () { currentPitchSetIndex = 24 }, (240 * mult));
        setTimeout(function () { currentPitchSetIndex = 25 }, (248 * mult));
        setTimeout(function () { currentPitchSetIndex = 26 }, (254 * mult));
        setTimeout(function () { hi = 6; lo = 6 }, (260 * mult));
        setTimeout(function () { hi = 5; lo = 5 }, (261 * mult));
        setTimeout(function () { hi = 3; lo = 3 }, (262 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (263 * mult));
        setTimeout(function () { currentPitchSetIndex = 27 }, (264 * mult));
        setTimeout(function () { currentPitchSetIndex = 28; hi = 6;lo =  4; document.getElementById("dyn").innerHTML = "mf"}, (270 * mult));
        setTimeout(function () { currentPitchSetIndex = 29}, (276 * mult));
        setTimeout(function () { currentPitchSetIndex = 30;hi = 7;lo =  5; document.getElementById("dyn").innerHTML = "mp"}, (282 * mult));
        setTimeout(function () { currentPitchSetIndex = 31 }, (286 * mult));        
        setTimeout(function () { currentPitchSetIndex = 32;hi = 8;lo =  5; document.getElementById("dyn").innerHTML = "p"}, (290 * mult));
        setTimeout(function () { currentPitchSetIndex = 33 }, (294 * mult));                
        setTimeout(function () { hi = 8;lo =  6; document.getElementById("dyn").innerHTML = "pp"}, (298 * mult));
        setTimeout(function () { currentPitchSetIndex = 34 }, (303 * mult));                
        setTimeout(function () { currentPitchSetIndex = 35;hi = 7;lo =  5; document.getElementById("dyn").innerHTML = "p"}, (314 * mult));
        setTimeout(function () { hi = 6;lo =  4; document.getElementById("dyn").innerHTML = "mp"}, (326 * mult));
        setTimeout(function () { currentPitchSetIndex = 36;hi = 5;lo =  3; document.getElementById("dyn").innerHTML = "mf"}, (334 * mult));
        setTimeout(function () { hi = 4;lo =  2; document.getElementById("dyn").innerHTML = "f"}, (344 * mult));
        setTimeout(function () { hi = 3;lo =  1; document.getElementById("dyn").innerHTML = "ff"}, (352 * mult));
    
        setTimeout( function () {
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
            (354 * mult)
        );
    }, 5000);
}    

function doAltoTimeouts() {
    setTimeout(function () {
        setTimeout(function () { currentPitchSetIndex = 1 }, (6 * mult));
        setTimeout(function () { currentPitchSetIndex = 2 }, (12 * mult));
        setTimeout(function () { currentPitchSetIndex = 3}, (24 * mult));
        setTimeout(function () { currentPitchSetIndex = 4; lo = 5; hi = 9 }, (30 * mult));
        setTimeout(function () { currentPitchSetIndex = 5 }, (42 * mult));
        setTimeout(function () { currentPitchSetIndex = 6; hi = 8; lo = 4 }, (48 * mult));
        setTimeout(function () { currentPitchSetIndex = 7; }, (60 * mult));
        setTimeout(function () { currentPitchSetIndex = 8; }, (68 * mult));
        setTimeout(function () { hi = 7; }, (76 * mult));
        setTimeout(function () { currentPitchSetIndex = 9; }, (84 * mult));
        setTimeout(function () { currentPitchSetIndex = 10;}, (88 * mult));        
        setTimeout(function () { hi = 6; lo = 3 }, (90 * mult));
        setTimeout(function () { currentPitchSetIndex = 11; }, (93 * mult));
        setTimeout(function () { currentPitchSetIndex = 12; }, (99 * mult));
        setTimeout(function () { currentPitchSetIndex = 13; }, (105 * mult));
        setTimeout(function () { currentPitchSetIndex = 14; ; document.getElementById("dyn").innerHTML = "mp" }, (113 * mult));
        setTimeout(function () {hi = 5; lo = 3}, (120 * mult));
        setTimeout(function () { currentPitchSetIndex = 15}, (124 * mult));
        setTimeout(function () { currentPitchSetIndex = 16; hi = 4; lo = 2 }, (132 * mult));
        setTimeout(function () { currentPitchSetIndex = 17 }, (144 * mult));
        setTimeout(function () { currentPitchSetIndex = 18; hi = 3}, (150 * mult));
        setTimeout(function () { currentPitchSetIndex = 19; lo = 1}, (166 * mult));
        setTimeout(function () { currentPitchSetIndex = 20; }, (172 * mult));        
        setTimeout(function () { currentPitchSetIndex = 21}, (180 * mult));
        setTimeout(function () { hi = 4; lo = 4 }, (189.34 * mult));        
        setTimeout(function () { hi = 3; lo = 3 }, (190 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (190.66 * mult));
        setTimeout(function () { hi = 1; lo = 1 }, (191.34 * mult));
        setTimeout(function () {currentPitchSetIndex = 22}, (192 * mult));
        setTimeout(function () { currentPitchSetIndex = 23; hi = 3;lo = 1}, (196 * mult));
        setTimeout(function () { hi = 4; lo = 4 }, (207.34 * mult));        
        setTimeout(function () { hi = 3; lo = 3 }, (208 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (208.66 * mult));
        setTimeout(function () { hi = 1; lo = 1 }, (209.34 * mult));
        setTimeout(function () { currentPitchSetIndex = 24; document.getElementById("dyn").innerHTML = "mf"}, (210 * mult));
        setTimeout(function () { currentPitchSetIndex = 25; hi = 3;lo = 1 }, (216 * mult));
        setTimeout(function () { hi = 4; lo = 4 }, (227.34 * mult));        
        setTimeout(function () { hi = 3; lo = 3 }, (228 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (228.66 * mult));
        setTimeout(function () { hi = 1; lo = 1 }, (229.34 * mult));        
        setTimeout(function () { hi = 2; lo = 1; currentPitchSetIndex = 26; document.getElementById("dyn").innerHTML = "f"}, (230 * mult));
        setTimeout(function () {currentPitchSetIndex = 27}, (238 * mult));
        setTimeout(function () {currentPitchSetIndex = 28}, (240 * mult));
        setTimeout(function () { hi = 6; lo = 6 }, (244 * mult));        
        setTimeout(function () { hi = 5; lo = 5 }, (244.66 * mult));
        setTimeout(function () { hi = 4; lo = 4 }, (245.34 * mult));        
        setTimeout(function () { hi = 3; lo = 3 }, (246 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (246.66 * mult));
        setTimeout(function () { hi = 1; lo = 1 }, (247.34 * mult));  
        setTimeout(function () { currentPitchSetIndex = 29; hi = 4;lo = 2 }, (248 * mult));
        setTimeout(function () { currentPitchSetIndex = 30; hi = 5;lo = 3 }, (256 * mult));
        setTimeout(function () { hi = 6;lo =  4; document.getElementById("dyn").innerHTML = "mf"}, (270 * mult));
        setTimeout(function () { currentPitchSetIndex = 31}, (276 * mult));
        setTimeout(function () { currentPitchSetIndex = 32;hi = 7;lo =  5; document.getElementById("dyn").innerHTML = "mp"}, (282 * mult));
        setTimeout(function () { currentPitchSetIndex = 33;hi = 8;lo =  5; document.getElementById("dyn").innerHTML = "p"}, (290 * mult));
        setTimeout(function () { hi = 8;lo =  6; document.getElementById("dyn").innerHTML = "pp"}, (298 * mult));
        setTimeout(function () { currentPitchSetIndex = 34;}, (303 * mult));
        setTimeout(function () { currentPitchSetIndex = 35;hi = 7;lo =  5; document.getElementById("dyn").innerHTML = "p"}, (312 * mult));
        setTimeout(function () { hi = 6;lo =  4; document.getElementById("dyn").innerHTML = "mp"}, (324 * mult));
        setTimeout(function () { currentPitchSetIndex = 36;hi = 5;lo =  3; document.getElementById("dyn").innerHTML = "mf"}, (332 * mult));
        setTimeout(function () { hi = 4;lo =  2; document.getElementById("dyn").innerHTML = "f"}, (342 * mult));
        setTimeout(function () { hi = 3;lo =  1; document.getElementById("dyn").innerHTML = "ff"}, (350 * mult));
    
        setTimeout( function () {
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
            (354 * mult)
        );
    }, 5000);
}

function doTenorTimeouts() {
    setTimeout(function () {

        setTimeout(function () { currentPitchSetIndex = 1 }, (8 * mult));
        setTimeout(function () { currentPitchSetIndex = 2 }, (16 * mult));
        setTimeout(function () { currentPitchSetIndex = 3}, (28 * mult));
        setTimeout(function () { lo = 4; hi = 9 }, (30 * mult));
        setTimeout(function () { currentPitchSetIndex = 4 }, (36 * mult));
        setTimeout(function () { currentPitchSetIndex = 5; hi = 8; lo = 4 }, (42 * mult));
        setTimeout(function () { currentPitchSetIndex = 6; }, (48 * mult));
        setTimeout(function () { currentPitchSetIndex = 7; hi = 7 }, (60 * mult));
        setTimeout(function () { currentPitchSetIndex = 8; }, (68 * mult));
        setTimeout(function () { currentPitchSetIndex = 9; }, (76 * mult));
        setTimeout(function () { currentPitchSetIndex = 10; hi = 6; lo = 3 }, (84 * mult));
        setTimeout(function () { currentPitchSetIndex = 11; hi = 5 }, (90 * mult));
        setTimeout(function () { currentPitchSetIndex = 12; }, (96 * mult));
        setTimeout(function () { currentPitchSetIndex = 13; hi = 4; document.getElementById("dyn").innerHTML = "mp" }, (102 * mult));
        setTimeout(function () { currentPitchSetIndex = 14}, (114 * mult));
        setTimeout(function () {hi = 4; lo = 2}, (120 * mult));
        setTimeout(function () { currentPitchSetIndex = 15}, (130 * mult));
        setTimeout(function () { currentPitchSetIndex = 16; hi = 3 }, (142 * mult));
        setTimeout(function () { currentPitchSetIndex = 17; lo = 1}, (150 * mult));
        setTimeout(function () { currentPitchSetIndex = 18 }, (166 * mult));
        setTimeout(function () { currentPitchSetIndex = 19 }, (172 * mult));
        setTimeout(function () { currentPitchSetIndex = 20; hi = 18; lo = 18}, (180 * mult));
        setTimeout(function () { hi = 17;lo = 17}, (181 * mult));
        setTimeout(function () { hi = 15;lo = 15}, (182 * mult));
        setTimeout(function () { hi = 14;lo = 14}, (183 * mult));
        setTimeout(function () { hi = 12;lo = 12}, (184 * mult));
        setTimeout(function () { hi = 11;lo = 11}, (185 * mult));
        setTimeout(function () { hi = 9; lo = 9 }, (186 * mult));
        setTimeout(function () { hi = 8; lo = 8 }, (187 * mult));
        setTimeout(function () { hi = 6; lo = 6 }, (188 * mult));
        setTimeout(function () { hi = 5; lo = 5 }, (189 * mult));
        setTimeout(function () { hi = 3; lo = 3 }, (190 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (191 * mult));
        setTimeout(function () { hi = 27;lo = 27}, (192 * mult));
        setTimeout(function () { hi = 26;lo = 26}, (193 * mult));
        setTimeout(function () { hi = 24;lo = 24}, (194 * mult));
        setTimeout(function () { hi = 23;lo = 23}, (195 * mult));
        setTimeout(function () { hi = 21;lo = 21}, (196 * mult));
        setTimeout(function () { hi = 20;lo = 20}, (197 * mult));
        setTimeout(function () { currentPitchSetIndex = 21; hi = 18; lo = 18}, (198 * mult));
        setTimeout(function () { hi = 17;lo = 17}, (199 * mult));
        setTimeout(function () { hi = 15;lo = 15}, (200 * mult));
        setTimeout(function () { hi = 14;lo = 14}, (201 * mult));
        setTimeout(function () { hi = 12;lo = 12}, (202 * mult));
        setTimeout(function () { hi = 11;lo = 11}, (203 * mult));
        setTimeout(function () { hi = 9; lo = 9 }, (204 * mult));
        setTimeout(function () { hi = 8; lo = 8 }, (205 * mult));
        setTimeout(function () { hi = 6; lo = 6 }, (206 * mult));
        setTimeout(function () { hi = 5; lo = 5 }, (207 * mult));
        setTimeout(function () { hi = 3; lo = 3 }, (208 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (209 * mult));
        setTimeout(function () { document.getElementById("dyn").innerHTML = "mf"}, (210 * mult));
        setTimeout(function () { currentPitchSetIndex = 22; hi = 18;lo = 18 }, (218 * mult));
        setTimeout(function () { hi = 17;lo = 17}, (219 * mult));
        setTimeout(function () { hi = 15;lo = 15}, (220 * mult));
        setTimeout(function () { hi = 14;lo = 14}, (221 * mult));
        setTimeout(function () { hi = 12;lo = 12}, (222 * mult));
        setTimeout(function () { hi = 11;lo = 11}, (223 * mult));
        setTimeout(function () { hi = 9; lo = 9 }, (224 * mult));
        setTimeout(function () { hi = 8; lo = 8 }, (225 * mult));
        setTimeout(function () { hi = 6; lo = 6 }, (226 * mult));
        setTimeout(function () { hi = 5; lo = 5 }, (227 * mult));
        setTimeout(function () { hi = 3; lo = 3 }, (228 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (229 * mult));
        setTimeout(function () { document.getElementById("dyn").innerHTML = "f"}, (230 * mult));
        setTimeout(function () { hi = 12;lo = 12}, (240 * mult));
        setTimeout(function () { hi = 11;lo = 11}, (241 * mult));
        setTimeout(function () { hi = 9; lo = 9 }, (242 * mult));
        setTimeout(function () { hi = 8; lo = 8 }, (243 * mult));
        setTimeout(function () { hi = 6; lo = 6 }, (244 * mult));
        setTimeout(function () { hi = 5; lo = 5 }, (245 * mult));
        setTimeout(function () { hi = 3; lo = 3 }, (246 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (247 * mult));
        setTimeout(function () { currentPitchSetIndex = 23; hi = 4;lo = 2 }, (248 * mult));
        setTimeout(function () { currentPitchSetIndex = 24; hi = 5;lo = 3 }, (256 * mult));
        setTimeout(function () { hi = 6;lo =  4; document.getElementById("dyn").innerHTML = "mf"}, (270 * mult));
        setTimeout(function () { currentPitchSetIndex = 25}, (276 * mult));
        setTimeout(function () { currentPitchSetIndex = 26;hi = 7;lo =  5; document.getElementById("dyn").innerHTML = "mp"}, (282 * mult));
        setTimeout(function () { currentPitchSetIndex = 27;hi = 8;lo =  5; document.getElementById("dyn").innerHTML = "p"}, (290 * mult));
        setTimeout(function () { currentPitchSetIndex = 28;hi = 8;lo =  6; document.getElementById("dyn").innerHTML = "pp"}, (298 * mult));
        setTimeout(function () { currentPitchSetIndex = 29;hi = 7;lo =  5; document.getElementById("dyn").innerHTML = "p"}, (310 * mult));
        setTimeout(function () { hi = 6;lo =  4; document.getElementById("dyn").innerHTML = "mp"}, (322 * mult));
        setTimeout(function () { currentPitchSetIndex = 30;hi = 5;lo =  3; document.getElementById("dyn").innerHTML = "mf"}, (330 * mult));
        setTimeout(function () { hi = 4;lo =  2; document.getElementById("dyn").innerHTML = "f"}, (340 * mult));
        setTimeout(function () { hi = 3;lo =  1; document.getElementById("dyn").innerHTML = "ff"}, (348 * mult));
    
        setTimeout( function () {
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
            (354 * mult)
        );
    }, 5000);
}

function doBassTimeouts()  {
    setTimeout(function(){
                
        setTimeout(function() { currentPitchSetIndex = 1 },  (6 * mult));
        setTimeout(function(){ currentPitchSetIndex = 2; hi = 9}, (12 * mult));
        setTimeout(function(){currentPitchSetIndex = 3}, (24 * mult));
        setTimeout(function(){currentPitchSetIndex = 4; hi = 8; lo = 4}, (30 * mult));
        setTimeout(function(){currentPitchSetIndex = 5}, (42 * mult));
        setTimeout(function(){currentPitchSetIndex = 6; hi = 7}, (48 * mult));
        setTimeout(function(){currentPitchSetIndex = 7; hi = 6; lo = 3}, (60 * mult));
        setTimeout(function(){currentPitchSetIndex = 8}, (68 * mult));
        setTimeout(function(){currentPitchSetIndex = 9; hi = 5}, (80 * mult));
        setTimeout(function(){currentPitchSetIndex = 10}, (88 * mult));
        setTimeout(function(){hi = 4; lo = 2; document.getElementById("dyn").innerHTML = "mp" }, (90 * mult));
        setTimeout(function(){currentPitchSetIndex = 11}, (93 * mult));
        setTimeout(function(){currentPitchSetIndex = 12}, (99 * mult));
        setTimeout(function(){currentPitchSetIndex = 13; hi = 3}, (105 * mult));
        setTimeout(function(){currentPitchSetIndex = 14}, (117 * mult));
        setTimeout(function(){lo = 2 }, (120 * mult));
        setTimeout(function(){currentPitchSetIndex = 15; hi = 2}, (132 * mult));
        setTimeout(function(){currentPitchSetIndex = 16}, (144 * mult));
        setTimeout(function(){currentPitchSetIndex = 17; hi = 1}, (150 * mult));
        setTimeout(function(){currentPitchSetIndex = 18; hi = 2}, (166 * mult));
        setTimeout(function () { currentPitchSetIndex = 19; hi = 18; lo = 18}, (180 * mult));
        setTimeout(function () { hi = 17;lo = 17 }, (181 * mult));
        setTimeout(function () { hi = 15;lo = 15 }, (182 * mult));
        setTimeout(function () { hi = 14;lo = 14}, (183 * mult));
        setTimeout(function () { hi = 12;lo = 12 }, (184 * mult));
        setTimeout(function () { hi = 11;lo = 11 }, (185 * mult));
        setTimeout(function () { hi = 9; lo = 9 }, (186 * mult));
        setTimeout(function () { hi = 8; lo = 8 }, (187 * mult));
        setTimeout(function () { hi = 6; lo = 6 }, (188 * mult));
        setTimeout(function () { hi = 5; lo = 5 }, (189 * mult));
        setTimeout(function () { hi = 3; lo = 3 }, (190 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (191 * mult));
        setTimeout(function () { hi = 27;lo = 27 }, (192 * mult));
        setTimeout(function () { hi = 26;lo = 26}, (193 * mult));
        setTimeout(function () { hi = 24;lo = 24 }, (194 * mult));
        setTimeout(function () { hi = 23;lo = 23}, (195 * mult));
        setTimeout(function () { hi = 21;lo = 21 }, (196 * mult));
        setTimeout(function () { hi = 20;lo = 20}, (197 * mult));
        setTimeout(function () { currentPitchSetIndex = 20; hi = 18; lo = 18}, (198 * mult));
        setTimeout(function () { hi = 17;lo = 17}, (199 * mult));
        setTimeout(function () { hi = 15;lo = 15}, (200 * mult));
        setTimeout(function () { hi = 14;lo = 14}, (201 * mult));
        setTimeout(function () { hi = 12;lo = 12}, (202 * mult));
        setTimeout(function () { hi = 11;lo = 11}, (203 * mult));
        setTimeout(function () { hi = 9; lo = 9}, (204 * mult));
        setTimeout(function () { hi = 8; lo = 8 }, (205 * mult));
        setTimeout(function () { hi = 6; lo = 6}, (206 * mult));
        setTimeout(function () { hi = 5; lo = 5 }, (207 * mult));
        setTimeout(function () { hi = 3; lo = 3}, (208 * mult));
        setTimeout(function () { hi = 2; lo = 2}, (209 * mult));
        setTimeout(function () { document.getElementById("dyn").innerHTML = "mf"}, (210 * mult));
        setTimeout(function () { currentPitchSetIndex = 21; hi = 18;lo = 18 }, (218 * mult));
        setTimeout(function () { hi = 17;lo = 17 }, (219 * mult));
        setTimeout(function () { hi = 15;lo = 15 }, (220 * mult));
        setTimeout(function () { hi = 14;lo = 14 }, (221 * mult));
        setTimeout(function () { hi = 12;lo = 12 }, (222 * mult));
        setTimeout(function () { hi = 11;lo = 11 }, (223 * mult));
        setTimeout(function () { hi = 9; lo = 9}, (224 * mult));
        setTimeout(function () { hi = 8; lo = 8  }, (225 * mult));
        setTimeout(function () { hi = 6; lo = 6 }, (226 * mult));
        setTimeout(function () { hi = 5; lo = 5 }, (227 * mult));
        setTimeout(function () { hi = 3; lo = 3 }, (228 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (229 * mult));
        setTimeout(function () { document.getElementById("dyn").innerHTML = "f"  }, (230 * mult));
        setTimeout(function () { hi = 12;lo = 12}, (240 * mult));
        setTimeout(function () { hi = 11;lo = 11}, (241 * mult));
        setTimeout(function () { hi = 9; lo = 9 }, (242 * mult));
        setTimeout(function () { hi = 8; lo = 8 }, (243 * mult));
        setTimeout(function () { hi = 6; lo = 6 }, (244 * mult));
        setTimeout(function () { hi = 5; lo = 5 }, (245 * mult));
        setTimeout(function () { hi = 3; lo = 3 }, (246 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (247 * mult));
        setTimeout(function () { currentPitchSetIndex = 22; hi = 4;lo = 2 }, (248 * mult));
        setTimeout(function () { currentPitchSetIndex = 23; hi = 5;lo = 3 }, (256 * mult));
        setTimeout(function () { hi = 6; lo = 6 }, (260 * mult));
        setTimeout(function () { hi = 5; lo = 5 }, (261 * mult));
        setTimeout(function () { hi = 3; lo = 3 }, (262 * mult));
        setTimeout(function () { hi = 2; lo = 2 }, (263 * mult));
        setTimeout(function () { currentPitchSetIndex = 24 }, (264 * mult));     
        setTimeout(function () { currentPitchSetIndex = 25;hi = 6;lo =  4; document.getElementById("dyn").innerHTML = "mf"}, (270 * mult));
        setTimeout(function () { currentPitchSetIndex = 26}, (276 * mult));
        setTimeout(function () { currentPitchSetIndex = 27;hi = 7;lo =  5; document.getElementById("dyn").innerHTML = "mp"}, (282 * mult));
        setTimeout(function () { currentPitchSetIndex = 28;hi = 8;lo =  5; document.getElementById("dyn").innerHTML = "p"}, (290 * mult));
        setTimeout(function () { currentPitchSetIndex = 29;hi = 8;lo =  6; document.getElementById("dyn").innerHTML = "pp"}, (298 * mult));        
        setTimeout(function () { currentPitchSetIndex = 30;hi = 7;lo =  5; document.getElementById("dyn").innerHTML = "p"}, (308 * mult));
        setTimeout(function () { hi = 6;lo =  4; document.getElementById("dyn").innerHTML = "mp"}, (320 * mult));
        setTimeout(function () { currentPitchSetIndex = 31;hi = 5;lo =  3; document.getElementById("dyn").innerHTML = "mf"}, (328 * mult));
        setTimeout(function () { hi = 4;lo =  2; document.getElementById("dyn").innerHTML = "f"}, (338 * mult));
        setTimeout(function () { hi = 3;lo =  1; document.getElementById("dyn").innerHTML = "ff"}, (346 * mult));
    
        setTimeout( function () {
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
            (354 * mult)
        );
    }, 5000);
}                        