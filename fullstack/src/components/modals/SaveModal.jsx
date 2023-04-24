import useSaveModal from "../../../Hooks/useSaveModal";
import { useState, useCallback, useEffect } from "react";

import Modal from "../Modal";
import axios from "axios";

const SaveModal = ({ soundbankName, stepsRef }) => {
  const saveModal = useSaveModal(); //the custom hook
  const [sessionName, setSessionName] = useState('')
  const [isLoading, setIsLoading] = useState('');

  let newSession = {
    name: sessionName,
    creationDate: Date.now(),
    drumTracks: null,
    soundbank_name: soundbankName
  }


  const saveSession = async (session) => {
    newSession.drumTracks = getDrumTracks(stepsRef)
    try {
      const response = await axios.post('/api/save', session)
      console.log(response);
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
    let drumTracks = {}
    let i = 0;
    while (i < 16) {
      drumTracks[i] = [];
      for (let j = 0; j < collection[i].length; j++){
        drumTracks[i].push(collection[i][j].checked);
      }
      i++;
    }
    console.log('drumtracks treated for the DB', drumTracks) //this works
    return drumTracks;
  }

  // getDrumTracks(stepsRef)

  // console.log(stepsRef)

  useEffect(() => {
    if (newSession.name.length > 0)
      console.log(saveSession(newSession))
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