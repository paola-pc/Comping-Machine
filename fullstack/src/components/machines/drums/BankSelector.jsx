import BankSelect from "../BankSelect";
import kits from '../../../../libs/drumkits';
import padSounds from '../../../../libs/padSounds';
import { useState } from "react";
import ChordSeq from "bring/components/machines/chords/ChordSeq";
import Master from "bring/components/master/Master";


const BankSelector = () => {
  const [drums, setDrums] = useState(kits[0].sounds);
  const [pad, setPad] = useState(null);
  console.log()

  return (
    <>
      <ChordSeq />
      <div className="flex m-10 justify-between w-full items-start p-5">
      <Master samples={drums} />
        <div className="bg-fuchsia-200 p-2 rounded">
          <span className="text-fuchsia-900">DrumKit: </span>
          <BankSelect soundBank={kits} setSound={setDrums} />
        </div>
        <div className="bg-emerald-200 p-2 rounded">
          <span className="text-emerald-900">Sound Bank: </span>
          <BankSelect soundBank={padSounds} setSound={setPad} />
        </div>
      </div>

      
    </>
  )
}

export default BankSelector;