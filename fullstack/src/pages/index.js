import ChordSeq from "bring/components/machines/chords/ChordSeq";
import DrumMachine from "bring/components/machines/drums/DrumMachine";

export default function Home() {
  return (
    <div className="lg:container">
      <div className="text-3xl text-sky-500 flex items-center justify-center">An instrument here</div>
      <ChordSeq />
      <DrumMachine />
      <div className="text-3xl text-sky-500 flex items-center justify-center">Another one here instrument here</div>
    </div>
  )
}
