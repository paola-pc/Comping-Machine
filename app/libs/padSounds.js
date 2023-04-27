class bankBuilder {
  constructor(name, url) {
    this.name = name,
    this.url = url
  }
}

const base = '/audio';

const dream = new bankBuilder('Dream', base + '/pad-dream.mp3')
const pianoLong = new bankBuilder('Piano Long', base + '/pad-piano-long.mp3')
const pianoShort = new bankBuilder('Piano Short', base + '/pad-piano-short.mp3')
const pluck = new bankBuilder('Pluck', base + '/pad-pluck.mp3')
const softPad = new bankBuilder('Soft Pad', base + '/pad-soft.mp3')

const soundBank = [
  dream,
  pianoLong,
  pianoShort,
  pluck,
  softPad
]

// console.log(soundBank)

module.exports = {bankBuilder, soundBank};