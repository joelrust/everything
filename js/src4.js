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

function doNothing() {
	}

//const audioButton = document.querySelector("#audioButton");
//audioButton.onclick = audioLaunch;

var audio = new Audio();

var isFirstClick = true;


const demoSets = [
//	[pitch, word, length, dynamic, countdown, tutorial]
 	["60", "&nbsp", "&nbsp;", 0, 5, "<br>You’ll see a countdown on your own screen. When this finishes, you will hear a note. If the ping was too quiet or too loud, you can adjust the volume using the slider at the bottom. Then, press NEXT." ],
	["60", "&nbsp", "&nbsp;", 0, 5, "<br>You’ll see a countdown on your own screen. When this finishes, you will hear a note. If the ping was too quiet or too loud, you can adjust the volume using the slider at the bottom. Then, press NEXT." ],
	["61", "sun", "&nbsp;", 0, 4, "<br><br>This time, you will also see a word — sing the word on the note you hear. Then, press NEXT." ],
	["60", "fall", "—", 0, 3, "<br><br>Now, there will be a &quot;—&quot; symbol above the word. This means to sing it slowly; make it last 4 to 6 seconds. When you’ve finished, press NEXT." ],
	["60", "ocean", "◡", 0, 3, "<br><br>This word will have a &quot;◡&quot; symbol above it. This means to sing it at a normal spoken pace; so it will be a lot shorter than the last one. When it’s over, press NEXT." ],
	["61", "green", "—", 4, 3, "<br>One more thing. In the black band underneath the word, you’ll be given an indication of how quiet or loud to sing each word. Below, there's a toggle where you can switch between symbols or words. Press NEXT." ],
	["59", "hidden", "◡", 1, 3, "<br>If you miss the start of the piece (i.e. you don’t press START with the rest of your group), it’s not possible to get back in sync. Instead, please sit back and enjoy the performance!" ],
	["60", "oyster", "◡", 3, 4, "Each singer has their own part, which is randomly generated; it’s OK if you’re moving faster or slower than others, or if there are notes you don’t sing. Everyone will, at the same time, get the message [stop]. If you’re singing, finish the word you’re on. Then, the piece is over. Until then, practice with a few more words!" ],
	["61", "treadmill", "—", 4, 5, "Each singer has their own part, which is randomly generated; it’s OK if you’re moving faster or slower than others, or if there are notes you don’t sing. Everyone will, at the same time, get the message [stop]. If you’re singing, finish the word you’re on. Then, the piece is over. Until then, practice with a few more words!" ],
	["60", "spanner", "◡", 2, 3, "Each singer has their own part, which is randomly generated; it’s OK if you’re moving faster or slower than others, or if there are some you don’t sing. Everyone will, at the same time, get the message [stop]. If you’re singing, finish the word you’re on. Then, the piece is over. Until then, practice with a few more words!" ],
	["60", "flux", "◡", 2, 3, "Each singer has their own part, which is randomly generated; it’s OK if you’re moving faster or slower than others, or if there are some you don’t sing. Everyone will, at the same time, get the message [stop]. If you’re singing, finish the word you’re on. Then, the piece is over. Until then, practice with a few more words!" ],


]



var dynamicSet = ["&nbsp;", "<i>p</i>", "<i>mp</i>", "<i>mf</i>", "<i>f</i>", "<i>ff</i>"];

const dynamicSymbols = ["&nbsp;", "quiet", "medium", "medium", "loud", "loud"];

const dynamicLetters = ["&nbsp;", "<i>p</i>", "<i>mp</i>", "<i>mf</i>", "<i>f</i>", "<i>ff</i>"];


var currentDynamic = dynamicSet[0];
// hi lo len dyn ?


var currentSettingsIndex = 0;

var currentSettings = demoSets[currentSettingsIndex];

var lo =  currentSettings[4];

var hi = currentSettings[4];

var currentDynamicIndex = currentSettings[3];

var currentDynamic = dynamicSet[currentDynamicIndex];



//function startPiece() {
//	setInterval(
//		function nextSet() {
//			wordRange *= expo;
//			wordLowBounds *= expo;
//			currentSettingsIndex += 1;
//			currentSettings = demoSets[currentSettingsIndex];
//			if (currentSettings != 0 ) {
//
//			}
//		currentPitchSetIndex = currentSettingsIndex;
//		},
//		(5000)
//	);
//}





function playAudioChooseWord() {
	// select audio file and play it

	let nam = `audio/${currentSettings[0]}.m4a`;

	audio.src = nam;

	let volume = document.querySelector("#volu");

	volume.addEventListener("change", function(e) {
 audio.volume = (e.currentTarget.value / 48) ;
 });

	audio.play();
	document.getElementById("startButton").innerHTML = "Next";

	document.getElementById("length").innerHTML = currentSettings[2];

	// choose the word and show it
	var wn = currentSettings[2];
	document.getElementById("demo").innerHTML = currentSettings[1];

	document.getElementById("dyn").innerHTML = currentDynamic;

		document.getElementById("instr").innerHTML = currentSettings[5];


}




var isCountdown = 1;

function startText() {
	isCountdown = 1;
	currentSettingsIndex ++ ;
		if (currentSettingsIndex == 10) {
     resetPiece();
					} ;
				currentSettings = demoSets[currentSettingsIndex];
					lo =  currentSettings[4];
					hi = currentSettings[4];

	document.getElementById("startButton").innerHTML = "wait";
	startButton.onclick = doNothing;
	document.getElementById("length").innerHTML = "&nbsp;";
	document.getElementById("dyn").innerHTML = "&nbsp;";
	document.getElementById("instr").innerHTML = currentSettings[5];
currentDynamicIndex = currentSettings[3];
currentDynamic = dynamicSet[currentDynamicIndex];

	if (isFirstClick) {
		audioLaunch();
		// Set off all of the initial timing based stuff on first click only
		isFirstClick = false;
		//startPiece();
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
				startButton.onclick = startText;

			} else {
				// Show the new value of the countdown
				document.getElementById("demo").innerHTML = countdownSecondsLeft;
			}
		},
		1000
	);
};

// var volumeMult = 1

function audioLaunch() {
 let volume = document.querySelector("#volu");
 audio.volume = 0.33;

 volume.addEventListener("change", function(e) {
audio.volume = (e.currentTarget.value / 48) ;
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
