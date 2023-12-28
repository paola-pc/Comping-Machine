import MachineRack from "bring/components/machines/MachineRack";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const {data: session} = useSession()
  const router = useRouter();

  useEffect(() => {
    console.log(session)
    if (session) router.push('/user/session/new');
  }, [session])

  // CURRENTLY THIS IS THE GUEST PAGE, COULD REDIRECT TO AN ACUTAL GUEST PAGE AND USE THIS ONE AS WELCOME PAGE
  return (
    <div id="index-container" className="flex flex-col items-center justify-around w-full">
      <MachineRack />
    </div>
  )
}

