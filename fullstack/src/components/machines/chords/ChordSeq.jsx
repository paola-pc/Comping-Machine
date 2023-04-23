import { useState } from "react";
import ChordSelector from "./ChordSelector";
// import { chordTypes } from '../../../../libs/chordTypes';

const hardCodedArr = [['Ab2', 'Abmaj9'], null, null, null, null, null, null, null, null, null, null, null, null, null, ['C3', 'Cmaj7'],
  null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

const ChordSeq = ({ }) => {
  const [bars, setBars] = useState(1);
  const [seq, setSeq] = useState([...Array(16)]);
  const [chordProgression, setChordProgression] = useState([]);
  

  const handleBars = (e) => {
    let barsN = Number(e.target.value)
    setBars(barsN)
    setChordProgression([...Array(barsN * 16).fill(null)])
    console.log(chordProgression)
  }

  return (
    <div className="container flex  flex-col items-center my-2">
      <ChordSelector />
      <div className=" p-5 w-10/12">
          <form >
            <label className="text-fuchsia-400">Bars:
              <select onChange={(e) => handleBars(e)} className="text-fuchsia-950 rounded-lg ml-6 mb-2">
                <option>1</option>
                <option>2</option>
                <option>4</option>
                <option>16</option>
                <option>32</option>
              </select>
            </label>
          </form>
        <div className="flex ">
          <span className="text-white mr-2">Chords Sheet:  </span>

          <div className="flex justify-between w-full">
            {seq.map((el, i) => {
              return i < 4 || i >= 8 && i < 12 ?
                <div className="inline hover:opacity-100 hover:bg-fuchsia-500 opacity-80 rounded w-[60px] text-whit bg-fuchsia-600">{i + 1}
                </div>
                : <div className="inline hover:opacity-100 hover:bg-fuchsia-100 opacity-80 rounded w-[60px] text-whit bg-fuchsia-300">{i + 1}
                </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChordSeq;