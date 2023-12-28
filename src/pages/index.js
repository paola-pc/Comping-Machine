import MachineRack from "bring/components/machines/MachineRack";
import SaveSessionButton from "bring/components/machines/SaveSessionButton";
import LoginModal from "bring/components/modals/LoginModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const {data: session} = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session) router.push('/user/session/new');
  }, [session])

  // CURRENTLY THIS IS THE GUEST PAGE, COULD REDIRECT TO AN ACUTAL GUEST PAGE AND USE THIS ONE AS WELCOME PAGE
  return (
    <>
      <LoginModal />
      <div className="flex flex-col items-center w-full">
        <SaveSessionButton  />
        <MachineRack />
      </div>
    </>
  )
}

