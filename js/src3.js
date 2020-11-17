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
// hi lo len dyn
const setSettings = [



[3, 3, 6, 1, 0],
[3, 4, 6, 1, 0],
[0],
[0],
[0],
[3, 4, 5, 1, 0],
[0],
[3, 4, 5, 2, 0],
[0],
[0],
[2, 3, 4, 2, 0],
[0],
[0],
[0],
[2, 3, 3, 3, 0],
[0],
[2, 3, 4, 3, 0],
[0],
[0],
[2, 3, 5, 3, 0],
[2, 2, 5, 3, 0],
[2, 3, 6, 4, 0],
[3, 4, 6, 4, 0],
[3, 5, 6, 3, 0],
[3, 6, 6, 2, 0],
[3, 6, 3, 1, 0],
[0],
[0],
[0],
[0],
[0],
[0],
[0],
[0],
[1],   	// 0
[1],	// 1
[3, 5, 6, 1, 0],
[0],
[3, 4, 5, 2, 0],
[0],
[2, 4, 4, 3, 0],
[0],
[2, 3, 4, 4, 0],
[0],
[2, 4, 3, 3, 0],
[0],
[3, 4, 3, 2, 0],
[5, 5, 2, 1, 0],
[2, 3, 6, 5, 0],
[0],
[0],
[0],
[0],
[0],
[0],
[0],
[0]
];

var currentSettingsIndex = 0;

const sopranoOverrideSettings = [
[3, 6, 6, 1, 0],
[3, 6, 6, 1, 0],	
	
]

const altoOverrideSettings = [
[3, 6, 6, 1, 0],
[3, 6, 6, 1, 0],	
	
]

const tenorOverrideSettings = [
[10, 10, 6, 1, 0],
[5, 5, 6, 1, 0],

	
]

const bassOverrideSettings = [
[10, 10, 6, 1, 0],
[5, 5, 6, 1, 0],	
	
]

let overrideSettings;
	if (part === 'tenor') {
		overrideSettings = tenorOverrideSettings;
	} else if (part === 'bass') {
		overrideSettings = bassOverrideSettings;
	} else if (part === 'alto') {
		overrideSettings = altoOverrideSettings;
	} else if (part === 'soprano') {
		overrideSettings = sopranoOverrideSettings;
	}

var currentOverrideSettingsIndex = 0;

var currentOverrideSettings = overrideSettings[currentOverrideSettingsIndex];

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
["65", "65", "67"],        
["65", "67"],
["65", "67", "67"],      
["67"],
["67", "67", "69"],        
["67", "69"],
["67", "69", "69"],        
["69"],
["69", "69", "71"],
["69", "71"],
["69", "71", "71"],
["71"],
["71", "71", "73"],
["71", "73"],
["71", "73", "73"],
["73"],
["73", "73", "75"],
["73", "75"],
["73", "75", "75"],
["75"],
["75"],
["75"],
["71", "75", "75"],
["71", "75"],
["71", "71", "75"],
["71"],
["71"],
["71"],
["71"],
["64"],
["64"],
["64"],
["64"],
["63"],
["63"],
["63"],
["63"],
["62", "63", "63"],
["63", "65"],
["65"],
["65"],
["63", "65", "65"],
["63", "65"],
["63"],
["61"],
["62"],
["64"],
["64"],
["69", "73", "76"],
["69", "73", "76"],
["71", "73", "75", "76"],
["71", "73", "75", "76"],
["69", "73", "76"],
["69", "73", "76"],
["70", "73", "74", "76"],
["70", "73", "74", "76"],
["69", "76", "76"]
	];


