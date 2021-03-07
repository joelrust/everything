const mult = 1000;
let wordRange = 25;
const wordLowBoundsInitial = 15;
let wordLowBounds = wordLowBoundsInitial;
const expo = 1.06;

// Set up click handlers
const startButton = document.querySelector("#startButton");
startButton.onclick = startText;

function startTenor() {
	part = 'tenor';
	startText();
}

//const audioButton = document.querySelector("#audioButton");
//audioButton.onclick = audioLaunch;

var audio = new Audio();

var isFirstClick = true;

const lengthSets = [
	["◡"],              // 0
	["◡","◡","◡","—"],  // 1
	["◡","◡","—"],      // 2
	["◡","—"],          // 3
	["◡","—","—"],      // 4
	["◡","—","—","—"],  // 5
	["—"],              // 6
];

var dynamicSet = ["<i>pp</i>", "<i>p</i>", "<i>mp</i>", "<i>mf</i>", "<i>f</i>", "<i>ff</i>"];

const dynamicSymbols = ["|⎽|", "|⎼|", "|–|", "|–|", "|⎻|", "|⎺|"];

const dynamicLetters = ["<i>pp</i>", "<i>p</i>", "<i>mp</i>", "<i>mf</i>", "<i>f</i>", "<i>ff</i>"];


