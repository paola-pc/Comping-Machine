import useSaveModal from "../../../Hooks/useSaveModal";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Modal from "../Modal";
import axios from "axios";

const SaveModal = ({ soundbankName, stepsRef }) => {
  const saveModal = useSaveModal(); //the custom hook
  const [sessionName, setSessionName] = useState('')
  const [isLoading, setIsLoading] = useState('');

  let session = useSession();
  // console.log(session);


  let newSession = {
    name: sessionName,
    creationDate: new Date().toISOString(),
    soundbank_name: soundbankName,
    userId: session.data?.user.id,
  }

  // console.log('newSession : ', newSession)


  const saveSession = async (session) => {

    session = { ...session, ...getDrumTracks(stepsRef) }
    try {
      const response = await axios.post('/api/save', session)
      // console.log('LOOK HERE ================> ', response);
      saveModal.onClose();
      return response;
    } catch (error) {
      console.log('error in save modal: ', error);
      return false
    }
  }

  function getDrumTracks(collection) {
    if (collection[0][0] === undefined) return 'undefined on getDrumTracks'
    // console.log(collection[0][0].checked);
    let drumTracks = {} // Is this ok? should it be an object?
    let i = 0;
    while (i < 16) {
      drumTracks[`track${i}`] = [];
      for (let j = 0; j < collection[i].length; j++) {
        drumTracks[`track${i}`].push(collection[i][j].checked);
      }
      i++;
    }
    console.log('drumtracks treated for the DB', drumTracks) //this works
    return drumTracks;
  }

  useEffect(() => {
    if (newSession.name.length > 0)
      saveSession(newSession)
  }, [sessionName])

  return (
    <Modal
      disabled={isLoading}
      isOpen={saveModal.isOpen}
      title="Save Session"
      actionLabel="Save"
      onClose={saveModal.onClose}
      action={saveSession}
      setData={setSessionName}
    />
  );

}

export default SaveModal;