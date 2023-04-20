import ChordSeq from "bring/components/machines/chords/ChordSeq";
import DrumMachine from "bring/components/machines/drums/DrumMachine";

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center my-5">
        <ChordSeq />
        <DrumMachine />
      </div>
    </div>
  )
}
