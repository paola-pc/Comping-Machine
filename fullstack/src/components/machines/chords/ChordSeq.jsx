import BankSelect from "../BankSelect";
import padSounds from '../../../../libs/padSounds';
import { useState } from "react";

const hardCodedArr = [0, 0, 1, 0,
  0, 0, 1, 1,
  0, 0, 1, 0,
  1, 0, 1, 0,]

const ChordSeq = () => {
  const [seq, setSeq] = useState(hardCodedArr);

  return (
    <div className="container flex  flex-col items-center">
      <h1 className="text-white ">Chord Sequencer</h1>
      <br></br>
      <div className="grid gap-4 grid-cols-2">
        <div className="grid gap-4 grid-cols-18 ring p-5">
          <h1 className="text-white">ChordSeq</h1>
          <div className="ring ">
            {seq.map((el, i) => <div className="inline text-whit bg-fuchsia-400 ring">{i}</div>)}
          </div>
        </div>
        <div>
          <span className="text-white">Bank Select:</span>
          <BankSelect soundBank={padSounds} />
        </div>
      </div>
    </div>
  )
}

export default ChordSeq;