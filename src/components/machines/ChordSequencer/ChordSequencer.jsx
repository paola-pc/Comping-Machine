import { useEffect, useState } from "react";
import ChordSelector from "./ChordSelector";
import ChordSequence from "./ChordSequence";
import useChord from "../../../../Hooks/useChord";

const containerStyle = "flex h-fit w-[450px] md:w-full p-2 rounded-b-lg  justify-between mx-auto gap-1 "
const machineShadow = {
  boxShadow: 'inset 0 0px 10px 0 rgba(0, 0, 0, 0.25)',
}

  ;
const ChordSequencer = ({ setChordProgression, savedChords: chordProgression }) => {
  const [bars, setBars] = useState('2');
  let [step, setStep] = useState(null)
  const [chordNames, setChordNames] = useState([]);
  const chord = useChord();


  // FUNCTIONS & HANDLERS ··································································

  const getChordName = (rootNote, type) => {
    let chordRoot = rootNote.slice(0, rootNote.length - 1);
    // Aliases provided by the library, not 100% accurate
    // let chordName = Chord.get(`${chord.rootNote}${chord.chordType}`).aliases[0]; 
    let chordName = `${chordRoot}${type}`;
    return chordName;
  }

  const handleBarsChange = (e) => {
    let newAmountOfBars = Number(e.target.value)
    const emptyBars = [...Array(newAmountOfBars * 16).fill(null)]

    const newSequence = [];
    const newChordNames = [];
    emptyBars.forEach((el, i) => {
      if (chordProgression[i]) newSequence.push(chordProgression[i])
      else newSequence.push(el);
      if (chordNames[i]) newChordNames.push(chordNames[i])
      else newChordNames.push(el);
    })

    setChordProgression(newSequence);
    setChordNames(newChordNames)
    setBars(Number(newAmountOfBars))
  }

  function handleAddChord() {
    if (chord.chordType && chord.rootNote) {
      const newChord = [chord.rootNote, chord.chordType];
      let prevSeq = chordProgression;
      prevSeq[step] = newChord;
      setChordProgression([...prevSeq]);
    }
  }

  // EFFECTS & INIT VALUES ······································································

  useEffect(() => {
    if (chordProgression?.length > 0) {
      setChordNames(chordProgression.map(seqChord => {
        if (!seqChord) return seqChord;
        const chordName = getChordName(seqChord[0], seqChord[1])
        return chordName;
      }));
      setBars(chordProgression.length / 16)
    }
    else {
      setChordProgression([...Array(16 * Number(bars)).fill(null)]);
      setChordNames([...Array(16 * Number(bars)).fill(null)]);
    }
  }, [chordProgression])


  useEffect(() => {
    if (chord.chordIsReady) {
      handleAddChord();
      chord.setChordIsReady(false)
    }
  }, [chord.chordIsReady])

  return (
    <div className={`${containerStyle} bg-zinc-900 border border-cyan-300/50 rounded-lg`}>
      <div className="w-full h-[95%] min-h-[250px] rounded-lg overflow-x-hidden overflow-y-auto pb-2 ">
        <ChordSequence
          chordProgression={chordProgression}
          setChordProgression={setChordProgression}
          bars={bars}
          handleBarsChange={handleBarsChange}
          chordNames={chordNames}
          setChordNames={setChordNames}
          setStep={setStep}
          step={step}
        />
      </div>
      <div className="w-[500px] h-full bg-gray-600 rounded-lg p-1" style={machineShadow}>
        <ChordSelector step={step} />
      </div>
    </div>);
}

export default ChordSequencer;

