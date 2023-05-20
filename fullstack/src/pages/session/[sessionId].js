import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Master from "bring/components/machines/master/Master";
import drumKits from "../../../libs/drumkits";
import padSounds from "../../../libs/padSounds";
import ConfigMachine from "bring/components/machines/ConfigMachine";
import moment from "moment";

const SessionDetail = () => {
  const router = useRouter() //we access the query parameters from here
  const sessionId = router.query.sessionId;
  const [currentSession, setCurrentSession] = useState([]);

  const [samples, setSamples] = useState({});
  const [chordProg, setChordProg] = useState([]);
  const [drumTracks, setDrumTracks] = useState([]);
  const [padSound, setPadSound] = useState({});

  const getSession = async () => {
    console.log('SESSION ID FROM session', sessionId)
    try {
      let current = await axios.get('http://localhost:3000/api/getSession', {
        params: {
          id: sessionId
        }
      })
      console.log('current session', current);
      setCurrentSession({ ...current.data });

      let parsedSamples = drumKits.find(dk => dk.name === current.data.drumkit);
      // console.log('samples after db', parsedSamples)// this works
      setSamples(parsedSamples)

      let parsedPadSounds = padSounds.filter(sound => sound.url === current.data.pad_sound);
      console.log('pad sound after db. ', parsedPadSounds)// this works
      setPadSound([...parsedPadSounds])

      let parsedChordProg = [];
      current.data.pad_track.forEach(el => {
        if (el.length === 0) parsedChordProg.push(null);
        else parsedChordProg.push(el.split('.'));
      })
      // console.log('chords after db: ', parsedChordProg);
      setChordProg([...parsedChordProg]);

      let parsedDrumTracks = drumTrackRetriever(current.data);
      // console.log('drumtracks after db', parsedDrumTracks);
      setDrumTracks([...parsedDrumTracks])


    } catch (error) {
      console.log('Cannot get session Info...', error)
      return false;
    };
  }

  function drumTrackRetriever(obj) {
    let tracks = []; //
    for (let prop of Object.entries(obj)) {
      if (prop[0].slice(0, 5) === 'track') tracks.push(prop[1])
      else continue
    }
    return tracks;
  }

  useEffect(() => {
    sessionId && getSession();
  }, [sessionId])

  return (
    <div className="text-fuchsia-100 mt-5">
      <div className="flex justify-between items-end">
        <h1 className="text-fuchsia-500 text-2xl inline" >{currentSession.name}</h1>
        <span className="text-xs opacity-70">Created on: <span className="text-fuchsia-500">{moment(currentSession.creationDate).format('MMM Do, YYYY')}</span></span>
      </div>
      {/* <SessionMaster />  check this possibility later. */}
      <ConfigMachine savedSamples={samples} savedChordProg={chordProg} savedDrumTracks={drumTracks} savedPadSound={padSound[0]}/>
    </div>
  );
}

export default SessionDetail;