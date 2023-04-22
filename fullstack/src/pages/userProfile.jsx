import axios from "axios";
import { useSession } from "next-auth/react";

const userProfile = () => {
  const { data: session } = useSession();

  const getProfile = async () => {
    try {
      const response = await axios.get('/api/current');
      console.log(response)
      return response;
    } catch (error) {
      console.log('Cannot get that...', error)
      return false;
    };
  }

  if (session) {
    return (<>
      <div className="container flex-col w-full align-center justify-center mx-auto">
        <h3 className="text-fuchsia-700 text-3xl p-5"> Your Tracks </h3>
        <div className="text-white">
          <ul className="list-style-dot">
            <li><div>Tal</div></li>
            <li>Y otra por aquí</li>
          </ul>
        </div>
      </div>
    </>)
  } else {
    return (<>
      <div className="text-white flex justify-center items-center">You're not logged in</div>
    </>)
  }
}

export default userProfile;