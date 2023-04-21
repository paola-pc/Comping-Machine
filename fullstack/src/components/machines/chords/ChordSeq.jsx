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
    <div className="container flex  flex-col items-center my-10">
      <div className="ring  px-5 flex justify-around w-full items-center ">
        <div className="w-fit my-4">
          <span className="text-white">Bank Select:</span>
          <BankSelect soundBank={padSounds} />
        </div>
        <div className=" p-5 w-10/12">
          <div className="flex ">
            <span className="text-white">Sound name </span>
            <div className="flex justify-between w-full">

              {seq.map((el, i) => <div className="inline hover:opacity-100 hover:bg-fuchsia-500 opacity-80 rounded w-[60px] text-whit bg-fuchsia-600">{i+1}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChordSeq;