import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { useSession } from 'next-auth/react';
import SaveModal from "../../modals/SaveModal";
import useSaveModal from '../../../../Hooks/useSaveModal';
import { Howl } from 'howler';
import { Chord, transpose, note } from 'tonal';
import useLoginModal from '../../../../Hooks/useLoginModal';
import LoginModal from 'bring/components/modals/LoginModal';



//Drumm machine, Mapped key for every sample:
const KEY = "C4";

const Master = ({ samples, chordProg, padSound, numOfSteps = 16, drumTracks, setPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  let [showBPM, setShowBPM] = useState(120);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const saveModal = useSaveModal();
  const loginModal = useLoginModal();
  const session = useSession();

  // References
  const tracksRef = useRef([]) // the sampler for each sound
  const stepsRef = useRef([[]])
  const seqRef = useRef(null)
  const lightRef = useRef([]);
  const isMuted = useState([])

  useEffect(() => {
    if (session.data) {
      localStorage.setItem('user', JSON.stringify(session.data))
    } else if (localStorage.getItem('user')) {
      session.data = JSON.parse(localStorage.getItem('user'))
    }
  }, [session]) // If things are not working remove session

  // For the drums:
  const trackIds = [...Array(samples?.sounds?.length).keys()];
  const stepIds = [...Array(16).keys()];

  // For the chords, count and building process for each chord. Chords are played using Tone.js and Howl libraries
  let count = -1; //16ths count, used to play the chords. 
  let nextChordRoot;
  let nextChord;

  // if (typeof AudioBuffer !== 'undefined') // Use this if things go wrong with the buffer

  const handlePlay = async () => {
    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop();

      setIsPlaying(false);
      setPlaying(false); //to enable bank selectors
      count = -1;
    } else {
      await Tone.start();
      setTimeout(() => {
        Tone.Transport.start();
      }, 300);
      setIsPlaying(true);
      setPlaying(true); //to disable bank selectors
    }
  }

  const handleTempoChange = (e) => {
    Tone.Transport.bpm.value = Number(e.target.value);
    setShowBPM(Math.floor(Number(e.target.value)))
  }

  const handleVolumeChange = (e) => {
    Tone.Destination.volume.value = Tone.gainToDb(Number(e.target.value))
  }

  const handlePadLevel = (e) => {
    // chordSounds.volume(parseFloat(e.target.value));
    Howler.volume(parseFloat(e.target.value))
  }


  useEffect(() => {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    } else {
      localStorage.removeItem("session");
    }

    let chordSounds = new Howl({
      src: [padSound.url],
      onload() {
        console.log('Holwer audio loaded')
        howlerSampler.getSamples();
        setLoadingAudio(false)
      },
      onloaderror() {
        console.log('Error loading Howler audio: ')
        setLoadingAudio(true)
      }
    })

    const howlerSampler = {
      getSamples() {
        const noteLength = 2400; //The audio is made so that each note lasts 2400ms, all future recordings should follow this condition
        let timeMark = 0;
        // Map each note to its corresponding MIDI key starting from C1(24) and finishing with C7(96)
        for (let i = 24; i <= 96; i++) {
          chordSounds['_sprite'][i] = [timeMark, noteLength];
          timeMark += noteLength;
        }
      },
      playChord() {
        const midiNotes = [];
        nextChord.intervals
          .map(interval => transpose(nextChordRoot, interval))
          .forEach(chordNote => {
            midiNotes.push(note(chordNote).midi)
          })
        midiNotes.forEach(midiNote => chordSounds.play(midiNote.toString()))
      }
    }

    // each drum voice has its own sampler, all samplers (sounds) are stored in the tracksRef.
    tracksRef.current = samples?.sounds?.map((sample, i) => ({
      id: i,
      sampler: new Tone.Sampler({
        urls: {
          [KEY]: sample.url,
        }
      }).toDestination()
    }));

    // This function creates the sequence of each drum track and the chords sequence
    seqRef.current = new Tone.Sequence((time, step) => {
      tracksRef.current?.map(tr => {
        if (stepsRef.current[tr.id]?.[step]?.checked) {
          tr.sampler.triggerAttack(KEY, time);
        }
        lightRef.current[step].checked = true;
      });

      //Chords Sequence configuration:
      count === chordProg.length - 1 ? count = 0 : count++;
      if (chordProg[count]) {
        nextChordRoot = chordProg[count][0]
        nextChord = Chord.get(chordProg[count][1]);
        howlerSampler.playChord();
      }
    },
      [...stepIds],
      "16n"
    );

    // chordSounds.volume(parseFloat(document.querySelector('#pad-level')?.value));
    isMuted.current = Array(16).fill(false);

    // Start the sequencer
    seqRef.current.start(0);

    return () => {
      seqRef.current?.dispose();
      tracksRef.current?.map(tr => tr.sampler.dispose());
    }
  }, [samples?.sounds, numOfSteps, isPlaying, chordProg, session, padSound.url])

  const muteTrack = (e) => {
    // If is muted...
    if (tracksRef.current[e.target.id].sampler.volume.value < 0) {
      tracksRef.current[e.target.id].sampler.volume.value = 0;
      e.target.classList.remove('ring-rose-400');
      e.target.classList.remove('shadow-rose-500/50');
      e.target.classList.remove('hover:bg-rose-300');
      e.target.classList.remove('text-rose-300');
      e.target.classList.add('ring-emerald-400');
      e.target.classList.add('shadow-emerald-500/50');
      e.target.classList.add('hover:bg-emerald-300');
      e.target.classList.add('text-emerald-100');
    } else {
      tracksRef.current[e.target.id].sampler.volume.value = -64;
      e.target.classList.add('ring-rose-400');
      e.target.classList.add('shadow-rose-500/50');
      e.target.classList.add('text-rose-300');
      e.target.classList.add('hover:bg-rose-300');
    }
  }

  const playSample = (e) => {
    tracksRef.current[e.target.id].sampler.triggerAttack(KEY)
  }

  const saveSession = () => {
    saveModal.onOpen();
  }

  return (
    <div>
      <SaveModal soundbankName={samples?.name} stepsRef={stepsRef.current} prog={chordProg} padSound={padSound.url} ></SaveModal>
      <LoginModal/>
      <div className="relative w-full flex flex-col ">
        <div className='flex items-center'>
          <h1 className="text-fuchsia-500 text-xl">Master Sequencer</h1>
          {session?.data?.user?.email ?
            <button onClick={() => saveSession()}
              className='text-sky-700 hover:text-sky-500 ml-5 hover:underline decoration-sky-500/[.80]'>Save Session</button>
            : <span onClick={loginModal.onOpen} className='text-sky-700 hover:text-sky-500 ml-5 hover:underline decoration-sky-500/[.80] cursor-pointer'>Log-in to save future Sessions!</span>
          }
        </div>
        <div className={` z-10
        mt-2 mr-5 flex justify-around sticky -top-1 rounded rounded-xl bg-black p-3 border  border-1 transition-all duration-500 ease-in-out
        ${isPlaying && 'shadow shadow-emerald-800 shadow-lg'}
        ${loadingAudio ? 'border-black' : 'border-fuchsia-900'}
      `}
        >
          <button onClick={handlePlay} data-message="Please, first select the soundbanks you want to use for your session."
            className={`w-[60px]  rounded p-3 mx-5  ring transition-all duration-100 ease-in-out
                      ${isPlaying ? 'translate-y-0.5' : '-translate-y-0.5'}
                      ${isPlaying ? 'bg-rose-800 opacity-100 text-rose-100' : 'bg-emerald-950 opacity-90 text-emerald-100'}
                      ${isPlaying && 'shadow-rose-600 shadow-lg'}
                      ${!loadingAudio && 'shadow-emerald-600 shadow-lg'}
                      ${!isPlaying && !loadingAudio && 'hover:text-emerald-100 hover:shadow-xl hover:shadow-emerald-500 hover:opacity-100 hover:bg-emerald-400'}
                      ${isPlaying ? 'ring-1 ring-rose-200' : 'ring-1 ring-emerald-100'}
                      ${loadingAudio ? 'ring-1 ring-gray-200 tooltip' : 'ring-1 ring-emerald-100'}
                      ${loadingAudio ? 'bg-gray-400 text-gray-700 opacity-50' : 'bg-emerald-950 opacity-90 text-emerald-100'}
                      ${loadingAudio && !isPlaying ? ' hover:bg-gray-400 hover:shadow-black hover:text-gray-700 ' : 'shadow-emerald-600 shadow-lg'}
                      `}
            disabled={loadingAudio}
          >
            {isPlaying ? 'Stop' : 'Play'}
          </button>
          <label className='relative text-sky-500 text-lg' >
            BPM: {showBPM}
            <input className='w-[200px] block bg-fuchsia-700 text-sky-500 appearance-none rounded-xl h-2 mt-1'
              type='range' min={40} max={300} step={0.01} onChange={(e) => handleTempoChange(e)} defaultValue={120} />
          </label>
          <label className='relative text-sky-500 text-lg' >
            DRUMS LEVEL:
            <input className='w-[200px] block bg-fuchsia-700 text-sky-500 appearance-none rounded-xl h-2 mt-1'
              type='range' min={0} max={1} step={0.01} onChange={(e) => handleVolumeChange(e)} defaultValue={0.70} />
          </label>
          <label className='relative text-sky-500 text-lg'>
            PAD LEVEL:
            <input id="pad-level" className='w-[200px] block bg-fuchsia-700 text-sky-500 appearance-none rounded-xl h-2 mt-1'
              type='range' min={0} max={1} step={0.01} onChange={(e) => handlePadLevel(e)} defaultValue={0.70} />
          </label>
        </div>

        <div className='flex justify-around mr-10 lg:mr-30 md:mr-20'>
          <div>
            <div className='my-5'>
              {
                trackIds.map((trackId, i) => (

                  <div key={trackId} className='flex my-2 items-center'>
                    <button
                      id={trackId}
                      onClick={(e) => { muteTrack(e), { passive: true } }}
                      className="text-emerald-100 text-xs flex flex-col justify-center items-center
                        w-[90px] ring ring-1  p-1 mx-3 rounded shadow-lg ring-emerald-400 shadow-emerald-500/50 
                        hover:bg-emerald-300 hover:text-white"
                    >{(samples?.sounds && samples?.sounds.length) ?
                      samples?.sounds[trackId].name
                      :
                      'L O A D I N G'
                      }

                    </button>
                    <button id={trackId} onClick={(e) => playSample(e)}
                      className='w-fit mr-3 text-xs ring-1 ring-sky-500 text-sky-400 p-1  rounded
                                shadow-md shadow-sky-900 hover:bg-sky-700 hover:shadow-sky-700 hover:shadow-lg hover:text-white'
                    >►</button>
                    {drumTracks && drumTracks.length ?
                      stepIds.map((stepId) => {
                        const id = trackId + "-" + stepId;
                        return (
                          <label key={"label-" + trackId + "-" + stepId} className='inline relative'>
                            <input
                              key={id}
                              id={id}
                              type="checkbox"
                              ref={(elm) => {
                                if (!elm) return;
                                if (!stepsRef.current[trackId]) {
                                  stepsRef.current[trackId] = [];
                                }
                                stepsRef.current[trackId][stepId] = elm;
                              }}
                              defaultChecked={drumTracks[i][stepId] ? true : false}
                              className='h-7 w-10 hover:cursor-pointer
                                bg-fuchsia-200 rounded border-fuchsia-400 text-fuchsia-500 checked:ring-fuchsia-900 opacity:70 checked:opacity-100 shadow shadow-md
                                hover:bg-fuchsia-300 checked:shadow-fuchsia-200 checked:shadow-fuchsia-800 checked:shadow-xl focus:border-1 shadow-fuchsia-800  '
                            />
                            <span className='absolute left-1 text-fuchsia-700 tracking-tighter text-xs opacity-50 absolute left-1'>{stepId + 1}</span>
                          </label>
                        );
                      })
                      :
                      stepIds.map((stepId) => {
                        const id = trackId + "-" + stepId;
                        return (
                          <label key={"label-" + trackId + "-" + stepId} className='inline relative'>
                            <input
                              key={id}
                              id={id}
                              type="checkbox"
                              ref={(elm) => {
                                if (!elm) return;
                                if (!stepsRef.current[trackId]) {
                                  stepsRef.current[trackId] = [];
                                }
                                stepsRef.current[trackId][stepId] = elm;
                              }}
                              className='h-7 w-10 hover:cursor-pointer
                                bg-fuchsia-200 rounded border-fuchsia-400 text-fuchsia-500 checked:ring-fuchsia-900 opacity:70 checked:opacity-100 shadow shadow-md
                                hover:bg-fuchsia-300 checked:shadow-fuchsia-200 checked:shadow-fuchsia-800 checked:shadow-xl focus:border-1 shadow-fuchsia-800  '
                            />
                            <span className='absolute left-1 text-fuchsia-700 tracking-tighter text-xs opacity-50'>{stepId + 1}</span>
                          </label>
                        );
                      })
                    }
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* lights */}
        <div className='absolute right-7 top-0 invisible lg:visible md:visible '>
          {stepIds.map((stepId) => (
            <label key={'light-' + stepId}>
              <input
                type="radio"
                name="lamp"
                id={"lamp" + "-" + stepId}
                disabled
                ref={(elm) => {
                  if (!elm) return;
                  lightRef.current[stepId] = elm;
                }}
                className=' checked:opacity-100 focus:emerald-100 opacity-20 '
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );

}

export default Master;
