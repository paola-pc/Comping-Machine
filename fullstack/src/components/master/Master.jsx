import { set } from 'mongoose';
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { Howl } from "howler";





// {
//   samples = [
//     { url: '/audio/kit-acoustic/kick.mp3', name: 'Kick' },
//     { url: '/audio/kit-acoustic/hihat-closed.mp3', name: 'Hihat Closed' },
//     { url: '/audio/kit-acoustic/snare.mp3', name: 'Snare' }
//   ]
// }


//Mapped key for every sample
const KEY = "C4";

const Master = ({samples, numOfSteps = 16}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  
  // References
  const tracksRef = useRef([]) // the sampler for each track
  const stepsRef = useRef([[]])
  const seqRef = useRef(null)
  const lightRef = useRef([]);


  // if (typeof AudioBuffer !== 'undefined') // Use this if things go wrong with the buffer

  const trackIds = [...Array(samples.length).keys()];
  console.log(trackIds)
  console.log(trackIds)
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

  // tempo can be altered without problem!
  const handleTempoChange = (e) => {
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
    // steps checked they get scheduled
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
      [...stepIds],
      "16n"
    );
    // Start the sequencer
    seqRef.current.start(0);

    return () => {
      seqRef.current?.dispose();
      tracksRef.current.map(tr => tr.sampler.dispose());
    }
  }, [samples, numOfSteps]) // It dependes on soundBank and subdivision changes of course

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
                  
                  <div key={trackId} className='flex my-2'>
                    <div 
                      className='text-white text-base/3 flex items-center
                                    w-[70px] ring ring-1 ring-emerald-400 p-1 mx-3 rounded 
                                    shadow-lg shadow-emerald-500/50 '
                    >{ samples[trackId].name}</div>
                    {stepIds.map((stepId) => {
                      const id = trackId + "-" + stepId;
                      {/* console.log(stepId) */ }
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