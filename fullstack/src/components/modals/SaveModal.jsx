import useSaveModal from "../../../Hooks/useSaveModal";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Modal from "../Modal";
import axios from "axios";

const SaveModal = ({ soundbankName, stepsRef, prog, padSound }) => {
  const saveModal = useSaveModal(); 
  const [sessionName, setSessionName] = useState('')
  const [isLoading, setIsLoading] = useState('');
  const [id, setId] = useState(null);
  const [sessionToSave, setSessionToSave] = useState(null)

  let session = useSession();
  let curatedprog = [];
  // null elements become empty strings.
  if (prog) {
    prog.forEach((el, i) => {
      if (el === null) curatedprog.push('');
      else curatedprog.push(el.join('.'))
    })
  }

  useEffect(() => {
    if (session.data) {
      localStorage.setItem('user', JSON.stringify(session.data))
    } else if (localStorage.getItem('user')) {
      session.data = JSON.parse(localStorage.getItem('user'))
    }
    if (session.data && session.data.user) {
      setId(session.data.user.id);
    }
  }, [])

  useEffect(() => {
    setSessionToSave({
      name: sessionName,
      creationDate: new Date().toISOString(),
      soundbank_name: soundbankName,
      userId: id,
      pad_track: curatedprog ? curatedprog : ['not', 'found'],
      pad_sound: padSound
    })

  }, [sessionName, id])

  const saveSession = async (session) => {
    session = { ...session, ...getDrumTracks(stepsRef) }
    try {
      const response = await axios.post('/api/save', session)
      saveModal.onClose();
      return response;
    } catch (error) {
      console.log('error in save modal: ', error);
      return false
    }
  }

  function getDrumTracks(collection) {
    if (collection[0][0] === undefined) return 'undefined on getDrumTracks'
    let drumTracks = {} 
    let i = 0;
    while (i < 16) {
      drumTracks[`track${i}`] = [];
      for (let j = 0; j < collection[i].length; j++) {
        drumTracks[`track${i}`].push(collection[i][j].checked);
      }
      i++;
    }
    return drumTracks;
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={saveModal.isOpen}
      title="Save Session"
      actionLabel="Save"
      onClose={saveModal.onClose}
      action={() => {
        saveSession(sessionToSave)
      }}
      setData={setSessionName}
    />
  );

}

export default SaveModal;