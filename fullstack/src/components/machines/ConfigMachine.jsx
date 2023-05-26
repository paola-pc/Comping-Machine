import BankSelect from "./BankSelect";
import kits from '../../../libs/drumkits';
import padSounds from '../../../libs/padSounds';
import { useEffect, useState } from "react";
import ChordSeq from "bring/components/machines/chords/ChordSeq";
import Master from "bring/components/machines/master/Master";


const ConfigMachine = ({ savedSamples, savedDrumTracks, savedChordProg, savedPadSound }) => {
  const [drums, setDrums] = useState(kits[0]); // Default
  const [pad, setPad] = useState({ name: padSounds[0].name, url: padSounds[0].url }) // Default
  const [prog, setProg] = useState([]);
  const [playing, setPlaying] = useState(false); //This is to disable both bank selector when the machine is playing

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
    <div id='mark' className="relative">
      <ChordSeq setProg={setProg} savedChords={savedChordProg} />
      <div className="flex justify-around w-fit items-start p-1 ">
        <Master samples={drums} padSound={pad} chordProg={prog} drumTracks={savedDrumTracks} setPlaying={setPlaying} />
        <div>
          <div className={`
            p-2 rounded my-10 bg-fuchsia-300
            ${playing ? 'opacity-75' : 'shadow shadow-lg shadow-sky-700'}
          `}>
            <span className="text-fuchsia-950">DrumKit: </span>
            <BankSelect soundBank={kits} setSound={setDrums} soundName={drums.name} playing={playing} />
          </div>
          <div className={`
            p-2 rounded bg-emerald-200 
            ${playing ? 'opacity-75' : 'shadow shadow-lg shadow-fuchsia-800'}
          `}>
            <span className="text-emerald-950">Pad Bank: </span>
            <BankSelect soundBank={padSounds} setSound={setPad} soundName={pad.name} playing={playing} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigMachine;