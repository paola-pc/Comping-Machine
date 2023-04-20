import BankSelect from "../BankSelect";
import padSounds from '../../../../libs/padSounds';

const ChordSeq = () => {
  return (
    <div className="container flex  flex-col items-center">
      <h1 className="text-white ">Chord Sequencer</h1>
      <br></br>
      <div className="grid gap-4 grid-cols-2">
        <h1 className="text-white">ChordSeq</h1>
        <div>
          <span className="text-white">Bank Select:</span>
          <BankSelect soundBank={padSounds}/>
        </div>
      </div>
    </div>
  )
}

export default ChordSeq;