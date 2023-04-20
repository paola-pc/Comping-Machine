class KitBuilder {
  constructor(name, sounds) {
    this.name = name,
    this.sounds = sounds
  }

}

const kitEOE = new KitBuilder('808 Kit', {
  1: 'Kick',
  2: 'Rim Shot',
  3: 'Snare',
  4: 'Clap',
  5: 'Conga Low',
  6: 'Conga Mid',
  7: 'Conga high',
  8: 'Tom Low',
  9: 'Tom Mid',
  10: 'Tom High',
  11: 'Hihat Closed',
  12: 'Hihat Open',
  13: 'Cymbal',
  14: 'Maracas',
  15: 'Cow Bell',
  16: 'Claves'
})

const kitAcoustic = new KitBuilder('Acoustic Kit', {
  1: 'Kick',
  2: 'Rim Sidestick',
  3: 'Snare',
  4: 'Snare 2 (RHand)',
  5: 'Snare 3 (soft)',
  6: 'Tom 4',
  7: 'Tom 3',
  8: 'Tom 2',
  9: 'Tom 1',
  10: 'Hihat Foot',
  11: 'Hihat Closed',
  12: 'Hihat Open',
  13: 'Crash',
  14: 'Ride Edge',
  15: 'Ride Bell',
  16: 'China'
})

const drumKits = [kitEOE, kitAcoustic]

module.exports = drumKits;