import BankSelect from "../BankSelect";
import kits from '../../../../libs/drumkits';

const DrumMachine = () => {
  return (
    <div className="container flex  flex-col items-center">
      <h1 className="text-white ">Drum Machine</h1>
      <br></br>
      <div className="grid gap-4 grid-cols-2">
        <h1 className="text-white">DrumSeq</h1>
        <div>
          <span className="text-white">Kit Select:</span>
          <BankSelect soundBank={kits}/>
        </div>
      </div>
    </div>
  )
}

export default DrumMachine;