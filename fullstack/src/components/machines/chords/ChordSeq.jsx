import { useEffect, useState } from "react";
import ChordSelector from "./ChordSelector";
import useChord from "../../../../Hooks/useChord";
import { Chord } from "tonal";

const ChordSeq = ({ setProg, savedChords }) => {
  const [bars, setBars] = useState(savedChords?.length ? (savedChords?.length / 4).toString() : '2');
  const [seq, setSeq] = useState([...Array(savedChords?.length ? savedChords?.length : 32).fill(null)]);
  let [step, setStep] = useState(null)
  const [showSelector, setShowSelector] = useState(false);
  const [chordNames, setChordNames] = useState([]);
  const chord = useChord();

  useEffect(() => {
    if (savedChords?.length > 0) {
      let oldChords = [...Array(savedChords.length).fill(null)];
      for (let i = 0; i < savedChords.length; i++) {
        if (savedChords[i]) {
          let chordRoot = savedChords[i][0].slice(0, chord.rootNote.length - 1);
          let chordName = Chord.get(`${chordRoot}${savedChords[i][1]}`).aliases[0];
          oldChords[i] = chordRoot + chordName;
        }
      }
      setChordNames([...oldChords])
    }
    else {
      setChordNames([...Array(savedChords?.length ? savedChords?.length : 32).fill(null)])
    }
  }, [savedChords])

  const handleBars = (e) => {
    let barsN = Number(e.target.value)
    setBars(barsN)
    setSeq([...Array(barsN * 16).fill(null)])
    setChordNames([...Array(barsN * 16).fill(null)]);
    setProg([...Array(barsN * 16).fill(null)])
  }

  // Shows or hides the chord selector
  const handleStepClick = (e) => {
    setStep(e.target.id)
    showSelector ? setShowSelector(false) : setShowSelector(true);
  }

  function addChord() {
    if (chord.chordType && chord.rootNote) {
      const newChord = [chord.rootNote, chord.chordType]
      let prevSeq = seq;
      prevSeq[step] = newChord;
      setSeq([...prevSeq]);
      setProg([...prevSeq]);

      let chordRoot = chord.rootNote.slice(0, chord.rootNote.length - 1);
      // let chordName = Chord.get(`${chord.rootNote}${chord.chordType}`).aliases[0]; // Provided by the library, not 100% accurate
      let chordName = `${chordRoot}${chord.chordType}`;
      let prevNames = chordNames;
      // prevNames[step] = chordRoot + chordName; // To make the aliases provided by the library look how they should
      prevNames[step] = chordName;
      setChordNames([...prevNames]);
    }
  }

  function removeChord(e) {
    console.log(e.target.id);
    let prevSeq = seq;
    prevSeq[e.target.id] = null;
    setSeq(() => [...prevSeq]);
    setProg([...prevSeq]);
    let prevNames = chordNames;
    prevNames[e.target.id] = null;
    setChordNames([...prevNames]);
  }

  return (
    <div id='chordseq'
      className="lg:max-w-[1000px] min-w-[450px] mx-auto my-7 ">
      <h3 className="text-sky-600 text-md absolute right-1">
        Chord Sequencer
      </h3>
      <form >
        <label className="text-fuchsia-400">Bars:
          <select defaultValue={bars}
            onChange={(e) => handleBars(e)} className="text-fuchsia-950 text-sm py-0 rounded-lg ml-6 mb-2 h-7 bg-fuchsia-100">
            <option key='1'>1</option>
            <option key='2'>2</option>
            <option key='4'>4</option>
            <option key='8'>8</option>
            <option key='16'>16</option>
            <option key='32'>32</option>
          </select>
        </label>
      </form>

      <div className="flex ">
        <div className="w-full" style={{display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: ' 3px 2px',}}>
          {seq.map((el, i) => {
            return <>
              <div key={el + '-' + i} className="relative">
                <div id={i}
                  onClick={(e) => handleStepClick(e)}
                  className={`flex items-center justify-center opacity-80 rounded min-w-[60px] h-[30px] text-fuchsia-300 text-xs 
                  ${  Math.ceil((i+1) / 4) % 2 === 0 ? 'bg-fuchsia-600' : 'bg-sky-600'}
                  ${  Math.ceil((i + 1) / 4) % 2 === 0 ? 'hover:opacity-100 hover:bg-fuchsia-500' : 'hover:opacity-100 hover:bg-sky-600'}
                  `}
                >
                  <span id="bar-number" className="absolute -top-[2px] left-[1px]">{i + 1}</span>
                  <span id="chord-name" className="text-white text-sm">{chordNames[i] || ''}</span>
                </div>
                <div className="">
                  <button className={`opacity-70 hover:opacity-100 absolute -top-3 -right-2 
                    ${chordNames[i] ? 'visible' : 'invisible'}`}
                    id={i} onClick={(e) => removeChord(e)}>⛔</button>
                </div>
              </div>
            </>
          })}
          {showSelector &&
            <div className={`w-full absolute top-11 z-10 p-3`}>
              <ChordSelector setShowSelector={setShowSelector} addChord={addChord} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ChordSeq;