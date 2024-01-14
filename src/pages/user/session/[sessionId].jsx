import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import MachineRack from "bring/components/machines/MachineRack";
import LoadingModal from "bring/components/UI/layout/LoadingOverlay";
import SaveSessionButton from "bring/components/machines/SaveSessionButton";
import ScrollSign from "bring/components/machines/ScrollSign";

export default function UserSessionPage() {
  const router = useRouter()
  const editing = router.query.sessionId !== 'new';
  const [savedPadSequence, setSavedPadSequence] = useState(null);
  const [savedDrumsSequence, setSavedDrumsSequence] = useState(null);
  const [savedPadSoundKey, setSavedPadSoundKey] = useState(null);
  const [savedDrumkitKey, setSavedDrumkitKey] = useState(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [sessionName, setSessionName] = useState('')

  // FUNCTIONS ·················································································

  function drumTrackRetriever(sessionFromDb) {
    let tracks = []; //
    for (let field of Object.entries(sessionFromDb)) {
      if (field[0].slice(0, 5) === 'track') tracks.push(field[1])
      else continue
    }
    return tracks;
  }

  const getSession = async () => {
    setIsLoadingSession(true)
    try {
      // local host dev || https://comping-machine.vercel.app/api/getSession' if needed
      let { data: session } = await axios.get('/api/getSession', {
        params: {
          id: router.query.sessionId
        }
      })

      setSessionName(session.name);
      setSavedPadSoundKey(session.pad_sound);
      setSavedDrumkitKey(session.drumkit)

      let parsedChordProg = [];
      session.pad_track.forEach(el => {
        if (el.length === 0) parsedChordProg.push(null);
        else parsedChordProg.push(el.split('.'));
      })
      setSavedPadSequence([...parsedChordProg]);

      let parsedDrumTracks = drumTrackRetriever(session);
      setSavedDrumsSequence([...parsedDrumTracks]);

      setIsLoadingSession(false)
    } catch (error) {
      console.log('Cannot get session: ', error)
      setIsLoadingSession(false)
      return false;
    };
  }

  // EFFECTS & INIT SESSION DATA ··································································
  useEffect(() => {
    const sessionId = router.query.sessionId;
    if (sessionId !== 'new') {
      getSession()
    }
  }, [router.query.sessionId])

  return (
    <>
      <LoadingModal isOpen={isLoadingSession} />
      <div id='session-page' className="flex flex-col items-center w-full">
        <SaveSessionButton editing={editing} loggedUser />
        <ScrollSign label='Scroll' side={'right'} />
        <MachineRack
          savedPadSequence={savedPadSequence}
          savedPadSoundKey={savedPadSoundKey}
          savedDrumsSequence={savedDrumsSequence}
          savedDrumkitKey={savedDrumkitKey}
        />
      </div>
    </>
  )
}
