import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { useSession } from 'next-auth/react';
import SaveModal from "../../modals/SaveModal";
import useSaveModal from '../../../../Hooks/useSaveModal';
//Mapped key for every sample
const KEY = "C4";

const Master = ({ samples, numOfSteps = 16 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const saveModal = useSaveModal();
  let [showBPM, setShowBPM] = useState(120)
  const { data: session } = useSession();

  // References
  const tracksRef = useRef([]) // the sampler for each track
  const stepsRef = useRef([[]])
  const seqRef = useRef(null)
  const lightRef = useRef([]);
  const isMuted = useState([])


  // if (typeof AudioBuffer !== 'undefined') // Use this if things go wrong with the buffer

  const trackIds = [...Array(samples.sounds.length).keys()];
  const stepIds = [...Array(16).keys()];

  const handlePlay = async () => {
    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop();
      setIsPlaying(false);

    } else {
      await Tone.start();
      // Give it a bit of time so that the first sound plays
      setTimeout(() => {
        Tone.Transport.start();
      }, 200)
      setIsPlaying(true);
    }
  }


  const handleTempoChange = (e) => {
    // console.log(e.target.value)
    Tone.Transport.bpm.value = Number(e.target.value);
    setShowBPM(Math.floor(Number(e.target.value)))
  }

  const handleVolumeChange = (e) => {
    // console.log(e.target.value)
    Tone.Destination.volume.value = Tone.gainToDb(Number(e.target.value))
  }

  useEffect(() => {
    // For every sample create an id(number), sample the sound to an individual sampler using the same KEY for every sound.
    // and connect it to the output. Then save all those thos samplers to the tracksRef array
    tracksRef.current = samples.sounds.map((sample, i) => ({
      id: i,
      sampler: new Tone.Sampler({
        urls: {
          [KEY]: sample.url,
        }
      }).toDestination()
    }));

    // This function creates the actual sequence of each track(inside tracksRef)
    seqRef.current = new Tone.Sequence((time, step) => {
      tracksRef.current.map(tr => {
        if (stepsRef.current[tr.id]?.[step]?.checked) {
          tr.sampler.triggerAttack(KEY, time);
        }
        // console.log('tracksRef = ', tracksRef.current)
        lightRef.current[step].checked = true;
      });
    },
      [...stepIds],
      "16n"
    );

    isMuted.current = Array(16).fill(false);
    // Start the sequencer
    seqRef.current.start(0);
    console.log('stepsRef: ', stepsRef)
    return () => {
      seqRef.current?.dispose();
      tracksRef.current.map(tr => tr.sampler.dispose());
    }
  }, [samples.sounds, numOfSteps]) // It dependes on soundBank and subdivision changes of course

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
    console.log(typeof stepsRef.current[0], stepsRef.current[0]) //Each element of this array contains the track-stepId info 
    // console.log(samples.sounds[0].url.match(/^\/[a-z]+\/([\w\d-]+)/)) // What I really need is the samples 😅 But it was fun
    console.log(samples.name);
    saveModal.onOpen();

  }

  return (
    <div>
      <SaveModal soundbankName={samples.name} stepsRef={stepsRef.current} ></SaveModal>
      <div className="relative w-full flex flex-col ">
        <div className='flex items-center'>
          <h1 className="text-fuchsia-500 text-xl">Master Sequencer</h1>
          { session ?
            <button onClick={() => saveSession()}
              className='text-sky-700 hover:text-sky-500 ml-5 hover:underline decoration-sky-500/[.80]'>🖭 Save Session</button>
            : <a href='/login' className='text-sky-700 hover:text-sky-500 ml-5 hover:underline decoration-sky-500/[.80]'>🖭 Do you want to save this Session? Log in!</a>
          }
        </div>
        <div className='mt-8'>

          <button onClick={handlePlay}
            className={`w-[60px]  rounded p-3 mx-5  ring shadow 
                      ${isPlaying ? 'translate-y-0.5' : '-translate-y-0.5'}
                      ${isPlaying ? 'bg-rose-800 opacity-100 text-rose-100' : 'bg-emerald-950 opacity-90 text-emerald-100'}
                      ${isPlaying ? 'shadow-rose-600 shadow-xl' : 'shadow-emerald-600 shadow-lg'}
                      ${!isPlaying && 'hover:text-emerald-100 hover:shadow-xl hover:shadow-emerald-500 hover:opacity-100 hover:bg-emerald-400'}
                      ${isPlaying ? 'ring-1 ring-rose-200' : 'ring-1 ring-emerald-100'}
                      
                      
                      `}>
            {isPlaying ? 'Stop' : 'Play'}
          </button>
          <label className='text-fuchsia-500 text-xl' ><div className='min-w-[600px] inline '>BPM: {showBPM} </div>

            <input className='w-[250px]'
              type='range' min={40} max={300} step={0.1} onChange={handleTempoChange} defaultValue={120} />
          </label>
          <label className='text-fuchsia-500 text-xl' ><span>LEVEL </span>
            <input className='w-[250px]'
              type='range' min={0} max={1} step={0.01} onChange={handleVolumeChange} defaultValue={0.70} />
          </label>
        </div>

        <div className='flex justify-around'>
          <div>
            <div className='my-5'>
              {
                trackIds.map((trackId) => (

                  <div key={trackId} className='flex my-2 items-center'>
                    <label
                      id={trackId}
                      onClick={(e) => { muteTrack(e), { passive: true } }} // passive true... Very nice feature!
                      className="text-emerald-100 text-sm flex flex-col justify-center items-center
                        w-[100px] ring ring-1  p-1 mx-3 rounded shadow-lg ring-emerald-400 shadow-emerald-500/50 hover:bg-emerald-300 hover:text-white"
                    >{samples.sounds[trackId].name}
                    </label>
                    <button id={trackId} onClick={(e) => playSample(e)}
                      className='w-fit mr-3 text-md ring-1 ring-sky-500 text-sky-400 p-1  rounded
                                shadow-md shadow-sky-900 hover:bg-sky-700 hover:shadow-sky-700 hover:shadow-lg hover:text-white'
                    >►</button>
                    {stepIds.map((stepId) => {
                      const id = trackId + "-" + stepId;
                      return (
                        <label className='inline'>
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
                              // console.log(elm)
                            }}
                            className='h-10 w-10
                                bg-fuchsia-200 rounded border-fuchsia-400 text-fuchsia-500 checked:ring-fuchsia-900 opacity:70 checked:opacity-100 shadow shadow-md
                                hover:bg-fuchsia-300 checked:shadow-fuchsia-200 checked:shadow-fuchsia-800 checked:shadow-xl focus:border-1 shadow-fuchsia-800  '
                          />
                          <div className='' />
                        </label>
                      );
                    })}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* lights */}
        <div className='absolute right-7 top-0 invisible lg:visible md:visible '>
          {stepIds.map((stepId) => (
            <label className="">
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