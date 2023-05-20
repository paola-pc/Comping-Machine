import { useEffect, useState } from "react";
import ChordSelector from "./ChordSelector";
import useChord from "../../../../Hooks/useChord";
import { Chord } from "tonal";

const ChordSeq = ({ setProg, savedChords }) => {
  const [bars, setBars] = useState(1);
  const [seq, setSeq] = useState([...Array(16).fill(null)]);
  let [step, setStep] = useState(null)
  const [showSelector, setShowSelector] = useState(false);
  const [chordNames, setChordNames] = useState([]);
  const chord = useChord();

  useEffect(() => {
    console.log('saved Chord Prog', savedChords)
    if (savedChords?.length > 0) {
      let oldChords = [...Array(16).fill(null)];
      for (let i = 0; i < savedChords.length; i++) {
        if (savedChords[i]) {
          let chordRoot = savedChords[i][0].slice(0, chord.rootNote.length - 1);
          let chordName = Chord.get(`${chordRoot}${savedChords[i][1]}`).aliases[0];
          oldChords[i] = chordRoot + chordName;
        }
      }
      setChordNames([...oldChords])
    } else {
      setChordNames([...Array(16).fill(null)])
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
      let chordName = Chord.get(`${chord.rootNote}${chord.chordType}`).aliases[0];
      let prevNames = chordNames;
      prevNames[step] = chordRoot + chordName;
      setChordNames([...prevNames]);
    }
  }

  function removeChord(e) {
    console.log(e.target.id);
    let prevSeq = seq;
    prevSeq[e.target.id] = null;
    setSeq(() =>[...prevSeq]);
    setProg([...prevSeq]);
    let prevNames = chordNames;
    prevNames[e.target.id] = null;
    setChordNames([...prevNames]);
  }

  return (
    <div className="container flex  flex-col items-center my-2">
      <div className="relative p-1 w-10/12">
        <form >
          <label className="text-fuchsia-400">Bars:
            <select onChange={(e) => handleBars(e)} className="text-fuchsia-950 rounded-lg ml-6 mb-2">
              <option>1</option>
              {/* Futue Feature: */}
              <option>2</option> 
              <option>4</option>
              <option>16</option>
              <option>32</option>
            </select>
          </label>
        </form>
        <div className="flex ">
          <span className="text-white text-md mr-2 w-[50px]">Steps: </span>

          <div className="relative flex justify-between w-full">
            {seq.map((el, i) => {
              return <>
                <div className="relative">
                  <div id={i}
                    onClick={(e) => handleStepClick(e)}
                    className="inline hover:opacity-100 hover:bg-fuchsia-500 opacity-80 rounded min-w-[50px] h-fit text-white bg-fuchsia-600
                    flex flex-col">
                    {i + 1}
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
                <ChordSelector setShowSelector={setShowSelector} addChord={addChord}/>
              </div>
            }
          </div>
        </div>
        <div className="block left-20 mt-1">
          <div className="flex justify-between items-center w-full ">
            <span className="text-white text-md -mr-3 w-[50px] ">Chart: </span>
            {chordNames.map((name) => {
              return <div className="text-fuchsia-950 bg-fuchsia-200 px-1 inline opacity-80 rounded w-[50px] y-[50px] text-sm
                    ">{name}
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChordSeq;