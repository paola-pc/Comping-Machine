import { use, useEffect, useRef, useState } from "react";
import * as Tone from 'tone';
import { Chord, transpose } from "tonal";

import ChordSequencer from "./ChordSequencer/ChordSequencer";
import DrumsSequencer from "./DrumsSequencer/DrumsSequencer";
import MasterControls from "./Master/MasterControls";
import drumkits from '../../../libs/drumkits';
import padSoundBanks from '../../../libs/padSounds';
import SoundSelector from "../UI/machines/SoundSelector";
import SaveModal from "../modals/SaveModal";

const containerStyle = "flex flex-col h-fit w-[450px] md:w-full p-2 rounded-b-lg justify-between items-center mx-auto gap-5 "

// Constants · Mapped sampler key for every sample (drums)
const DRUM_SAMPLER_CHOSEN_KEY = "C4";

const MachineRack = ({
  savedPadSequence,
  savedDrumsSequence,
  savedDrumkitKey,
  savedPadSoundKey,
  loadingSession
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [padSequence, setPadSequence] = useState([]);
  const [bpm, setBpm] = useState(120)
  const [drumkitKey, setDrumkitKey] = useState(null);
  const [padSoundKey, setPadSoundKey] = useState(null);
  const [drumTracksPrevLevels, setDrumTracksPrevLevels] = useState([])
  const [padPrevLevel, setPadPrevLevel] = useState(-12)
  const [soloist, setSoloist] = useState(null);
  const [mutedTracks, setMutedTracks] = useState([]);
  const [padSeqChordVoices, setPadSeqChordVoices] = useState([]);
  const [totalStepsIds, setTotalStepsIds] = useState([...Array(32).keys()]); // 2 bars in 16ths as default value)

  // SETUP ································································································································
  const drumsSamplerRef = useRef([]);
  const padSamplerRef = useRef([]); // All drums channels
  const drumTracksIds = [...Array(16).keys()];
  const sequenceRef = useRef(null);
  const stepsRef = useRef([[]]);
  const drumStepIds = [...Array(16).keys()];


  // HANDLERS ···········································································
  const handlePlay = async () => {
    if (Tone.Transport.state === 'started') {
      setDrumTracksPrevLevels(drumsSamplerRef.current?.map((track) => track.prevVolume))
      setPadPrevLevel(padSamplerRef.current?.sampler.volume.value)
      Tone.Transport.stop();
      setIsPlaying(false);
    } else {
      await Tone.start();
      // await Tone.loaded(); 
      setTimeout(() => {
        Tone.Transport.start();
      }, 300);
      setIsPlaying(true);
    }
  }

  const handleTempoChange = (newBpm) => {
    Tone.Transport.bpm.value = newBpm;
    setBpm(newBpm)
  }

  const handleDrumsLevel = (value) => {
    const resolvedValue = value / 300;
    const dbValue = Tone.gainToDb(resolvedValue)
    drumsSamplerRef.current?.map((track) => {
      track.sampler.volume.value = dbValue;
    })
  }

  const handelPadLevel = (value) => {
    const resolvedValue = value / 300;
    const dbValue = Tone.gainToDb(resolvedValue)
    if (padSamplerRef.current) {
      padSamplerRef.current.sampler.volume.value = dbValue - 12;
    }

  }

  const handleDrumTrackLevel = (value, trackId) => {
    const id = trackId.split('-').pop();
    const resolvedValue = value / 300;

    const dbValue = Tone.gainToDb(resolvedValue < 0.106 ? 0 : resolvedValue)
    if (drumsSamplerRef.current?.[id]) {
      drumsSamplerRef.current[id].sampler.volume.value = dbValue;
      drumsSamplerRef.current[id].prevVolume = dbValue;
    }
  }

  const onSoloTrack = (e) => {
    const trackId = Number(e.target.id);
    const selectedTrack = drumsSamplerRef.current[trackId];

    if (!isPlaying && selectedTrack) {
      selectedTrack.sampler.triggerAttack(DRUM_SAMPLER_CHOSEN_KEY);
      return
    }

    if (selectedTrack) {
      setSoloist(trackId);
      drumsSamplerRef.current.forEach((track) => {
        if (track.id !== trackId) {
          if (track.sampler.volume.value > -63) {
            track.sampler.volume.value = -64;
          } else {
            track.sampler.volume.value = track.prevVolume;
            setSoloist(null)
          }
        }
      });
    }
  }

  const onMuteTrack = (e) => {
    const trackId = Number(e.target.id);
    const selectedTrack = drumsSamplerRef.current[trackId]
    const trackIsMuted = selectedTrack.sampler.volume.value < -63;

    if (trackIsMuted) {
      selectedTrack.sampler.volume.value = selectedTrack.prevVolume;
      setMutedTracks((current) => current.filter((mutedIds) => mutedIds !== trackId));
    } else {
      selectedTrack.sampler.volume.value = -64;
      setMutedTracks([...mutedTracks, trackId])
    }
  }

  const getChordVoices = (rootWithOctave, type) => {
    const chordTypeIntervals = Chord.get(type).intervals;
    const chordVoices = chordTypeIntervals.map(interval => transpose(rootWithOctave, interval));
    return chordVoices;
  }

  // INIT & EFFECTS ·········································································
  useEffect(() => {
    setDrumkitKey(savedDrumkitKey || 'eoeKit');
    setPadSoundKey(savedPadSoundKey || 'dream')
  }, [savedDrumkitKey, savedPadSoundKey])

  useEffect(() => {
    if (savedPadSequence?.length) {
      setPadSequence([...savedPadSequence])
    }
  }, [savedPadSequence])

  useEffect(() => {
    if (padSequence?.length) {
      setPadSeqChordVoices(padSequence.map((arrayChord) => {
        if (arrayChord?.length) return getChordVoices(...arrayChord);
        return null;
      }))
      setTotalStepsIds([...new Array(padSequence.length).keys()]);
    }
  }, [padSequence])


  useEffect(() => {
    // SAMPLERS
    drumsSamplerRef.current = drumkits[drumkitKey]?.sounds?.map((sample, i) => ({
      id: i,
      prevVolume: drumTracksPrevLevels.length ? drumTracksPrevLevels[i] : 0,
      sampler: new Tone.Sampler({
        urls: { [DRUM_SAMPLER_CHOSEN_KEY]: sample.url }
      }).toDestination()
    }))
    drumsSamplerRef.current?.map((track) => {
      track.sampler.volume.value = track.prevVolume;
      if (mutedTracks.includes(track.id)) {
        track.sampler.volume.value = -64
      }
    })

    padSamplerRef.current = {
      sampler: new Tone.Sampler({
        urls: {
          ...padSoundBanks[padSoundKey]?.sounds
        }
      }).toDestination()
    }
    padSamplerRef.current.sampler.volume.value = padPrevLevel;

    // SEQUENCE
    sequenceRef.current = new Tone.Sequence((time, step) => {
      drumsSamplerRef.current?.map(track => {
        let loopedDrums = [];
        if (stepsRef.current.length !== padSequence.length) {
          const multiplier = padSequence.length / 16;
          for (let i = 0; i < multiplier; i++) {
            loopedDrums = loopedDrums.concat(stepsRef.current[track.id]);
          }
          if (loopedDrums[step]?.checked) {
            track.sampler?.triggerAttack(DRUM_SAMPLER_CHOSEN_KEY, time);
          }
        } else if (stepsRef.current[track.id]?.[step]?.checked) {
          track.sampler?.triggerAttack(DRUM_SAMPLER_CHOSEN_KEY, time);
        }
        if (padSequence[step]) {
          padSamplerRef.current?.sampler?.triggerAttack(padSeqChordVoices[step], time);
        }
      });
    }, [...totalStepsIds], "16n");


    if (isPlaying) {
      sequenceRef.current.start(0);
    }

    return () => {
      sequenceRef.current?.stop();
      sequenceRef.current?.dispose();
      Tone.Transport.stop();

      drumsSamplerRef.current?.forEach(track => {
        track.sampler.disconnect();
        track.sampler.dispose();
      });
    };
  }, [isPlaying, padSequence, drumkitKey, padSoundKey])



  return (
    <>
      <SaveModal drumkit={drumkitKey} drumStepsRef={stepsRef.current} padSequence={padSequence} padSound={padSoundKey} bpm={bpm}></SaveModal>
      <div className={`${containerStyle}`}>
        <MasterControls
          handlePlay={handlePlay}
          isPlaying={isPlaying}
          handleTempoChange={handleTempoChange}
          bpm={bpm}
          handleDrumsLevel={handleDrumsLevel}
          handelPadLevel={handelPadLevel}
        >
          <div className="flex justify-center items-center gap-6">
            <SoundSelector
              disabled={isPlaying || isLoading}
              defaultValue={drumkitKey}
              label='DRUMKIT'
              optionLabels={Object.keys(drumkits)?.map((key) => drumkits[key].name)}
              optionValues={Object.keys(drumkits)}
              onSelect={(value) => setDrumkitKey(value)}
            />
            <SoundSelector
              disabled={isPlaying || isLoading}
              defaultValue={padSoundKey}
              label='PAD SOUND'
              optionLabels={Object.keys(padSoundBanks)?.map((key) => padSoundBanks[key].name)}
              optionValues={Object.keys(padSoundBanks)}
              onSelect={(value) => setPadSoundKey(value)}
            />
          </div>
        </MasterControls>
        <ChordSequencer savedChords={padSequence} setChordProgression={setPadSequence} isPlaying={isPlaying} />
        <DrumsSequencer
          savedDrumsSequence={savedDrumsSequence}
          trackNames={drumkits[drumkitKey]?.sounds?.map((sound) => sound.name)}
          trackIds={drumTracksIds}
          stepIds={drumStepIds}
          stepsRef={stepsRef}
          tracksRef={drumsSamplerRef}
          isPlaying={isPlaying}
          handleDrumTrackLevel={handleDrumTrackLevel}
          soloist={soloist}
          mutedTracks={mutedTracks}
          onMuteTrack={onMuteTrack}
          onSoloTrack={onSoloTrack}
          isLoading={isLoading}
        />
      </div>
    </>);
}

export default MachineRack;