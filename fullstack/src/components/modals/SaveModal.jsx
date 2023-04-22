import useSaveModal from "../../../Hooks/useSaveModal";
import { useState, useCallback, useEffect } from "react";

import Modal from "../Modal";
import axios from "axios";

const SaveModal = ({soundbankName, stepsRef}) => {
  const saveModal = useSaveModal(); //the custom hook
  const [sessionName, setSessionName] = useState('')
  const [isLoading, setIsLoading] = useState('');

  let readyToSave = false;

  const saveSession = async (s) => {
    try {
      const response = await axios.post('/api/save', s)
      console.log(response);
      saveModal.onClose();
      return response;
    } catch (error) {
      console.log('error in save modal: ', error);
      return false
    }
  }

  let newSession = {
    name: sessionName,
    creationDate: Date.now(),
    steps_ref: [[stepsRef]],
    soundbank_name: soundbankName
  }

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