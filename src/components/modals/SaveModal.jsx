import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm, Controller, useWatch} from "react-hook-form";
import axios from "axios";

import useSaveModal from "../../../Hooks/useSaveModal";
import Modal from "../UI/Modals/Modal"

const SaveModal = ({ soundbankName, stepsRef, prog, padSound }) => {
  const saveModal = useSaveModal();
  const [isLoading, setIsLoading] = useState('');
  const [userId, setUserId] = useState(null);
  const [sessionToSave, setSessionToSave] = useState(null)
  const form = useForm({ defaultValues: { name: '' } });
  const sessionName = form.watch('name');

  let userSession = useSession();
  let curatedprog = [];

  useEffect(() => {
    console.log('userSession', userSession)
  }, [])

  // EFFECTS ···························································
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        let current = await axios.get('/api/current')
        console.log('from getUserInfo', current.data.id)
        setUserId(current.data.id)
      } catch (error) {
        console.log('Cannot get user Info to save sessions: ', error)
        return false;
      }
    }
    getUserInfo();
  }, [userSession])

  useEffect(() => {
    setSessionToSave({
      name: sessionName,
      creationDate: new Date().toISOString(),
      soundbank_name: soundbankName,
      userId: userId,
      pad_track: curatedprog ? curatedprog : ['not', 'found'],
      pad_sound: padSound
    })

  }, [sessionName, userId])

  // FUNCTIONS ··························································
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

  if (prog) {
    // null elements become empty strings.
    prog.forEach((el, i) => {
      if (el === null) curatedprog.push('');
      else curatedprog.push(el.join('.'))
    })
  }

  const saveSession = async (session) => {
    session = { ...session, ...getDrumTracks(stepsRef) }
    console.log('session to save', session)
    try {
      const response = await axios.post('/api/save', session)
      saveModal.onClose();
      // TODO redirect/load to the saved session.
      return response;
    } catch (error) {
      console.log('error in SaveModal: ', error);
      return false
    }
  }

  // HANDLERS ·······························································
  const onSubmit = async () => {
    await saveSession(sessionToSave);
    saveModal.onClose();
  }

  const onError = (e) => {
    console.log('ERROR', e)
    console.log('SESSION TO SAVE =>', sessionToSave)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onError)} >
      <Modal
        disabled={isLoading}
        isOpen={saveModal.isOpen}
        title="Save session"
        mainActionLabel="Save"
        onClose={saveModal.onClose}
        mainAction={() => null}
        FormInputs={
          <Controller
            control={form.control}
            name="name"
            rules={{ required: 'A session name is required.' }}
            shouldUnregister
            render={({field}) => (
              <label className="block">Session name:
                <input
                  {...field}
                  placeholder="Type the name of your session..."
                  autoComplete="off"
                  type="text"
                  className="block w-full text-fuchsia-900 bg-fuchsia-100 rounded text-sm placeholder-gray-500 placeholder-opacity-50"
                />
              </label>
            )}
          />
        }
      />
    </form>
  );
}

export default SaveModal;