import { useState } from "react";

import SubdivisionSelector from "./SubdivisionSelector";
import SequenceGrid from "./SequenceGrid";

const ChordSeq = ({ setProg, bars, handleBars, sequence, setSequence, chordNames, setChordNames, step, setStep }) => {
  const [subdivision, setSubdivision] = useState('4')

  function onRemoveChord(e) {
    let prevSeq = sequence;
    prevSeq[e.target.id] = null;
    setSequence(() => [...prevSeq]);
    setProg([...prevSeq]);
    let prevNames = chordNames;
    prevNames[e.target.id] = null;
    setChordNames([...prevNames]);
  }

  return (
    <div id='chord-sequence' className="min-w-[650px] flex flex-col">
      <div className="w-full flex justify-start items-center gap-8 pb-4">
        <div className='flex gap-2 items-center'>
          <label className='text-xs text-fuchsia-600 italic '>Bars</label>
          <select value={bars}
            onChange={(e) => handleBars(e)} className='bg-gray-900 text-fuchsia-200 text-xs rounded-lg h-8 w-[75px]'>
            <option key='1' >1</option>
            <option key='2' >2</option>
            <option key='4' >4</option>
            <option key='8' >8</option>
            <option key='16'>16</option>
            <option key='32'>32</option>
          </select>
        </div>
        <SubdivisionSelector subdivision={subdivision} setSubdivision={setSubdivision} />
      </div>
      <div className="bg-black py-3 px-2 rounded-lg overflow-y-auto ">
        <SequenceGrid chordNames={chordNames} onRemoveChord={onRemoveChord} setStep={setStep} bars={bars} step={step} subdivision={subdivision} />
      </div>
    </div>
  )
}

export default ChordSeq;