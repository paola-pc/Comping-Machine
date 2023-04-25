import useSaveModal from "../../../Hooks/useSaveModal";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Modal from "../Modal";
import axios from "axios";

const SaveModal = ({ soundbankName, stepsRef, prog, padSound }) => {
  const saveModal = useSaveModal(); //the custom hook
  const [sessionName, setSessionName] = useState('')
  const [isLoading, setIsLoading] = useState('');
  const [id, setId] = useState(null);
  const [sessionToSave, setSessionToSave] = useState(null)

  let session = useSession();
  // console.log(session);
  let curatedprog = [];
  // null elements become empty strings.
  if (prog) {
    prog.forEach((el, i) => {
      if (el === null) curatedprog.push('');
      else curatedprog.push(el.join('.'))
    })
  }

  let newSession;

  useEffect(() => {
    console.log('session before : ', session)
    if (session.data) {
      localStorage.setItem('user', JSON.stringify(session.data))
    } else if (localStorage.getItem('user')) {
      session.data = JSON.parse(localStorage.getItem('user'))
    }
    console.log('session in save modal : ', session)
    setId(session.data.user.id);
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
    
  },[sessionName, id])


  useEffect(() => console.log('newSession : ', sessionToSave), [sessionToSave])
  

  console.log('chord prog: ', typeof prog, prog)
  console.log('curated chord prog: ', typeof curatedprog, curatedprog)
  console.log('padSound for the DB: ', padSound) //Thisworks


  const saveSession = async (session) => {
    console.log('session recieved : ', session)
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

  // useEffect(() => {
  //   console.log('check before saving : ',newSession)
  //   if (newSession && newSession.name.length > 0)
  //     saveSession(newSession)
  // }, [sessionName])

  return (
    <Modal
      disabled={isLoading}
      isOpen={saveModal.isOpen}
      title="Save Session"
      actionLabel="Save"
      onClose={saveModal.onClose}
      action={() => {
        console.log('newSession in callback : ', sessionToSave)
        saveSession(sessionToSave)
      }}
      setData={setSessionName}
    />
  );

}

export default SaveModal;