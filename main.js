import { Note, Chord, Instrument, notes } from "./js/music.js";
import { Header, Footer } from "./js/menu.js";

const root = document.querySelector(":root");

const header = new Header();
const footer = new Footer();

setTimeout(() => {
	root.style.setProperty("--animation-duration", "0.2s");
});



const main = document.getElementById("main");
const container = document.createElement("div");
container.classList.add("main-minigame");

const currentNote = document.createElement("h1");
currentNote.innerText = "?";
currentNote.classList.add("note");

const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");

const pattern = ["white", "black", "white", "black",
				 "white", "white", "black", "white",
				 "black", "white", "black", "white"];

let lastKeyPressed;
let noteGuessed = false;
let started = false;

for (let i = 0; i < 12; i++) {
	const key = document.createElement("div");
	key.classList.add("key", pattern[i]);
	key.id = notes[i];

	if (pattern[i] == "white" && !(i == 0 || i == 5)) {
		key.classList.add("offset");
	}

	key.addEventListener("click", () => {
		if (started) {
			if (!noteGuessed) {
				// first check to avoid switching to wrong guessed keys
				if (!key.classList.contains("wrong")) {
					if (lastKeyPressed != undefined) {
						lastKeyPressed.classList.remove("selected");
					}

					if (key == lastKeyPressed) {
						key.classList.remove("selected");
						lastKeyPressed = undefined;
					} else {
						key.classList.add("selected");
						lastKeyPressed = key;
					}
				}

			}
		}
	});

	keyboard.append(key);
}

const buttons = document.createElement("div");
buttons.classList.add("minigame-buttons");

const repeat = document.createElement("button");
const imageRepeat = document.createElement("img");

imageRepeat.src = "./img/repeat.png";
imageRepeat.id = "repeat";
repeat.append(imageRepeat);

const guess = document.createElement("button");
const imageGuess = document.createElement("img");

imageGuess.src = "./img/guess.png";
guess.id = "guess";
guess.append(imageGuess);

const next = document.createElement("button");
const imageNext = document.createElement("img");

imageNext.src = "./img/next.png";
next.append(imageNext);

const play = document.createElement("button");
const imagePlay = document.createElement("img");

imagePlay.src = "./img/play.png";
play.id = "play";
play.append(imagePlay);


buttons.append(play);

container.append(currentNote);
container.append(keyboard);
container.append(buttons);

// delay piano fadein
setTimeout(() => {
	main.append(container);
}, 1000);


// minigame starts here
const instrument = new Instrument("piano");
let note;

function nextRandomNote() {
	note = new Note(
		notes[Math.floor(Math.random() * notes.length)],
		Math.floor(Math.random() * (7 - 1) + 1)
	);

	if (currentNote.innerText != "?") {
		currentNote.innerText = note.name;
	}

	instrument.play(note);
}

play.addEventListener("click", () => {
	started = true;
	play.remove();
 	buttons.append(guess, repeat);

	currentNote.addEventListener("click", () => {
		currentNote.innerText = currentNote.innerText == "?" ? note.name : "?";
	});

	nextRandomNote();

});

guess.addEventListener("click", () => {
	if (lastKeyPressed.id == note.name) {
		lastKeyPressed.classList.add("correct");

		noteGuessed = true;
		guess.remove();

		buttons.prepend(next);

		lastKeyPressed = undefined;

	} else {
		lastKeyPressed.classList.add("wrong");
	}
});

repeat.addEventListener("click", () => {
	instrument.play(note);
});

next.addEventListener("click", () => {
	next.remove();
	buttons.prepend(guess);
	noteGuessed = false;
	
	const keys = document.querySelectorAll(".key");
	for (const key of keys) {
		key.classList.remove("wrong");
		key.classList.remove("correct");
		key.classList.remove("selected");
	}

	nextRandomNote();
});



