import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import useTurnPhoneModal from "../../../Hooks/useTurnPhoneModal";
import TurnPhoneModal from "../modals/TurnPhoneModal";
import LoadingModal from "../UI/layout/LoadingOverlay";

const Layout = ({ children }) => {
  const session = useSession()

  const turnPhoneModal = useTurnPhoneModal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const isNotWideEnough = window.matchMedia("(max-width: 800px)").matches;
      if (isNotWideEnough) {
        turnPhoneModal.onOpen();
      } else {
        turnPhoneModal.onClose();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // TODO: This is currently only simulating the load of the main component. 
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [])

  useEffect(() => {
    if (session) {
      localStorage.setItem('session', JSON.stringify(session))
    } else {
      localStorage.removeItem('session')
    }
  }, [session])

  return (
    <div id="layout-container" className="bg-black mx-auto w-[97vw] flex flex-col items-center px-10 gap-1">
      <TurnPhoneModal />
      <LoadingModal isOpen={isLoading} />
      <Navbar />
      {children}
    </div>
  )
}

export default Layout;