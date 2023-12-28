class SoundBank {
  constructor(name, sounds) {
    this.name = name,
      this.sounds = sounds
  }
}

const getAllKeysSounds = (range, baseUrl) => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const enharmonies = {
    'C': 'B#',
    'C#': 'Db',
    'D#': 'Eb',
    'E': 'Fb',
    'F': 'E#',
    'F#': 'Gb',
    'G#': 'Ab',
    'A#': 'Bb',
    'B': 'Cb'
  }
  const sounds = {};

  for (let i = 0; i < range.length; i++) {
    for (let j = 0; j < notes.length; j++) {
      const noteName = notes[j];
      const noteFullName = `${noteName}${range[i]}`;
      let enharmonicOctaveShift = 0;
      if (noteName === 'C') enharmonicOctaveShift = -1;
      if (noteName === 'B') enharmonicOctaveShift = 1;

      sounds[noteFullName] = `${baseUrl}/${encodeURIComponent(noteFullName) }.mp3`;
      if (Object.keys(enharmonies).includes(noteName)) {
        const enharmonicFullName = `${enharmonies[noteName]}${range[i] + enharmonicOctaveShift}`;
        sounds[enharmonicFullName] = `${baseUrl}/${encodeURIComponent(noteFullName)}.mp3`;
      }
    }
  }
  return sounds
}

const dreamSounds = getAllKeysSounds([1, 2, 3, 4, 5, 6], '/audio/pad-dream')
const dream = new SoundBank('Dream', dreamSounds);

const pianoLongSounds = getAllKeysSounds([1, 2, 3, 4, 5, 6], '/audio/pad-piano-long')
const pianoLong = new SoundBank('Long Piano', pianoLongSounds);

const pianoShortSounds = getAllKeysSounds([1, 2, 3, 4, 5, 6], '/audio/pad-piano-short')
const pianoShort = new SoundBank('Short Piano', pianoShortSounds);

const pluckSounds = getAllKeysSounds([1, 2, 3, 4, 5, 6], '/audio/pad-pluck')
const pluck = new SoundBank('Pluck', pluckSounds);

const fmPluckSounds = getAllKeysSounds([1, 2, 3, 4, 5, 6], '/audio/pad-fm-pluck')
const fmPluck = new SoundBank('FM Pluck', fmPluckSounds);

const softPadSounds = getAllKeysSounds([1, 2, 3, 4, 5, 6], '/audio/pad-soft')
const softPad = new SoundBank('Soft', softPadSounds);


const soundBank = {
  dream,
  pianoLong,
  pianoShort,
  pluck,
  fmPluck,
  softPad
}

export default soundBank;