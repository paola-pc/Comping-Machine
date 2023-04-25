import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { useSession } from 'next-auth/react';
import SaveModal from "../../modals/SaveModal";
import useSaveModal from '../../../../Hooks/useSaveModal';
import { Howl } from 'howler';
import { Chord, transpose, note } from 'tonal';

//Drumm machine, Mapped key for every sample:
const KEY = "C4";

const SessionMaster = ({ samples, chordProg, padSound, numOfSteps = 16, loadedStepsRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className='text-fucshia-100'>
      <h1>This is the Session Master</h1>
    </div>
  )
  // // const saveModal = useSaveModal(); 
  // let [showBPM, setShowBPM] = useState(120)
  // const { data: session } = useSession();
  
  // // References
  // const tracksRef = useRef([]) // the sampler for each track
  // const stepsRef = useRef([[]])
  // const seqRef = useRef(null)
  // const lightRef = useRef([]);
  // const isMuted = useState([])

  // // For the drums:
  // const trackIds = [...Array(samples.sounds?.length).keys()];
  // const stepIds = [...Array(16).keys()];

  // // Chords are played using Tone.js and Howl libraries
  // let count = -1; //16ths count, used to play the chords.
  // let nextChordRoot;
  // let nextChord;

  // let chordSounds = new Howl({
  //   src: [padSound.url], // This will be dynamic also
  //   onload() {
  //     console.log('Holwer audio loaded')
  //     howlerSampler.getSamples();
  //   },
  //   onloaderror() {
  //     console.log('Error loading Howler audio')
  //   }
  // })
  // const howlerSampler = {
  //   getSamples() {
  //     const noteLength = 2400; //The audio is made so that each note lasts 2400ms
  //     let timeMark = 0;
  //     // Map each note to its corresponding MIDI key starting from C1(24) and finishing with C7(96)
  //     for (let i = 24; i <= 96; i++) {
  //       chordSounds['_sprite'][i] = [timeMark, noteLength];
  //       timeMark += noteLength;
  //     }
  //   },
  //   playChord() {
  //     const midiNotes = [];
  //     nextChord.intervals
  //       .map(interval => transpose(nextChordRoot, interval))
  //       .forEach(chordNote => {
  //         midiNotes.push(note(chordNote).midi)
  //       })
  //     console.log(midiNotes)
  //     midiNotes.forEach(n => chordSounds.play(n.toString()))
  //   }
  // }
  
  // // if (typeof AudioBuffer !== 'undefined') // Use this if things go wrong with the buffer

  // const handlePlay = async () => {
  //   if (Tone.Transport.state === 'started') {
  //     // if (count ===  0) // I would love to find a way to do this, wait for the first beat and stop right before
  //       Tone.Transport.stop();
  //       setIsPlaying(false);
  //       count = -1;
      
  //   } else {
  //     await Tone.start();
  //     // Give it a bit of time so that the first sound plays
  //     setTimeout(() => {
  //       Tone.Transport.start();
  //     }, 200)
  //     setIsPlaying(true);
  //   }
  // }

  // const handleTempoChange = (e) => {
  //   // console.log(e.target.value)
  //   Tone.Transport.bpm.value = Number(e.target.value);
  //   setShowBPM(Math.floor(Number(e.target.value)))
  // }

  // const handleVolumeChange = (e) => {
  //   // console.log(e.target.value)
  //   Tone.Destination.volume.value = Tone.gainToDb(Number(e.target.value))
  // }

  // useEffect(() => {
  //   // For every sample create an id(number), sample the sound to an individual sampler using the same KEY for every sound
  //   // and connect it to the output. Then save all those samplers to the tracksRef array
  //   tracksRef.current = samples.sounds.map((sample, i) => ({
  //     id: i,
  //     sampler: new Tone.Sampler({
  //       urls: {
  //         [KEY]: sample.url,
  //       }
  //     }).toDestination()
  //   }));

  //   // This function creates the sequence of each drum track
  //   seqRef.current = new Tone.Sequence((time, step) => {
  //     tracksRef.current.map(tr => {
  //       if (stepsRef.current[tr.id]?.[step]?.checked) {
  //         tr.sampler.triggerAttack(KEY, time);
  //       }
  //       // console.log('tracksRef = ', tracksRef.current)
  //       lightRef.current[step].checked = true;
  //     });

      
  //     //Chords Sequence configuration:
  //     count === chordProg.length - 1 ? count = 0 : count++;
  //     if (chordProg[count]) {
  //       nextChordRoot = chordProg[count][0]
  //       nextChord = Chord.get(chordProg[count][1]);
  //       howlerSampler.playChord();
  //     }
  //   },
  //     [...stepIds],
  //     "16n"
  //   );

  //   isMuted.current = Array(16).fill(false);
  //   // Start the sequencer
  //   seqRef.current.start(0);

  //   console.log('stepsRef: ', stepsRef)
  //   return () => {
  //     seqRef.current?.dispose();
  //     tracksRef.current.map(tr => tr.sampler.dispose());
  //   }
  // }, [samples.sounds, numOfSteps, isPlaying, chordProg]) 

  // const muteTrack = (e) => {
  //   // If is muted...
  //   if (tracksRef.current[e.target.id].sampler.volume.value < 0) {
  //     tracksRef.current[e.target.id].sampler.volume.value = 0;
  //     e.target.classList.remove('ring-rose-400');
  //     e.target.classList.remove('shadow-rose-500/50');
  //     e.target.classList.remove('hover:bg-rose-300');
  //     e.target.classList.remove('text-rose-300');
  //     e.target.classList.add('ring-emerald-400');
  //     e.target.classList.add('shadow-emerald-500/50');
  //     e.target.classList.add('hover:bg-emerald-300');
  //     e.target.classList.add('text-emerald-100');

  //   } else {
  //     tracksRef.current[e.target.id].sampler.volume.value = -64;
  //     e.target.classList.add('ring-rose-400');
  //     e.target.classList.add('shadow-rose-500/50');
  //     e.target.classList.add('text-rose-300');
  //     e.target.classList.add('hover:bg-rose-300');
  //   }
  // }

  // const playSample = (e) => {
  //   tracksRef.current[e.target.id].sampler.triggerAttack(KEY)
  // }

  // const saveSession = () => {
  //   // console.log(typeof stepsRef.current[0], stepsRef.current[0]) //Each element of this array contains the track-stepId info 
  //   // console.log(samples.sounds[0].url.match(/^\/[a-z]+\/([\w\d-]+)/)) // What I really need is the samples 😅 But it was fun
  //   // console.log(samples.name);
  //   console.log('chord Prog from Session when saving', chordProg)
  //   saveModal.onOpen();

  // }

  // return (
  //   <div>
  //     <SaveModal soundbankName={samples.name} stepsRef={stepsRef.current}  prog={chordProg} padSound={padSound.url} ></SaveModal>
  //     <div className="relative w-full flex flex-col ">
  //       <div className='flex items-center'>
  //         <h1 className="text-fuchsia-500 text-xl">Master Sequencer</h1>
  //         {session ?
  //           <button onClick={() => saveSession()}
  //             className='text-sky-700 hover:text-sky-500 ml-5 hover:underline decoration-sky-500/[.80]'>🖭 Save Session</button>
  //           : <a href='/login' className='text-sky-700 hover:text-sky-500 ml-5 hover:underline decoration-sky-500/[.80]'>🖭 Do you want to save this Session? Log in!</a>
  //         }
  //       </div>
  //       <div className='mt-8'>

  //         <button onClick={handlePlay}
  //           className={`w-[60px]  rounded p-3 mx-5  ring shadow 
  //                     ${isPlaying ? 'translate-y-0.5' : '-translate-y-0.5'}
  //                     ${isPlaying ? 'bg-rose-800 opacity-100 text-rose-100' : 'bg-emerald-950 opacity-90 text-emerald-100'}
  //                     ${isPlaying ? 'shadow-rose-600 shadow-xl' : 'shadow-emerald-600 shadow-lg'}
  //                     ${!isPlaying && 'hover:text-emerald-100 hover:shadow-xl hover:shadow-emerald-500 hover:opacity-100 hover:bg-emerald-400'}
  //                     ${isPlaying ? 'ring-1 ring-rose-200' : 'ring-1 ring-emerald-100'}
  //                     `}>
  //           {isPlaying ? 'Stop' : 'Play'}
  //         </button>
  //         <label className='text-fuchsia-500 text-xl' ><div className='min-w-[600px] inline '>BPM: {showBPM} </div>

  //           <input className='w-[250px]'
  //             type='range' min={40} max={300} step={0.1} onChange={handleTempoChange} defaultValue={120} />
  //         </label>
  //         <label className='text-fuchsia-500 text-xl' ><span>LEVEL </span>
  //           <input className='w-[250px]'
  //             type='range' min={0} max={1} step={0.01} onChange={handleVolumeChange} defaultValue={0.70} />
  //         </label>
  //       </div>

  //       <div className='flex justify-around'>
  //         <div>
  //           <div className='my-5'>
  //             {
  //               trackIds.map((trackId) => (

  //                 <div key={trackId} className='flex my-2 items-center'>
  //                   <button
  //                     id={trackId}
  //                     onClick={(e) => { muteTrack(e), { passive: true } }} // passive true... Very nice feature!
  //                     className="text-emerald-100 text-sm flex flex-col justify-center items-center
  //                       w-[100px] ring ring-1  p-1 mx-3 rounded shadow-lg ring-emerald-400 shadow-emerald-500/50 hover:bg-emerald-300 hover:text-white"
  //                   >{samples.sounds[trackId].name}
  //                   </button>
  //                   <button id={trackId} onClick={(e) => playSample(e)}
  //                     className='w-fit mr-3 text-md ring-1 ring-sky-500 text-sky-400 p-1  rounded
  //                               shadow-md shadow-sky-900 hover:bg-sky-700 hover:shadow-sky-700 hover:shadow-lg hover:text-white'
  //                   >►</button>
  //                   { loadedStepsRef ? 
  //                     loadedStepsRef.map()
  //                     :
  //                     stepIds.map((stepId) => {
  //                     const id = trackId + "-" + stepId;
  //                     return (
  //                       <label className='inline'>
  //                         <input
  //                           key={id}
  //                           id={id}
  //                           type="checkbox"
  //                           ref={(elm) => {
  //                             if (!elm) return;
  //                             if (!stepsRef.current[trackId]) {
  //                               stepsRef.current[trackId] = [];
  //                             }
  //                             stepsRef.current[trackId][stepId] = elm;
  //                             // console.log(elm)
  //                           }}
  //                           className='h-10 w-10
  //                               bg-fuchsia-200 rounded border-fuchsia-400 text-fuchsia-500 checked:ring-fuchsia-900 opacity:70 checked:opacity-100 shadow shadow-md
  //                               hover:bg-fuchsia-300 checked:shadow-fuchsia-200 checked:shadow-fuchsia-800 checked:shadow-xl focus:border-1 shadow-fuchsia-800  '
  //                         />
  //                         <div className='' />
  //                       </label>
  //                     );
  //                   })}
  //                 </div>
  //               ))}
  //           </div>
  //         </div>
  //       </div>

  //       {/* lights */}
  //       <div className='absolute right-7 top-0 invisible lg:visible md:visible '>
  //         {stepIds.map((stepId) => (
  //           <label className="">
  //             <input
  //               type="radio"
  //               name="lamp"
  //               id={"lamp" + "-" + stepId}
  //               disabled
  //               ref={(elm) => {
  //                 if (!elm) return;
  //                 lightRef.current[stepId] = elm;
  //               }}
  //               className=' checked:opacity-100 focus:emerald-100 opacity-20 '

  //             />

  //           </label>
  //         ))}
  //       </div>


  //     </div>

  //   </div>
  // );

}

export default SessionMaster;