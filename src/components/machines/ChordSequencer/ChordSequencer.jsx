import { useEffect, useState } from "react";
import { Chord } from "tonal";
import ChordSelector from "./ChordSelector";
import ChordSequence from "./ChordSequence";
import useChord from "../../../../Hooks/useChord";

const containerStyle = "flex h-fit w-[450px] md:w-full p-2 rounded-b-lg  justify-between mx-auto gap-1 "
const machineShadow = {
  boxShadow: 'inset 0 0px 10px 0 rgba(0, 0, 0, 0.25)',
}

  ;
const ChordSequencer = ({ setChordProgression, savedChords }) => {
  const [bars, setBars] = useState('2');
  const [sequence, setSequence] = useState([]);
  let [step, setStep] = useState(null)
  const [chordNames, setChordNames] = useState([]);
  const chord = useChord();

  // INIT VALUES ·······························································
  useEffect(() => {
    console.log('init values', savedChords)
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
      setBars(oldChords.length / 16)
      setSequence([...savedChords])
    }
    else {
      setSequence([...Array(16 * Number(bars)).fill(null)]);
      setChordNames([...Array(16 * Number(bars)).fill(null)]);
    }
  }, [savedChords])

  // FUNCTIONS ··································································
  const handleBars = (e) => {
    let newAmountOfBars = Number(e.target.value)
    const emptyBars = [...Array(newAmountOfBars * 16).fill(null)]

    const newSequence = [];
    const newChordNames = [];
    emptyBars.forEach((el, i) => {
      if (sequence[i]) newSequence.push(sequence[i])
      else newSequence.push(el);
      if (chordNames[i]) newChordNames.push(chordNames[i])
      else newChordNames.push(el);
    })

    setSequence(newSequence);
    setChordProgression(newSequence);
    setChordNames(newChordNames)
    setBars(Number(newAmountOfBars))
  }

  function addChord() {
    if (chord.chordType && chord.rootNote) {
      const newChord = [chord.rootNote, chord.chordType];
      console.log('newChord', newChord)
      let prevSeq = sequence;
      prevSeq[step] = newChord;
      setSequence([...prevSeq]);
      setChordProgression([...prevSeq]);

      let chordRoot = chord.rootNote.slice(0, chord.rootNote.length - 1);
      // let chordName = Chord.get(`${chord.rootNote}${chord.chordType}`).aliases[0]; // Provided by the library, not 100% accurate
      let chordName = `${chordRoot}${chord.chordType}`;
      let prevNames = chordNames;
      // prevNames[step] = chordRoot + chordName; // To make the aliases provided by the library look how they should
      prevNames[step] = chordName;
      setChordNames([...prevNames]);
    }
  }

  // EFFECTS ·····································································
  useEffect(() => {
    if (chord.chordIsReady) {
      console.log('CHORD IS READY', chord.chordIsReady, chord)
      addChord();
      chord.setChordIsReady(false)
    }
  }, [chord.chordIsReady])

  return (
    <div className={`${containerStyle} bg-zinc-900 border border-cyan-300/50 rounded-lg`}>
      <div className="w-full h-[95%] min-h-[250px] rounded-lg overflow-x-hidden overflow-y-auto pb-2 ">
        <ChordSequence
          setProg={setChordProgression}
          bars={bars}
          handleBars={handleBars}
          sequence={sequence}
          setSequence={setSequence}
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

