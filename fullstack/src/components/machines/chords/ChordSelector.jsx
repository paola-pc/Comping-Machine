const chordTypes = require('../../../../libs/chordTypes');
import { useState, useEffect } from 'react';

const ChordSelector = () => {
  const [selectedType, setSelectedType] = useState('M');
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedOctave, setSelectedOctave] = useState('2');

  const rootSelect = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B', 'B#', 'Cb'];

  return (
    <form className='text-fuchsia-500 '>
      <label>Octave:
        <select onChange={(e) => setSelectedOctave(e.target.value)}
          name='octave' id='octave-root'
          className='text-fuchsia-950 rounded-lg mx-2'>
          <option>2</option><option>3</option>
        </select>
      </label>
      <label>Root:
        <select onChange={(e) => setSelectedRoot(e.target.value)}
          name='root' id='note-root'
          className='text-fuchsia-950 rounded-lg mx-2'>
          {rootSelect.map(root => <option>{root}</option>)}
        </select>
      </label>
      <label>Type:
        <select onChange={(e) => setSelectedType(e.target.value)}
          name='type' id='chord-type'
          className='text-fuchsia-950 rounded-lg mx-2'>
          <optgroup label="Everyday Chords: ">
            {chordTypes.commonChords.map(type => <option>{type}</option>)}
          </optgroup>
          <optgroup label="Altered Dominant: ">
            {chordTypes.commonChords.map(type => <option>{type}</option>)}
          </optgroup>
          <optgroup label="More Chords: ">
            {chordTypes.moreChords.map(type => <option>{type}</option>)}
          </optgroup>
        </select>
      </label>
      
    </form>
  );
}

export default ChordSelector;