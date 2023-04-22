import BankSelect from "./BankSelect";
import kits from '../../../libs/drumkits';
import padSounds from '../../../libs/padSounds';
import { useState } from "react";
import ChordSeq from "bring/components/machines/chords/ChordSeq";
import Master from "bring/components/machines/master/Master";


const BankSelector = () => {
  const [drums, setDrums] = useState(kits[0].sounds);
  const [pad, setPad] = useState(null);
  console.log()

  return (
    <>
      <ChordSeq />
      <div className="container flex m-10 justify-around w-full items-start p-5">
        <Master samples={drums} />
        <div>

          <div className="bg-fuchsia-200 p-2 rounded my-10 shadow shadow-lg shadow-sky-700">
            <span className="text-fuchsia-900">DrumKit: </span>
            <BankSelect soundBank={kits} setSound={setDrums} />
          </div>
          <div className="bg-emerald-200 p-2 rounded shadow shadow-lg shadow-fuchsia-800">
            <span className="text-emerald-900">Sound Bank: </span>
            <BankSelect soundBank={padSounds} setSound={setPad} />
          </div>
        </div>
      </div>


    </>
  )
}

export default BankSelector;