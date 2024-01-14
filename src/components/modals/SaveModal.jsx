import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm, Controller} from "react-hook-form";
import axios from "axios";

import { FcHighPriority } from "react-icons/fc";
import { RiFileMusicFill } from "react-icons/ri";
import useSaveModal from "../../../Hooks/useSaveModal";
import Modal from "../UI/modals/Modal"

const SaveModal = ({ drumkit, drumStepsRef, padSequence, padSound, bpm, drumkitLevels }) => {
  const saveModal = useSaveModal();
  const [isLoading, setIsLoading] = useState('');
  const [userId, setUserId] = useState(null);
  const [sessionToSave, setSessionToSave] = useState(null)
  const form = useForm({ defaultValues: { name: '' } });
  const sessionName = form.watch('name');

  let userSession = useSession();
  let curatedprog = [];

  // EFFECTS ···························································
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        let current = await axios.get('/api/current')
        setUserId(current.data.id)
      } catch (error) {
        console.log('Cannot get user info to save session:', error)
        return false;
      }
    }
    getUserInfo();
  }, [userSession])

  useEffect(() => {
    setSessionToSave({
      name: sessionName,
      creationDate: new Date().toISOString(),
      drumkit: drumkit,
      userId: userId,
      pad_track: curatedprog ? curatedprog : [],
      pad_sound: padSound,
      // bpm,
    })

  }, [sessionName, userId])

  // FUNCTIONS ··························································
  function getDrumTracks(collection) {
    if (collection[0][0] === undefined) return 'No drum tracks found.'
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

  if (padSequence) {
    // null elements become empty strings.
    padSequence.forEach((el) => {
      if (el === null) curatedprog.push('');
      else curatedprog.push(el.join('.'))
    })
  }

  const saveSession = async (session) => {
    session = { ...session, ...getDrumTracks(drumStepsRef) }
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
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onError)} >
      <Modal
        disabled={isLoading}
        isOpen={saveModal.isOpen}
        mainActionIcon={RiFileMusicFill}
        title="SAVE SESSION"
        mainActionLabel="Save"
        onClose={saveModal.onClose}
        mainAction={() => null}
        FormInputs={
          <Controller
            control={form.control}
            name="name"
            rules={{ required: 'A session name is required!' }}
            shouldUnregister
            render={({field, fieldState: { error }}) => (
              <label className="block">
                <input
                  {...field}
                  placeholder="Type the name of your session..."
                  autoComplete="off"
                  type="text"
                  className="block w-[75%] text-white rounded text-sm placeholder-gray-500 placeholder-opacity-90 bg-neutral-900 border-none mt-2"
                />
                {error && <div className="flex items-center text-rose-300"><FcHighPriority /><p className="ml-2">{error.message}</p></div>}
              </label>
            )}
          />
        }
      />
    </form>
  );
}

export default SaveModal;