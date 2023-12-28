import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import DeleteModal from "bring/components/modals/DeleteModal";
import useDeleteModal from "../../Hooks/useDeleteModal";
import Image from "next/image";
import LoadingModal from "bring/components/UI/layout/LoadingOverlay";
import MachineButton from "bring/components/UI/machines/Buttons/machineButton/MachineButton";

const UserProfile = () => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState({})
  const [userTracks, setUserTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const deleteModal = useDeleteModal();

  useEffect(() => { console.log('session', session) }, [session])

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        let current = await axios.get('/api/current')
        setUserInfo({ ...current.data });
      } catch (error) {
        console.log('Cannot get user Info to load sessions: ', error)
        return false;
      };
    }
    if (session) {
      getUserInfo();
      setIsLoading('false')
    }
  }, [session])

  useEffect(() => {
    const getUserTracks = async () => {
      try {
        let tracks = await axios.get(`/api/getTracks`, {
          params: {
            id: userInfo.id,
            email: userInfo.email
          }
        })
        setUserTracks([...tracks.data])
        return;
      } catch (error) {
        console.log('Cannot get user Tracks: ', error)
        return false;
      };
    }
    if (userInfo.id) {
      setIsLoading(true);
      getUserTracks();
      setIsLoading(false);
    }
  }, [userInfo])

  const openDeleteModal = (trackId) => {
    deleteModal.setTrackId(trackId);
    deleteModal.onOpen();
  }


  // RENDER ····································································

  if (session) {
    return (
      <>
        <DeleteModal />
        <LoadingModal isOpen={isLoading} />
        <div className="text-fuchsia-100 w-[90vw] h-full flex-col align-start justify-center pt-10">
          <div id="lists-container" className="flex items-start justify-between">
            <div className="h-[75%] overflow-y-auto overflow-x-hidden w-[75%] opacity-90 bg-gray-950 rounded-lg p-7">
              <h4 className="text-xl text-fuchsia-600 pb-2">Your Sessions:</h4>
              <ul className="list-style-dot px-5">
                {userTracks?.map(track => (
                  <li key={track.id + '-li'} className="flex justify-between items-center h-fit rounded-lg text-sky-200 hover:text-white opacity-90 p-2 list-[square] hover:bg-fuchsia-950">
                    <div>
                      <h4 className="text-lg">{track.name}</h4>
                      <p className="text-xs opacity-70 italic">{moment(track.creationDate).format('MMM Do, YYYY')} at {moment(track.creationDate).format(' HH:m')}</p>
                    </div>
                    <div id='userSessionList-controls' className="flex gap-3">
                      {/* <Link href={`/session/${track.id}`} className="mx-1 bg-gray-950 border border-emerald-600 rounded-xl text-emerald-300 p-2 cursor-pointer hover:text-white hover:bg-emerald-500 shadow shadow-sm shadow-emerald-400 hover:shadow-none">
                        OPEN
                      </Link> */}
                      <MachineButton label="OPEN" size="lg" />
                      <MachineButton label="DELETE" size="lg" color="text-rose-300" borderColor="border-rose-300" isMainButton onClick={() => openDeleteModal(track.id)}/>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-5 bg-gradient-to-r p-[5px] from-[#7928ca] to-[#ff0080] rounded-xl h-max sm:hidden md:block">
              <div className="bg-black rounded-xl opacity-95">
                <Image src='/logo-comping-machine-full-color-white.png'
                  alt='comping-machine-logo' height={450}
                  width={450}></Image>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="text-white flex justify-center mt-20 items-center">You are not logged-in</div>
    );
  }
}

export default UserProfile;