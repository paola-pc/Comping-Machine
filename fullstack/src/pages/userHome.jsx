import ConfigMachine from "bring/components/machines/ConfigMachine";
import useTurnPhoneModal from "../../Hooks/useTurnPhoneModal";
import TurnPhoneModal from "bring/components/modals/TurnPhoneModal";
import { useEffect } from "react";


export default function UserHome() {
  const turnPhoneModal = useTurnPhoneModal();

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

  return (<>
    <TurnPhoneModal />
    <div id="userHome-container" className="flex flex-col items-center justify-center w-full">
      <ConfigMachine />
    </div>
  </>
  )
}
