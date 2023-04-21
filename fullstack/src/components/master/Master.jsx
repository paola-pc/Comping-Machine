import { set } from 'mongoose';
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { Howl } from "howler";

// // Mapped key for every sample
const KEY = "C2";

const kitEOE = {
  1: 'Kick',
  2: 'Rim Shot',
  3: 'Snare',
  4: 'Clap',
  5: 'Conga Low',
  6: 'Conga Mid',
  7: 'Conga high',
  8: 'Tom Low',
  9: 'Tom Mid',
  10: 'Tom High',
  11: 'Hihat Closed',
  12: 'Hihat Open',
  13: 'Cymbal',
  14: 'Maracas',
  15: 'Cow Bell',
  16: 'Claves'
}



// const kickArr = [1, 0, 0, 0,
//   1, 0, 0, 0,
//   1, 0, 0, 0,
//   1, 0, 0, 0]

var Master = ({ samples = [
  { url: '/audio/kit-acoustic/kick.mp3', name: 'Kick' },
  { url: '/audio/kit-acoustic/hihat-closed.mp3', name: 'Hihat Closed' },
  { url: '/audio/kit-acoustic/snare.mp3', name: 'Snare' }
] }, numOfSteps = 16) => {
  var [isPlaying, setIsPlaying] = useState(false);

  // References
  var tracksRef = useRef([]) // the sampler for each track
  var stepsRef = useRef([[]])
  var seqRef = useRef(null)
  var lightRef = useRef([]);
  // try {



  // const seqRef = useRef(null)
  // if (typeof AudioBuffer !== 'undefined')

  var trackIds = [...Array(samples.length).keys()];
  console.log(trackIds)
  var stepIds = [...Array(16).keys()];

  var handlePlay = async () => {
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
  var handleTempoChange = (e) => {
    console.log(e.target.value)
    Tone.Transport.bpm.value = Number(e.target.value);
  }

  var handleVolumeChange = (e) => {
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




  // } catch (error) {
  //   console.log('Oops... ', error);
  // } 

  return (
    <div>
      <div className="">
        <h1 className="text-fuchsia-500 text-xl">Master</h1>
        <div className=" ">

          {/* <div className='text-white'>
              {samples.map((sample) => (
                <div>{sample.name}</div>
              ))}
            </div> */}
          <div className=''>
            {stepIds.map((stepId) => (
              <label className="bg-white rounded">
                <input
                  type="radio"
                  name="lamp"
                  id={"lamp" + "-" + stepId}
                  disabled
                  ref={(elm) => {
                    if (!elm) return;
                    lightRef.current[stepId] = elm;
                  }}
                  className='bg-white'
                />

              </label>
            ))}
          </div>
          {/*  */}
          <div>
            <div className=''>
              {
                trackIds.map((trackId) => (
                  <div key={trackId} className='flex '>
                    {stepIds.map((stepId) => {
                      const id = trackId + "-" + stepId;
                      console.log(stepId)
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
                                console.log(elm)
                            }}
                            className=''
                          />
                          <div className='' />
                        </label>
                      );
                    })}
                  </div>
                ))}
            </div>

          </div>
          <button onClick={handlePlay}
            className="text-fuchsia-950 w-[60px] hover:opacity-100 opacity-70  rounded p-3 mx-5 bg-emerald-400">
            Play
          </button>
          <label className='text-fuchsia-500 text-xl' ><span>BPM </span>

            <input type='range' min={40} max={300} step={1} onChange={handleTempoChange} defaultValue={120} />
          </label>
          <label className='text-fuchsia-500 text-xl' ><span>LEVEL </span>
            <input type='range' min={0} max={1} step={0.01} onChange={handleVolumeChange} defaultValue={0.70} />
          </label>
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