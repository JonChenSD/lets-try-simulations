
import * as Tone from 'tone'

const notes = ['C','C#','D','D#','E','F','G','G#','A','A#','B']

const now = Tone.now()

const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
const synth = new Tone.Synth().toDestination();

const monoSynth = new Tone.MonoSynth({
	oscillator: {
		type: "square"
	},
	envelope: {
		attack: 0.1
	}
}).toDestination();

const sampler = new Tone.Sampler({
	urls: {
		A1: "bark.mp3",
		A2: "bark2.mp3",
	},
	baseUrl: "./assets/",
	onload: () => {
		sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
	}
}).toDestination();

const kalimba = new Tone.Sampler({
	urls: {
		C2: "kalimba.mp3"
	},
	baseUrl: "./assets/",
	onload: () => {
		sampler.triggerAttackRelease(["C2", "E2", "G2", "B2"], 4);
	}
}).toDestination();
const bongo = new Tone.Sampler({
	urls: {
		A1: "bongo1.mp3",
		A2: "bongo2.mp3",
	},
	baseUrl: "./assets/",
	onload: () => {
		bongo.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
	}
}).toDestination();

const trumpet = new Tone.Sampler({
	urls: {
		G2: "trumpetG2.mp3",
		
	},
	baseUrl: "./assets/",
	onload: () => {
		trumpet.triggerAttackRelease(["C1", "E1", "G1", "B1"], .8);
	}
}).toDestination();

const dog = new Tone.Player("./assets/bark.mp3").toDestination();
Tone.loaded().then(() => {
	dog.start();
});

Tone.start()

var player = {
    
    init: function() {
        document.querySelector('button')?.addEventListener('click', async () => {
            await Tone.start()
            console.log('audio is ready')
        })
    },

    instrumentType: function(x,y) {
        if((x - 1) == -1){
            return 'trumpet'
        }
        else if((x + 1)){
            
        }
    },

    play: function(type, x, y) {
        let note
        switch (type) {
			case 'kalimba':
				note = notes[(x % 11)]
				console.log(x,y, notes,note)
				kalimba.triggerAttackRelease(note + 2, 4)
				break
            case 'bongo': 
                note = notes[(y % 11)]
                console.log(x,y,notes,note)
                bongo.triggerAttackRelease(note + 2, 1)
				break
            case 'trumpet':
                note = notes[(y % 11)]
                trumpet.triggerAttackRelease(note + 2, 1);
				break
			case 'dog':
				sampler.triggerAttackRelease(["C2"], 0.5);
				break
        }
    }

}

// document.querySelector('button')?.addEventListener('click', async () => {
// 	await Tone.start()
// 	console.log('audio is ready')
// })

export { player }