const altoPitchSets = [
["58", "60", "60"],
["60"],
["60", "60", "62"],
["60", "62"],
["60", "62", "62"],
["62"],
["62", "62", "64"],
["62", "64"],
["62", "64", "64"],
["64"],
["64", "64", "66"],
["64", "66"],
["64", "66", "66"],
["66"],
["66", "66", "68"],
["66", "68"],
["66", "68", "68"],
["68"],
["68", "68", "70"],
["68", "70"],
["68", "70", "70"],
["68"],
["64", "68", "68"],
["64", "68"],
["64", "64", "68"],
["64"],
["64"],
["64"],
["63"],
["63"],
["63"],
["63"],
["56"],
["56"],
["56"],
["56"],
["62"],
["60", "62"],
["60", "62", "63"],
["63"],
["63"],
["61", "63"],
["59", "61", "61"],
["59", "61", "61"],
["59", "59", "61"],
["61"],
["61", "62"],
["61", "64"],
["61", "64", "69"],
["61", "64", "69"],
["61", "63", "64", "69"],
["61", "63", "64", "69"],
["61", "64", "69"],
["61", "64", "69"],
["61", "62", "64", "69"],
["61", "62", "64", "69"],
["64", "64", "69"],
];


const tenorPitchSets = [
["51"],
["51", "51", "53"],
["51", "53"],
["51", "53", "53"],
["53"],
["53", "53", "55"],
["53", "55"],
["53", "55", "55"],
["55"],
["55", "55", "57"],
["55", "57"],
["55", "57", "57"],
["57"],
["57", "57", "59"],
["57", "59"],
["57", "59", "59"],
["59"],
["59", "59", "61"],
["59", "61"],
["59", "61", "61"],
["59"],
["59"],
["59", "59", "63"],
["59", "63"],
["59", "63", "63"],
["63"],
["63"],
["56"],
["56"],
["56"],
["56"],
["49"],
["49"],
["49"],
["49"],
["49"],
["58"],
["58", "60"],
["56", "58", "60"],
["56"],
["56"],
["56", "57"],
["57", "57", "59"],
["57", "57", "59"],
["57", "59", "59"],
["59"],
["59", "61"],
["57", "61"],
["52", "57", "57"],
["52", "57", "57"],
["52", "57", "59"],
["52", "57", "59"],
["52", "57", "57"],
["52", "57", "57"],
["52", "57", "58"],
["52", "57", "58"],
["52", "57", "57"],
];

const bassPitchSets = [
["44", "46"],
["44", "46", "46"],
["46"],
["46", "46", "48"],
["46", "48"],
["46", "48", "48"],
["48"],
["48", "48", "50"],
["48", "50"],
["48", "50", "50"],
["50"],
["50", "50", "52"],
["50", "52"],
["50", "52", "52"],
["52"],
["52", "52", "54"],
["52", "54"],
["52", "52", "54"],
["52"],
["52"],
["52"],
["52"],
["52", "52", "56"],
["52", "56"],
["52", "56", "56"],
["56"],
["49"],
["49"],
["49"],
["49"],
["45"],
["45"],
["45"],
["45"],
["45"],
["45"],
["56"],
["56", "56", "58"],
["54", "56"],
["54"],
["54"],
["54", "54", "56"],
["54", "56"],
["56"],
["57"],
["57"],
["57"],
["57"],
["45", "45", "52"],
["45", "45", "52"],
["45", "45", "52"],
["45", "45", "52"],
["45", "45", "52"],
["45", "45", "52"],
["45", "45", "52"],
["45", "45", "52"],
["45", "45", "52"],
	
];


function startPiece() {
	setInterval(
		function () { wordRange *= expo; wordLowBounds *= expo },
		(10000)
	);
	setInterval(
		function nextSet() {
  		
			currentSettingsIndex += 1;
			
			currentSettings = setSettings[currentSettingsIndex];
			
			if (currentSettings != 0 ) {
				
				if (currentSettings == 1 ) {
                    
					currentSettings = overrideSettings[currentOverrideSettingsIndex];
					currentOverrideSettingsIndex += 1;

                }
				
				lo =  currentSettings[0];
				
				hi = currentSettings[1];
				
				currentLengthSetIndex = currentSettings[2];
				
				currentDynamicIndex = currentSettings[3];
				
				currentLengthSet = lengthSets[currentLengthSetIndex];
				
				currentDynamic = dynamicSet[currentDynamicIndex]
	
			}		
	
		currentPitchSetIndex = currentSettingsIndex;				

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




