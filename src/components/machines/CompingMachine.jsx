const CompingMachine = () => {
  const [padSequence, setPadSequence] = useState([]);
  const [drumsSequence, setDrumsSequence] = useState([]);
  const [drumkitName, setDrumkitName] = useState([]);
  const [padSoundName, setPadSoundName] = useState([]);

  // TODO load the initial data form the db and set sequences and drumkit and pad sound names.

  // Drums sampler
  const drumTracksRef = useRef([]);
  const drumTracksIds = [...Array(16).keys()];; // TODO:initialize it with the drumkit tracks amount. (16?)
  const drumSequenceRef = useRef(null);
  const stepsRef = useRef([[]]);
  const stepIds = [...Array(16).keys()]; // an array of integers from 0-15

  // USE EFFECT
  // Map each drumkit track sound with Tone.Sampler and save it in drumTracksRef
  // Create the sequence of each

  return ( <div>COMPING MACHINE</div> );
}
 
export default CompingMachine;