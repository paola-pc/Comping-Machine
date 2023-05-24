import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const UserProfile = () => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState({})
  const [userTracks, setUserTracks] = useState([]);

 


  
  useEffect(() => {
    const getUserTracks = async () => {
      try {
        let tracks = await axios.get(`https://comping-machine.vercel.app/api/getTracks`, { //local host dev
          params: {
            id: userInfo.id,
            email: userInfo.email
          }
        })
        console.log('tracks', tracks.data);
        setUserTracks([...tracks.data])

        return;
      } catch (error) {
        console.log('Cannot get user Tracks...', error)
        return false;
      };
    }
    const getUserInfo = async () => {
      try {
        let current = await axios.get('/api/current')
        console.log('current', current);
        setUserInfo({ ...current.data });
        getUserTracks();
      } catch (error) {
        console.log('Cannot get user Info...', error)
        return false;
      };
    }
  
    if (session) {
      getUserInfo()
    }
  }, [session])



  if (session) {
    return (<>
      <div className="container text-fuchsia-100 flex-col w-full align-center justify-center mx-auto">
        <h3 className="text-fuchsia-700 text-3xl p-5">
          <span className="text-fuchsia-100">Hello,</span> {session.user.name} </h3>


        <div className="h-[500px] overflow-y-scroll overflow-x-hidden opacity-90 bg-gray-950 rounded-lg p-7">
          <h4 className="text-xl text-fuchsia-600 mb-2">Your Sessions:</h4>
          <ul className="list-style-dot px-5 ">
            {userTracks && userTracks.map(track => {
              return <li key={track + '-li'} className=" 
              text-sky-200 opacity-90 px-2 py-1 list-[square] ml-10 hover:text-fuchsia-500">
                <div>
                  <Link href={`/session/${track.id}`}><h4>{track.name}</h4></Link>
                </div>
              </li>
            }

            )}
          </ul>
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