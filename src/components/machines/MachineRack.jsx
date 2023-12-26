import { useEffect, useRef, useState } from "react";
import * as Tone from 'tone';

import ChordSequencer from "./ChordSequencer/ChordSequencer";
import DrumsSequencer from "./DrumsSequencer/DrumsSequencer";
import DrumkitSelector from "./Master/DrumkitSelector";
import MasterControls from "./Master/MasterControls";
import PadSoundSelector from "./Master/PadSoundSelector";
import kits from '../../../libs/drumkits';

const containerStyle = "flex flex-col h-fit w-[450px] md:w-full p-2 rounded-b-lg justify-between mx-auto gap-5 "

// Constants · Mapped sampler key for every sample (drums)
const KEY = "C4";

/* 
  LOADS THE INITAL DATA FROM DB
  SETS ALL STATES
*/
const MachineRack = ({ sessionId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [padSequence, setPadSequence] = useState([]);
  const [drumsSequence, setDrumsSequence] = useState([]);
  const [drumkitName, setDrumkitName] = useState([]);
  const [padSoundName, setPadSoundName] = useState([]);

  // TODO load the initial data form the db and set sequences and drumkit and pad sound names.

  // Drums sampler
  const drumTracksRef = useRef([]);
  const drumTracksIds = [...Array(kits[0]?.sounds?.length).keys()];; // TODO:initialize it with the drumkit tracks amount. (16?)
  const sequenceRef = useRef(null);
  const stepsRef = useRef([[]]);
  const stepIds = [...Array(16).keys()]; // an array of integers from 0-15

  // EFFECTS ·········································································
  useEffect(() => {
    drumTracksRef.current = kits[0]?.sounds?.map((sample, i) => ({
      id: i,
      sampler: new Tone.Sampler({
        urls: { [KEY]: sample.url }
      }).toDestination()
    }))

    sequenceRef.current = new Tone.Sequence((time, step) => {
      drumTracksRef.current?.map(track => {
        if (stepsRef.current[track.id]?.[step]?.checked) {
          track.sampler?.triggerAttack(KEY, time)
        }

      })
    }, [...stepIds], "16n")

    if (isPlaying) sequenceRef.current.start(0);

    return () => {
      sequenceRef.current?.stop();
      sequenceRef.current?.dispose();
      Tone.Transport.stop();

      drumTracksRef.current?.forEach(track => {
        track.sampler.dispose();
      });
    };
  }, [isPlaying])

  // HANDLERS ···········································································
  const handlePlay = async () => {
    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop();
      setIsPlaying(false);
      // TODO enable bank selectors
    } else {
      console.log('paused')
      // sequenceRef.current.start(0);
      await Tone.start();
      setTimeout(() => {
        Tone.Transport.start();
      }, 300);
      setIsPlaying(true);
      // TODO disable bank selectors
    }
  }

  return (
    <div className={`${containerStyle}`}>
      <MasterControls handlePlay={handlePlay} isPlaying={isPlaying} >
        <div className="flex items-center justify-center gap-5">
          <PadSoundSelector padSound={padSoundName} setPadSound={setPadSoundName} />
          <DrumkitSelector drumkit={drumkitName} setDrumkit={setDrumkitName} />
        </div>
      </MasterControls>
      <ChordSequencer savedChords={padSequence} setChordProgression={setPadSequence} />
      <DrumsSequencer
        savedDrumsSequence={drumsSequence}
        trackIds={drumTracksIds}
        stepIds={stepIds}
        stepsRef={stepsRef}
        tracksRef={drumTracksRef}
        isPlaying={isPlaying}
      />
    </div>
  );
}

export default MachineRack;