var currentDynamic = dynamicSet[0];
// hi lo len dyn ?
const setSettings = [
	[2, 3, 6, 1, 0],
	[3, 3, 6, 1, 0],
	[0],
	[0],
	[0],
	[3, 3, 5, 1, 0],
	[0],
	[3, 3, 5, 2, 0],
	[0],
	[0],
	[2, 2, 4, 2, 0],
	[0],
	[0],
	[0],
	[2, 2, 3, 3, 0],
	[0],
	[2, 2, 4, 3, 0],
	[0],
	[0],
	[2, 2, 5, 3, 0],
	[2, 1, 5, 3, 0],
	[2, 2, 6, 4, 0],
	[2, 3, 6, 4, 0],
	[2, 4, 6, 3, 0],
	[2, 5, 6, 2, 0],
	[2, 5, 3, 1, 0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[1],   	
	[1],	
	[2, 5, 6, 1, 0],
	[0],
	[2, 4, 5, 2, 0],
	[0],
	[2, 3, 4, 3, 0],
	[0],
	[2, 2, 4, 4, 0],
	[0],
	[2, 3, 3, 3, 0],
	[0],
	[3, 3, 3, 2, 0],
	[4, 4, 2, 1, 0],
	[1, 3, 6, 5, 0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[1, 3, 6, 4, 0],
	[0],
	[0],
	[1, 3, 6, 3, 0],
	[0],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1, 3, 6, 3, 0],
	[1, 3, 6, 2, 0],
	[0],
	[2, 3, 6, 1, 0],
	[2, 4, 6, 1, 0],
	[2, 4, 6, 0, 0],
	[3, 4, 6, 0, 0],
	[0],
	[0],
	[1, 3, 5, 0, 0],
	[1, 3, 4, 1, 0],
	[0],
	[1, 3, 3, 2, 0],
	[0],
	[2, 4, 4, 3, 0],
	[3, 5, 5, 3, 0],
	[3, 5, 6, 4, 0],
	[0],
	[0],
	[3, 4, 3, 2, 0],
	[0],
	[3, 5, 6, 3, 0],
	[0],
	[3, 4, 3, 1, 0],
	[0],
	[2, 4, 6, 2, 0],
	[0],
	[2, 3, 6, 3, 0],
	[1, 3, 6, 4, 0],
	[0],
	[2, 3, 6, 3, 0],
	[0],
	[2, 3, 6, 2, 0],
	[1],
	[2]
];

var currentSettingsIndex = 0;

const sopranoOverrideSettings = [
	[2, 4, 6, 1, 0],
	[2, 4, 6, 1, 0],
	[1, 2, 0, 3, 0],
	[1, 2, 0, 2, 0],
	[1, 2, 0, 2, 0],
	[1, 2, 0, 2, 0],
	[1, 2, 1, 2, 0],
	[1, 2, 2, 3, 0],
	[25, 25, 3, 3, 0],
	[20, 20, 3, 3, 0],
	[15, 15, 3, 3, 0],
	[10, 10, 3, 3, 0],
	[5, 5, 3, 3, 0],
	[2, 3, 6, 2, 0],
]

const altoOverrideSettings = [
	[2, 4, 6, 1, 0],
	[2, 4, 6, 1, 0],
	[1, 2, 0, 3, 0],
	[1, 2, 0, 2, 0],
	[1, 2, 0, 2, 0],
	[1, 2, 0, 2, 0],
	[1, 2, 1, 2, 0],
	[1, 2, 2, 3, 0],
	[15, 15, 3, 3, 0],
	[10, 10, 3, 3, 0],
	[5, 5, 3, 3, 0],
	[2, 2, 6, 4, 0],
	[2, 2, 6, 3, 0],
	[10, 10, 6, 2, 0],
]

const tenorOverrideSettings = [
	[10, 10, 6, 1, 0],
	[5, 5, 6, 1, 0],
	[3, 4, 6, 3, 0],
	[3, 4, 6, 2, 0],
	[10, 10, 6, 2, 0],
	[5, 5, 6, 2, 0],
	[1, 2, 6, 2, 0],
	[1, 2, 6, 3, 0],
	[1, 2, 6, 3, 0],
	[1, 2, 6, 4, 0],
	[1, 2, 6, 4, 0],
	[1, 3, 6, 4, 0],
	[1, 3, 6, 3, 0],
	[10, 10, 6, 2, 0]	
]

const bassOverrideSettings = [
	[10, 10, 6, 1, 0],
	[5, 5, 6, 1, 0],
	[2, 5, 6, 3, 0],
	[2, 5, 6, 2, 0],
	[10, 10, 6, 2, 0],
	[5, 5, 6, 2, 0],
	[1, 2, 6, 2, 0],
	[1, 2, 6, 3, 0],
	[1, 2, 6, 3, 0],
	[1, 2, 6, 4, 0],
	[1, 2, 6, 4, 0],
	[1, 3, 6, 4, 0],
	[1, 3, 6, 3, 0],
	[2, 3, 6, 2, 0]	
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
	["65"],        
	["65", "65", "67"],
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
	["69", "76", "76"],
	["69", "76", "76"],
	["60", "62"],
	["62", "63"],
	["63", "65"],
	["65", "66", "68"],
	["66", "68", "70"],
	["66", "66", "68", "70", "70"],
	["66", "70", "70"],
	["68", "71"],
	["68", "68", "71", "73"],
	["68", "71", "73", "76"],
	["68", "71", "73", "76"],
	["68", "71", "73", "76"],
	["68", "71", "73", "76"],
	["68", "71", "73", "76"],
	["0"],
	["0"],
	["0"],
	["0"],
	["62", "69"],
	["62", "67"],
	["63", "72"],
	["63", "72"],
	["73"],
	["73", "75"],
	["75"],
	["77"],
	["77"],
	["76", "77"],
	["75", "76", "77"],
	["74", "75", "76"],
	["73", "74", "75"],
	["72", "73", "74"],
	["72", "72", "73"],
	["72", "72", "73"],
	["72"],
	["72"],
	["72"],
	["71", "72", "73"],
	["71", "72", "73"],
	["72"],
	["72"],
	["71", "72", "73"],
	["71", "72", "73"],
	["73"],
	["73"],
	["73"],
	["73", "75"],
	["73", "75"],
	["73", "73", "75"],
	["73"],
	["73"],
	["73"]
];

const altoPitchSets = [
	["62"],
	["60", "62", "62"],
	["60", "62"],
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
	["64", "64", "69"],
	["58", "60", "62"],
	["58", "60", "62"],
	["60", "62", "63"],
	["60", "62"],
	["62", "63"],
	["62", "63", "65"],
	["62", "63", "63", "65"],
	["63", "63", "66"],
	["61", "64"],
	["59", "61", "64", "64"],
	["56", "59", "61", "64"],
	["56", "59", "61", "64"],
	["56", "59", "61", "64"],
	["56", "59", "61", "64"],
	["56", "59", "61", "64"],
	["0"],
	["0"],
	["55", "64"],
	["55", "64"],
	["62", "69"],
	["62", "67"],
	["63", "72"],
	["63", "72"],
	["65"],
	["65"],
	["65"],
	["65"],
	["65"],
	["65"],
	["64", "65", "66"],
	["64", "65", "66"],
	["63", "64", "65"],
	["63", "64", "64", "65"],
	["64", "64", "65"],
	["64", "64", "65"],
	["64"],
	["64"],
	["64"],
	["62", "63", "64"],
	["62", "63", "64"],
	["63"],
	["63"],
	["62", "63", "64"],
	["62", "63", "64"],
	["62"],
	["62", "64"],
	["64"],
	["63", "64"],
	["63", "64"],
	["63", "64", "64"],
	["64"],
	["64"],
	["0"]
];

const tenorPitchSets = [
	["53"],
	["51", "53", "53"],
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
	["52", "57", "57"],
	["58", "60", "62"],
	["58", "60", "62"],
	["56", "58", "60"],
	["58", "60"],
	["58", "60"],
	["56", "58", "60"],
	["56", "58", "58", "60"],
	["54", "58", "58"],
	["54", "58", "58"],
	["54", "58", "58"],
	["54", "58", "58"],
	["0"],
	["50", "57"],
	["50", "54", "57"],
	["50", "54", "57"],
	["50", "54", "57"],
	["50", "54", "57"],
	["55", "64"],
	["55", "64"],
	["53"],
	["53"],
	["58"],
	["58"],
	["58"],
	["56", "58"],
	["56"],
	["53"],
	["53"],
	["53"],
	["52", "53", "54"],
	["52", "53", "54"],
	["53", "54", "55"],
	["53", "53", "54", "55"],
	["53", "53", "55"],
	["53", "53", "55"],
	["53"],
	["53"],
	["53"],
	["53", "54", "55"],
	["53", "54", "55"],
	["55"],
	["55"],
	["53", "54", "55"],
	["53", "54", "55"],
	["54"],
	["54", "56"],
	["56"],
	["56", "59"],
	["56", "59"],
	["56", "57", "59"],
	["57"],
	["57"],
	["0"],
];

const bassPitchSets = [
	["46"],
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
	["45", "46"],
	["45", "46"],
	["45", "45", "52"],
	["45", "45", "52"],
	["58", "60"],
	["58", "60"],
	["56", "58", "50"],
	["54", "56"],
	["53", "54", "56"],
	["51", "53", "54"],
	["51", "51", "53", "54", "54"],
	["51", "51", "54"],
	["51", "51", "54"],
	["51", "51", "54"],
	["51", "51", "54"],
	["0"],
	["50", "57"],
	["50", "54", "57"],
	["50", "54", "57"],
	["50", "54", "57"],
	["50", "54", "57"],
	["48"],
	["48"],
	["46"],
	["46"],
	["44"],
	["44"],
	["42"],
	["42"],
	["42"],
	["41"],
	["41"],
	["41", "42"],
	["41", "42", "43"],
	["42", "43", "44"],
	["43", "44", "45"],
	["43", "44", "45", "45"],
	["43", "45", "45"],
	["43", "45", "45"],
	["45"],
	["45"],
	["45"],
	["44", "45", "46"],
	["44", "45", "46"],
	["44"],
	["44"],
	["44", "45", "46"],
	["44", "45", "46"],
	["45"],
	["45"],
	["45"],
	["45"],
	["45"],
	["45"],
	["45"],
	["45"],
	["45"],	
];

function startPiece() {
	setInterval(
		function nextSet() {
			wordRange *= expo;
			wordLowBounds *= expo;
			currentSettingsIndex += 1;
			currentSettings = setSettings[currentSettingsIndex];
			if (currentSettings != 0 ) {
				if (currentSettings == 2) {
                    resetPiece();
					} else {
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
			}		
		currentPitchSetIndex = currentSettingsIndex;				
		},
		(5000)
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
	let currentPitchSet = pitchSets[currentPitchSetIndex];

	let pitchNumIndex = Math.floor(Math.random() * currentPitchSet.length);
	let nam = `audio/${currentPitchSet[pitchNumIndex]}.m4a`;
	audio.src = nam;
	audio.play();
	document.getElementById("startButton").innerHTML = "Next";

	var ln = [Math.floor(Math.random() * currentLengthSet.length)];
	document.getElementById("length").innerHTML = currentLengthSet[ln];
	
	// choose the word and show it
	var wn = [( Math.floor(Math.random() * (wordRange)
		+ wordLowBounds - wordLowBoundsInitial)) % wordlist.length
	];
	document.getElementById("demo").innerHTML = wordlist[wn];
	
	document.getElementById("dyn").innerHTML = currentDynamic;
}

var isCountdown = 1;

function startText() {
	isCountdown = 1;
	document.getElementById("startButton").innerHTML = "wait";
	document.getElementById("length").innerHTML = "&nbsp;";
	document.getElementById("dyn").innerHTML = "&nbsp;";

	if (isFirstClick) {
		audioLaunch();
		// Set off all of the initial timing based stuff on first click only
		isFirstClick = false;
		startPiece();
	}

	let countdownSecondsLeft = ([Math.floor(Math.random() * (hi - lo + 1)) + lo] * 1);

		document.getElementById("demo").innerHTML = countdownSecondsLeft;
	    //next two lines to test
               //       var debugTimer = ((countdownSecondsLeft + 3) * 1000);
              //        setTimeout(startText, debugTimer);
    // end of test
	
	var countdownTimer = setInterval(
		function() {
			countdownSecondsLeft -= 1;
			if (countdownSecondsLeft <= 0) {
				isCountdown = 0;
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
 
 let volume = document.querySelector("#volu");

 volume.addEventListener("change", function(e) {
audio.volume = e.currentTarget.value / 64;
});

 
    audio.src = "click.mp3";

    audio.play();
}


 function resetPiece() { 
	var e = document.getElementById("demo");
	e.id = "fin";
	document.getElementById("fin").innerHTML = "[stop]";
	setTimeout(function(){ document.getElementById("startButton").innerHTML = "Reset" }, 1000);
	countdownTimer = 0;
	countdownSecondsLeft = 0;
	document.getElementById('startButton').setAttribute("onClick", "window.location.reload(true)");
	audio = 0;
	document.getElementById("dyn").innerHTML = "—";
}



    var input = document.getElementById('toggleswitch');
    var outputtext = document.getElementById('status');

    input.addEventListener('change',function(){
        if(this.checked) {
           dynamicSet = dynamicSymbols;
		   
        } else {
            dynamicSet = dynamicLetters;
			
        };
		currentDynamic = dynamicSet[currentDynamicIndex];
		if (isCountdown == 0) {
			
		document.getElementById("dyn").innerHTML = currentDynamic;	
			}
		
    });