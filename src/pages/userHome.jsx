import ConfigMachine from "bring/components/machines/ConfigMachine";
import useTurnPhoneModal from "../../Hooks/useTurnPhoneModal";
import TurnPhoneModal from "bring/components/modals/TurnPhoneModal";
import { useEffect, useState } from "react";
import LoadingModal from "bring/components/UI/layout/LoadingOverlay";
import ChordSequencer from "bring/components/machines/ChordSequencer/ChordSequencer";
import MachineRack from "bring/components/machines/MachineRack";

export default function UserHome() {
  const turnPhoneModal = useTurnPhoneModal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const isNotWideEnough = window.matchMedia("(max-width: 600px)").matches;
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

  return (<>
    <TurnPhoneModal />
    <LoadingModal isOpen={isLoading} />
    <div id="userHome-container" className="flex flex-col items-center justify-start w-full">
      {/* <ConfigMachine /> */}
      <MachineRack />
    </div>
  </>
  )
}
