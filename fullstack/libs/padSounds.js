class bankBuilder {
  constructor(name, url) {
    this.name = name,
      this.url = url
  }
}

const base = '/fullstack/public/sounds';

const dream = new bankBuilder('Dream', base + '/dream.mp3')
const pianoLong = new bankBuilder('Piano Long', base + '/piano-long.mp3')
const pianoShort = new bankBuilder('Piano Short', base + '/piano-short.mp3')
const pluck = new bankBuilder('Pluck', base + '/pluck-pad.mp3')
const softPad = new bankBuilder('Soft Pad', base + '/soft-pad.mp3')

const soundBank = [
  dream,
  pianoLong,
  pianoShort,
  pluck,
  softPad
]

// console.log(soundBank)

module.exports = soundBank;