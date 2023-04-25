import BankSelect from "./BankSelect";
import kits from '../../../libs/drumkits';
import padSounds from '../../../libs/padSounds';
import { useEffect, useState } from "react";
import ChordSeq from "bring/components/machines/chords/ChordSeq";
import Master from "bring/components/machines/master/Master";


const ConfigMachine = ({savedSamples, savedDrumTracks, savedChordProg, savedPadSound}) => {
  const [drums, setDrums] = useState(kits[0]); // Default
  const [pad, setPad] = useState({ name: '', url: padSounds[0]}) // Default
  const [prog, setProg] = useState([]);

  useEffect(() => {
    if (savedDrumTracks?.length) {
      setDrums(savedSamples)
    }
    if (savedChordProg?.length) {
      setProg(savedChordProg)
    }
    if (savedPadSound?.url) {
      setPad(savedPadSound)
    }

  }, [savedChordProg, savedPadSound, savedDrumTracks, savedSamples]);
  
 

return (
  <>
    <ChordSeq setProg={setProg} savedChords={savedChordProg}/>
    <div className="container flex m-10 justify-around w-full items-start p-5">
      <Master samples={drums} padSound={pad} chordProg={prog} drumTracks={savedDrumTracks}/>
      <div>
        <div className="bg-fuchsia-300 p-2 rounded my-10 shadow shadow-lg shadow-sky-700">
          <span className="text-fuchsia-950">DrumKit: </span>
          <BankSelect soundBank={kits} setSound={setDrums} soundName={drums.name} />
        </div>
        <div className="bg-emerald-200 p-2 rounded shadow shadow-lg shadow-fuchsia-800">
          <span className="text-emerald-950">Pad Bank: </span>
          <BankSelect soundBank={padSounds} setSound={setPad} soundName={pad.name}/>
        </div>
      </div>
    </div>


  </>
)
}

export default ConfigMachine;