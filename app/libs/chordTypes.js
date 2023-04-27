const commonChords = [
  '5', 'M', 'm', 'dim', 'aug', 'sus2', 'sus4', 'add9', 'madd4', 'madd9', '6', 'm6',
  'maj7', 'm7', 'm/maj7', '7', 'm7b5', 'dim7', 'M7sus4', '7sus4',
  '69', 'm69', '69#11', 'M6#11',
  'sus4add9', 'maj9', 'M9sus4', 'm9', 'mMaj9', '9', '9sus4',
  'maj9#11', 'm11', 'm7add11', '11',
  'maj13', 'm13', '13', '13sus4', 'quartal'];
const altDomChords = [
  '7no5', '7b5', '7#5',
  '7#9', '7b9', 'alt7', '7b9sus4', '7#5#9', '7b9#5', '7b9#9',
  '7#11', '7#9#11', '7b9#11', '7#5b9#11',
  '7add13', '7b13', '7b9b13', '7#9b13', '7#11b13', '7#9#11b13', '7b9b13#11',
  '9no5', '9b5', '9#5', '9#11', '9b13', '9#5#11', '9#11b13', '11b9',
  '13no5', '13b5', '13b9', '13#9', '13#11', '13b9#11', '13#9#11',
]
const moreChords = [
  'maj7#5', 'M#5add9', 'M7b5', 'M7#11', 'maj9#5', 'M9b5', 'maj13#11',
  'Maddb9', 'Mb5', 'M7b9', 'M7b6', "M7#5sus4", 'maj7#9#11', 'M9#5sus4',
  'm9b5', 'm9#5', 'm11A', 'mb6b9', 'm#5', 'm7#5', 'mb6M7', 'mMaj7b6',
  '7#5sus4', '7sus4b9b13', 'oM7', 'o7M7'
];

module.exports = { commonChords, altDomChords, moreChords}