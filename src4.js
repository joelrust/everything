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


const demoSets = [
//	[pitch, word, length, dynamic, countdown, tutorial]
	["60", "&nbsp", "&nbsp;", 0, 5, "You’ll see a countdown on your own screen. When this finishes, you will hear a note. If the ping was too quiet or too loud, you can adjust the volume using the slider at the bottom. Then, press NEXT." ],
	["61", "sun", "&nbsp;", 0, 4, "This time, you will also see a word — sing the word on the note you hear. Then, press NEXT." ],
	["60", "fall", "—", 0, 3, "Now, there will be a — symbol above the word. This means to sing it slowly — make it last 4 to 6 seconds. When you’ve finished, press NEXT." ],
	["60", "ocean", "◡", 0, 3, "This word will have a ◡ symbol above it. This means to sing it at a normal spoken pace — so it will be a lot shorter than the last one. When it’s over, press NEXT." ],
	["61", "green", "—", 4, 3, "One more thing. In the black band underneath the word, you’ll be given an indication of how quiet or loud to sing each word. By default, these use the dynamic markings used in sheet music.  But, if you’re unfamiliar with that system, you can switch it to a different one at the bottom, which indicates the loudness with the height of a line, |⎽| being quietest and |⎺| being loudest. Press NEXT." ],
	["60", "oyster", "◡", 1, 3, "This word will have a ◡ symbol above it. This means to sing it at a normal spoken pace — so it will be a lot shorter than the last one. When it’s over, press NEXT." ],
	["59", "hidden", "◡", 1, 3, "Each singer has their own part, which is randomly generated; it’s OK if you’re moving faster or slower than other singers, or if there are some notes you don’t sing. All participants will, at the same time, get the message [stop]. If you’re singing, finish the word you’re on. Then, the piece is over." ],

	
]



var dynamicSet = ["&nbsp;", "<i>p</i>", "<i>mp</i>", "<i>mf</i>", "<i>f</i>", "<i>ff</i>"];

const dynamicSymbols = ["&nbsp;", "|⎼|", "|–|", "|–|", "|⎻|", "|⎺|"];

const dynamicLetters = ["&nbsp;", "<i>p</i>", "<i>mp</i>", "<i>mf</i>", "<i>f</i>", "<i>ff</i>"];


var currentDynamic = dynamicSet[0];
// hi lo len dyn ?


var currentSettingsIndex = 0;

var currentSettings = demoSets[currentSettingsIndex];

var lo =  currentSettings[4];

var hi = currentSettings[4];

var currentDynamicIndex = demoSets[3];

var currentDynamic = dynamicSet[currentDynamicIndex];

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
	let newPitchSets;
	
		newPitchSets = pitchSets;
	
	let currentPitchSet = pitchSets[currentPitchSetIndex];

	let pitchNumIndex = Math.floor(Math.random() * currentPitchSet.length);
	let nam = `audio/${demoSets[0]}.m4a`;
	audio.src = nam;
	audio.play();
	document.getElementById("startButton").innerHTML = "Next";

	var ln = [Math.floor(Math.random() * currentLengthSet.length)];
	document.getElementById("length").innerHTML = currentLengthSet[ln];
	
	// choose the word and show it
	var wn = [( Math.floor(Math.random() * (wordRange)
		+ wordLowBounds - wordLowBoundsInitial)) % wordlist.length
	];
	document.getElementById("demo").innerHTML = demoSets[1];
	
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