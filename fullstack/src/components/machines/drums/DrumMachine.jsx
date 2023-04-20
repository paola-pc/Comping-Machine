import BankSelect from "../BankSelect";
import kits from '../../../../libs/drumkits';
import { useState } from "react";

const hardCodedArr = [0, 0, 1, 0,
  0, 0, 1, 1,
  0, 0, 1, 0,
  1, 0, 1, 0,]

const DrumMachine = () => {
  const [seq, setSeq] = useState(hardCodedArr);
  return (
    <div className="container flex  flex-col items-center my-10">
      <div className="ring  px-5 flex justify-between w-full items-center ">
        <div className="w-fit my-4">
          <span className="text-white">Kit Select:</span>
          <BankSelect soundBank={kits} />
        </div>
        <div className=" p-5 w-10/12">
          <div className="ring flex ">
            <span className="text-white">Sound name </span>
            <div className="flex justify-evenly w-full">

            {seq.map((el, i) => <div className="inline w-[60px] text-whit bg-fuchsia-400 ring">{i}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrumMachine;