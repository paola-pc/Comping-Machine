import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

//Mapped key for every sample
const KEY = "C4";

const Master = ({ samples, numOfSteps = 16 }) => {
  const [isPlaying, setIsPlaying] = useState(false);


  // References
  const tracksRef = useRef([]) // the sampler for each track
  const stepsRef = useRef([[]])
  const seqRef = useRef(null)
  const lightRef = useRef([]);
  const isMuted = useState([])


  // if (typeof AudioBuffer !== 'undefined') // Use this if things go wrong with the buffer

  const trackIds = [...Array(samples.length).keys()];
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
  }

  const handleVolumeChange = (e) => {
    // console.log(e.target.value)
    Tone.Destination.volume.value = Tone.gainToDb(Number(e.target.value))
  }

  useEffect(() => {
    // For every sample create an id(number), sample the sound to an individual sampler using the same KEY for every sound.
    // and connect it to the output. Then save all those thos samplers to the tracksRef array
    tracksRef.current = samples.map((sample, i) => ({
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
    // console.log('stepsRef: ', stepsRef)
    return () => {
      seqRef.current?.dispose();
      tracksRef.current.map(tr => tr.sampler.dispose());
    }
  }, [samples, numOfSteps]) // It dependes on soundBank and subdivision changes of course

  const muteTrack = (e) => {
    // If is muted...
    if (tracksRef.current[e.target.id].sampler.volume.value < 0) {
      tracksRef.current[e.target.id].sampler.volume.value = 0;
      e.target.classList.remove('ring-rose-400');
      e.target.classList.remove('shadow-rose-500/50');
      e.target.classList.remove('hover:bg-rose-300');
      e.target.classList.add('ring-emerald-400');
      e.target.classList.add('shadow-emerald-500/50');
      e.target.classList.add('hover:bg-emerald-300');
    } else {
      tracksRef.current[e.target.id].sampler.volume.value = -64;
      e.target.classList.add('ring-rose-400');
      e.target.classList.add('shadow-rose-500/50');
      e.target.classList.add('hover:bg-rose-300');
    }
  }

  const playSample = (e) => {
    tracksRef.current[e.target.id].sampler.triggerAttack(KEY)
  }

  return (
    <div>
      <div className="relative w-full flex flex-col ">
        <h1 className="text-fuchsia-500 text-xl">Master Sequencer</h1>
        <div className='mt-8'>

          <button onClick={handlePlay}
            className={`w-[60px] hover:opacity-100 opacity-70  rounded p-3 mx-5 
                      ${isPlaying ? 'bg-rose-800 hover:text-rose-100' : 'bg-emerald-400 hover:text-emerald-100 '}
                      ${isPlaying ? 'shadow-lg shadow-rose-900 opacity-100 hover:opacity-80' : 'hover:shadow-lg hover:shadow-emerald-500/50 '}
                      ${isPlaying ? 'text-white ' : 'shadow-md shadow-emerald-500/50 '}
                      
                      `}>
            {isPlaying ? 'Stop' : 'Play'}
          </button>
          <label className='text-fuchsia-500 text-xl' ><span>BPM: </span>

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
                        w-[80px] ring ring-1  p-1 mx-3 rounded shadow-lg ring-emerald-400 shadow-emerald-500/50 hover:bg-emerald-300 hover:text-white"
                    >{samples[trackId].name}
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

/*
const Master = ({ samples = [
  { url: '/fullstack/public/sounds/tr-808-Kit.mp3', name: 'K1' },
  { url: '/fullstack/public/sounds/tr-Ac-Kit.mp3', name: 'K2' }
],
  subdivision = 16 }) => {
  if (typeof AudioBuffer !== 'undefined') {
    const [isPlaying, setIsPlaying] = useState(false);
    // References
    const tracksRef = useRef([]) // the sampler for each track
    const stepsRef = useRef([[]])
    const seqRef = useRef(null)
    const lightRef = useRef([]);

    const tracks = [...Array(samples.length).keys()];
    const steps = [...Array(subdivision).keys()]

    const handlePlay = async () => {
      if (Tone.Transport.state === 'started') {
        Tone.Transport.pause();
        setIsPlaying(false);
      } else {
        await Tone.start();
        Tone.Transport.start();
        setIsPlaying(true);
      }
    }

    // tempo can be altered without problem... ?
    const handlTempoChange = (e) => {
      console.log(e.target.value)
      Tone.Transport.bpm.value = Number(e.target.value);
    }

    const handleVolumeChange = (e) => {
      console.log(e.target.value)
      Tone.Destination.volume.value = Tone.gainToDb(Number(e.target.value))
    }

    useEffect(() => {
      // For every sample create an id(number), sample the sound to an individual sampler using the same KEY for every sound.
      // and connect it to the output. Then save all those thos samplers to the tracksRef array
      tracksRef.current = samples.map((sample, i) => ({
        id: i,
        sampler: new Tone.Sampler({
          urls: {
            [KEY]: sample.url,
          }
        }).toDestination()
      }));

      //  given a time, for every track checs if the sequence Referens coincides with the
      // steps reference and if it does it plays it
      // This function creates the actual sequence of each track(inside tracksRef)
      seqRef.current = new Tone.Sequence((time, step) => {
        tracksRef.current.map(tr => {
          if (stepsRef.current[tr.id]?.[step]?.checked) {
            tr.sampler.triggerAttack(KEY, time);
            console.log('played?')
          }
          lightRef.current[step].checked = true;
        });
      },
        [...steps],
        "16n"
      );
      // // Start the sequencer
      seqRef.current.start(0);

      return () => {
        seqRef.current?.dispose();
        tracksRef.current.map(tr => tr.sampler.dispose());
      }
    }, [samples, subdivision]) // It dependes on soundBank and subdivision changes of course
*/