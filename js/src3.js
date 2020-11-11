/*
 * Constant, tunable params
 */
const mult = 1000;
let wordRange = 25;
const wordLowBoundsInitial = 24;
let wordLowBounds = wordLowBoundsInitial;
const expo = 1.12;

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



// pitch range

const lengthSets = [
	["·"],              // 0
	["·","·",".","—"],  // 1
	["·",".","—"],      // 2
	["·","—"],          // 3
	["·","—","—"],      // 4
	["·","—","—","—"],  // 5
	["—"],              // 6
];

const dynamicSet = ["pp", "p", "mp", "mf", "f", "ff"];



var currentDynamic = dynamicSet[0];

const setSettings = [
	[3, 3, 6, 1, 0],
	[11, 11, 6, 1, 4],
   [10, 10, 6, 1, 4],
	[9, 9, 6, 1, 4],
	[8, 8, 6, 1, 4],
	[7, 7, 6, 1, 4],
];



var currentPitchSetIndex = 0;

var currentSettingsIndex = 0;

				var currentSettings = setSettings[currentSettingsIndex];


var lo =  currentSettings[0];

var hi = currentSettings[1];

var currentLengthSetIndex = currentSettings[2];

var currentDynamicIndex = currentSettings[3];

var currentLengthSet = lengthSets[currentLengthSetIndex];

var currentDynamic = dynamicSet[currentDynamicIndex];












const sopranoPitchSets = [
	["65", "65", "67"],         //0
	["65", "67"],
	["65", "67", "67"],         //2
	["67"],
	["67", "67", "69"],         //4
	["67", "69"],
	["67", "69", "69"],         //6
	["69"],
	
	
	// old
	
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


function startPiece() {
	setInterval(
		function () { wordRange *= expo; wordLowBounds *= expo },
		(10000)
	);
	setInterval(
		        function nextSet() {
            //code


                //code
            		
currentSettingsIndex += 1;

currentSettings = setSettings[currentSettingsIndex];

lo =  currentSettings[0];

hi = currentSettings[1];

currentLengthSetIndex = currentSettings[2];

currentDynamicIndex = currentSettings[3];

currentLengthSet = lengthSets[currentLengthSetIndex];

currentDynamic = dynamicSet[currentDynamicIndex]



					
					
					
					
		 //           }
		 //         , (setSettings[currentSettingsIndex[4]] * mult));
		    },
		
		(5000)
	);    
	doLengthTimeouts();
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
	let currentPitchSet = pitchSets[currentPitchSetIndex];

	let pitchNumIndex = Math.floor(Math.random() * currentPitchSet.length);
	let nam = `audio/${currentPitchSet[pitchNumIndex]}.m4a`;
	audio.src = nam;
	audio.play();
	document.getElementById("startButton").innerHTML = "Next";


	var ln = [Math.floor(Math.random() * currentLengthSet.length)];
	document.getElementById("length").innerHTML = currentLengthSet[ln];
	
	// choose the word and show it
	var wn = [( Math.floor(Math.random() * (wordRange - wordLowBounds + wordLowBoundsInitial)
		+ wordLowBounds - wordLowBoundsInitial)) % wordlist.length
	];
	document.getElementById("demo").innerHTML = wordlist[wn];
	
	document.getElementById("dyn").innerHTML = currentDynamic;
	
	
	// uncomment next line for word debugging
	//  + " | " + wn + "/" + wordRange + " | " + nam + " | " + x +"/" + y
}



function startText() {
	document.getElementById("startButton").innerHTML = "wait";
	document.getElementById("length").innerHTML = "&nbsp;";
	document.getElementById("dyn").innerHTML = "&nbsp;";
	



	if (isFirstClick) {
		// Set off all of the initial timing based stuff on first click only
		isFirstClick = false;
		startPiece();
	}

	let countdownSecondsLeft = ([Math.floor(Math.random() * (hi - lo + 1)) + lo] * 1);

		document.getElementById("demo").innerHTML = countdownSecondsLeft;

	
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




function innerTimeouts() {
	

}

function incrementScore() {

		
      
}
  //  } ;
 function doLengthTimeouts() { 
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
			(600 * mult));
	   
}    




