import { useSession } from "next-auth/react";

const userProfile = () => {
  const { data: session } = useSession();
  if (session) {
  






    return (<>
      <div>Your Not logged in</div>
    </>)
  } else {
    return (<>
      <div className="text-white flex justify-center items-center">You're not logged in</div>
    </>)
  }
}

export default userProfile;