const chordTypes = require('../../../../libs/chordTypes');
import { useState, useEffect } from 'react';
import useChord from '../../../../Hooks/useChord';
import MachineButton from './MachineButton';

const ChordSelector = ({ step }) => {
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedOctave, setSelectedOctave] = useState('2');
  const [typeGroup, setTypeGroup] = useState('commonChords')
  const chord = useChord()

  const rootSelect = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B', 'B#', 'Cb'];

  const buildChord = ({ type, chordRoot, octave }) => {
    let rootNote = (chordRoot || selectedRoot) + (octave || selectedOctave);
    const chordType = type || selectedType
    chord.updateRoot(rootNote);
    chord.updateType(chordType);
    chord.setChordIsReady(true)

    // Set states
    if (chordRoot) setSelectedRoot(chordRoot);
    if (octave) setSelectedOctave(octave);
    if (type) setSelectedType(type);
  }

  const handleOnClick = (type) => {
    buildChord({ type })
    chord.setChordIsReady(true)

    // Set states
    setSelectedType(type)
  }

  return (
    <div className='flex flex-col justify-start items-between gap-2'>
      <div key="chord-dropdown-container" className='flex justify-around w-full gap-1'>
        <div className='flex flex-col'>
          <label className='text-xs text-gray-600 italic'>root note</label>
          <select required
            onChange={(e) => buildChord({ chordRoot: e.target.value })}
            name='root' id='note-root'
            className='bg-gray-900 text-fuchsia-200 text-xs rounded-lg h-8 w-[80px]'>
            {rootSelect.map(root => <option key={root}>{root}</option>)}
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='text-xs text-gray-600 italic'>octave</label>
          <select required
            onChange={(e) => buildChord({ octave: e.target.value })}
            name='octave' id='octave-root'
            className='bg-gray-900 text-fuchsia-200  text-xs rounded-lg h-8 w-[100px]'>
            <option value="2">C2 - B2</option><option value="3">C3 - B3</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='text-xs text-gray-600 italic'>chord type</label>
          <select required
            onChange={(e) => setTypeGroup(e.target.value)}
            name='type' id='type'
            className='bg-gray-900 text-fuchsia-200  text-xs rounded-lg h-8 w-[120px]'>
            <option key="commonChords" value="commonChords">Common</option>
            <option key="altDomChords" value="altDomChords">7 alt chords</option>
            <option key="moreChords" value="moreChords">Other...</option>
          </select>
        </div>
      </div>

      <div key="chord-type-button-container" className='flex flex-wrap justify-center items-center gap-1'>
        {chordTypes[typeGroup]?.map(type => (
          <MachineButton
            key={'commonChords-' + type}
            label={type}
            fixWidth='w-[77px]'
            onClick={() => handleOnClick(type)}
            disabled={!Number.isInteger(step)}
            backgroundColor={selectedType === type ? 'bg-fuchsia-700' : 'bg-gray-800'}
          />))}
      </div>

    </div>
  );
}

export default ChordSelector;