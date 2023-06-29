import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import DeleteModal from "bring/components/modals/DeleteModal";
import useDeleteModal from "../../Hooks/useDeleteModal";
import Image from "next/image";

const UserProfile = () => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState({})
  const [userTracks, setUserTracks] = useState([]);
  const deleteModal = useDeleteModal();

  useEffect(() => {
    const getUserTracks = async () => {
      try {
        let tracks = await axios.get(`/api/getTracks`, { //local host dev
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
    const getUserInfo = async () => {
      try {
        let current = await axios.get('/api/current')
        setUserInfo({ ...current.data });
        // getUserTracks();
      } catch (error) {
        console.log('Cannot get user Info: ', error)
        return false;
      };
    }

    if (userInfo.id) {
      getUserTracks();
    }

    if (session) {
      getUserInfo()
    }
  }, [session, userInfo.id])

  const openDeleteModal = (e) => {
    deleteModal.setTrackId(e.target.id);
    deleteModal.onOpen();
  }

  if (session) {
    return (<>
      <DeleteModal />
      <div className="container text-fuchsia-100 w-[90vw] flex-col align-start justify-center mx-auto">
        <h3 className="text-fuchsia-700 text-3xl p-5">
          <span className="text-fuchsia-100">Hello,</span> {session.user.name} </h3>

        <div id="lists-container" className="flex items-center justify-around">
          <div className="h-[500px] overflow-y-auto overflow-x-hidden w-[60%] opacity-90 bg-gray-950 rounded-lg p-7 ">
            <h4 className="text-xl text-fuchsia-600 mb-2">Your Sessions:</h4>
            <ul className="list-style-dot px-5 ">
              {userTracks && userTracks.map(track => {
                return <li key={track.id + '-li'} className="flex justify-between items-center rounded-lg
              text-sky-200 hover:text-white opacity-90 px-2 py-1 my-2 list-[square] hover:bg-fuchsia-800 h-fit">
                  <div id="userSessionList-details">
                    <h4 className="text-lg">{track.name}</h4>
                    <p className="text-xs opacity-70 italic">creaded on {moment(track.creationDate).format('MMM Do, YYYY')} at
                      {moment(track.creationDate).format(' HH:m')}</p>
                  </div>
                  <div id='userSessionList-controls' className="text-xs">
                    <Link className="mx-1 bg-gray-950 border border-emerald-600 rounded-xl text-emerald-300 p-2 
                  cursor-pointer hover:text-white hover:bg-emerald-500 shadow shadow-sm shadow-emerald-400 hover:shadow-none"
                      href={`/session/${track.id}`}>OPEN</Link>
                    <span id={track.id}
                      className="mx-1 bg-gray-950 border border-rose-600 rounded-xl text-rose-300 p-2 
                  cursor-pointer hover:text-rose-100 hover:bg-rose-800 shadow shadow-sm shadow-rose-500 hover:shadow-none
                  "
                      onClick={(e) => openDeleteModal(e)}
                    >DELETE</span>
                  </div>
                </li>
              }
              )}
            </ul>
          </div>
          <div className="mx-5 bg-gradient-to-r p-[5px] from-[#7928ca] to-[#ff0080] rounded-xl h-max ">
            <div className="bg-black rounded-xl opacity-95">
              <Image src='/logo-comping-machine-full-color-white.png'
                alt='comping-machine-logo' height={450}
                width={450}></Image>
            </div>
          </div>
        </div>
      </div>
    </>)
  } else {
    return (<>
      <div className="text-white flex justify-center mt-20 items-center">You are not logged-in</div>
    </>)
  }
}

export default UserProfile;