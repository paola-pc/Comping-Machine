import BankSelect from "./BankSelect";
import {KitBuilder, drumKits} from '../../../libs/drumkits';
import {bankBuilder, soundBank} from '../../../libs/padSounds';
import { useEffect, useState } from "react";
import ChordSeq from "./chords/ChordSeq";
import Master from "./master/Master";

interface ConfigMachineProps {
  savedSamples?: KitBuilder,
  savedDrumTracks?: KitBuilder[],
  savedChordProg?: string[][] ,
  savedPadSound?: Pad,
}

export interface Pad {
  name?: string,
  url?: bankBuilder
}


const ConfigMachine = ({savedSamples, savedDrumTracks, savedChordProg, savedPadSound}: ConfigMachineProps)  => {
  const [drums, setDrums] = useState<KitBuilder>(drumKits[0]); // Default
  const [pad, setPad] = useState<Pad>({ name: '', url: soundBank[0]}) // Default
  const [prog, setProg] = useState<string[][]>([]);

  useEffect(() => {
    if (savedDrumTracks?.length) {
      console.log(typeof savedSamples)
      setDrums(savedSamples)
    }
    if (savedChordProg?.length) {
      console.log(typeof savedChordProg)
      setProg(savedChordProg)
    }
    if (savedPadSound?.url) {
      console.log(typeof savedPadSound)
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
          <BankSelect soundBank={drumKits} setSound={setDrums} soundName={drums.name} />
        </div>
        <div className="bg-emerald-200 p-2 rounded shadow shadow-lg shadow-fuchsia-800">
          <span className="text-emerald-950">Pad Bank: </span>
          <BankSelect soundBank={soundBank} setSound={setPad} soundName={pad.name}/>
        </div>
      </div>
    </div>


  </>
)
}

export default ConfigMachine;