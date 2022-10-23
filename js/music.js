const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]

class Note {
	constructor(name, register) {
		this.name = name;
		this.register = register;
	}
}

class Instrument {
	constructor(timbre) {
		this.timbre = timbre;
	}

	play(sound) {
		if (sound instanceof Chord) {
			const chord = sound;
			for (const note of chord.notes) {
				const audio = new Audio(`./assets/${this.timbre}/${note.name}-${note.register}.opus`);
				audio.play();

				const interval = setInterval(() => {
					audio.volume -= 0.03;
					if (audio.volume <= 0.03) {
						clearInterval(interval);
					}
				}, 100);

			}
		} else {
			const note = sound;
			const audio = new Audio(`./assets/${this.timbre}/${note.name}-${note.register}.opus`);
			audio.play();

			const interval = setInterval(() => {
				audio.volume -= 0.03;
				if (audio.volume <= 0.03) {
					clearInterval(interval);
				}
			}, 100);

		}
	}
}

class Chord {
	constructor(name) {
		this.name = name;
		this.notes = this.createChord(name);
		this.inversion = undefined;
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

		chord.push(
			new Note(notes[root]), 
			new Note(notes[third]), 
			new Note(notes[fifth])
		);

		return chord;
	}

}

export { Note, Chord, Instrument, notes }
