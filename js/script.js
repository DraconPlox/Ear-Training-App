const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]


class Note {
	constructor(name, type) {
		this.name = name;
		this.type = type;
	}
}

class Chord {
	constructor(name) {
		this.name = name;
		this.notes = this.createChord(name);
		this.inversion = 0;
	}

	createChord(name) {
		const chord = [];
		const split = name.split("m");	
		let root, third, fifth;

		root = notes.indexOf(split[0]);

		if (split.length >= 2) { // includes m, therefore, this is a minor chord
			third = root + 3;
			fifth = third + 4;
		} else {
			third = root + 4;
			fifth = third + 3;
		}

		if (third > notes.length - 1) {
			third = third - notes.length;
		}

		if (fifth > notes.length - 1) {
			fifth = fifth - notes.length;
		}

		chord.push(notes[root], notes[third], notes[fifth]);

		return chord;
	}

}


class Piece {
	constructor(tempo) {
		this.tempo = tempo;
		this.timeSignature = 4; // take it as a 4/4 for now

		this.note = new Note("C", 16);
	}

	play() {
		let bar = 0;
		let click = 0;
		
		const interval = setInterval(() => {
			// metronome
			new Audio("./assets/piano/C-8.opus").play();
			click++;

			console.log(click);

			if (click >= this.timeSignature) {
				bar++;
				click = 0;
				console.log("Bar: " + bar);
			}

			/*
			// whole note test
			if (this.note.type == 1 && click == 1) {
				new Audio("./assets/piano/C-4.opus").play();
			}

			// half note test
			if (this.note.type == 2 && click == 1 || click == 3) {
				new Audio("./assets/piano/C-4.opus").play();
			}

			// quarter note
			if (this.note.type == 4) {
				new Audio("./assets/piano/C-4.opus").play();
			}
				
			// eighth note
			if (this.note.type == 8) {
				new Audio("./assets/piano/C-4.opus").play();
					console.log("note");
				setTimeout(() => {
					new Audio("./assets/piano/C-4.opus").play();
					console.log("note");
				}, this.calculateBPM(this.tempo * 2));
			}*/

			// sixteenth note
				
			let lastTime = 0;

			for (let i = 0; i < this.note.type; i++) {

				setTimeout(() => {
					// new Audio("./assets/piano/C-4.opus").play();
					console.log("note");
				}, lastTime);

				lastTime += this.calculateBPM(this.tempo) / 4;

				// 1 = 4 notes
				// 2 = 8 notes
				// 4 = 16 notes
			}
			



		}, this.calculateBPM(this.tempo));
	}

	calculateBPM(tempo) {
		return 60 * 1000 / tempo;
	}
}


const piece = new Piece(60);

const button = document.getElementById("button");

button.addEventListener("click", () => {
	piece.play();
});

