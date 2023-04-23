import BankSelect from "./BankSelect";
import kits from '../../../libs/drumkits';
import padSounds from '../../../libs/padSounds';
import { use, useState } from "react";
import ChordSeq from "bring/components/machines/chords/ChordSeq";
import Master from "bring/components/machines/master/Master";


const ConfigMachine = () => {
  const [drums, setDrums] = useState(kits[0]);
  const [pad, setPad] = useState('/sounds/pad-soft.mp2') // Default

  return (
    <>
      <ChordSeq />
      <div className="container flex m-10 justify-around w-full items-start p-5">
        <Master samples={drums}  />
        <div>
          <div className="bg-fuchsia-300 p-2 rounded my-10 shadow shadow-lg shadow-sky-700">
            <span className="text-fuchsia-950">DrumKit: </span>
            <BankSelect soundBank={kits} setSound={setDrums}  />
          </div>
          <div className="bg-emerald-200 p-2 rounded shadow shadow-lg shadow-fuchsia-800">
            <span className="text-emerald-950">Sound Bank: </span>
            <BankSelect soundBank={padSounds} setSound={setPad}  />
          </div>
        </div>
      </div>


    </>
  )
}

export default ConfigMachine;