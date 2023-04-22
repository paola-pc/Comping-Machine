import ChordSeq from "bring/components/machines/chords/ChordSeq";
import BankSelector from "bring/components/machines/drums/BankSelector";
import Master from "bring/components/master/Master";

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center w-full">
      {/* <div className="w-full flex flex-col items-center justify-center my-5"> */}
        <BankSelector />
        
      {/* </div> */}
    </div>
  )
}
